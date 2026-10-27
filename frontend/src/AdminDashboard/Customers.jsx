import { useEffect, useState } from "react";

const CUSTOMERS_API = "http://localhost:5000/api/admin/customers";
const BOOKINGS_API = "http://localhost:5000/api/admin/bookings";

const Customers = () => {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingError, setBookingError] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Customer booking history
  const [customerBookings, setCustomerBookings] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");

  // Get authentication token
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Admin login required. Please login again.");
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // Fetch customers from MySQL
  const fetchCustomers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(CUSTOMERS_API, {
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to fetch customers.");
      }

      setCustomers(Array.isArray(data.customers) ? data.customers : []);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch bookings for summary cards
  const fetchBookingStats = async () => {
    setStatsLoading(true);
    setBookingError("");

    try {
      const response = await fetch(BOOKINGS_API, {
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Unable to fetch bookings.");
      }

      const bookingList = Array.isArray(data)
        ? data
        : Array.isArray(data.bookings)
          ? data.bookings
          : null;

      if (!bookingList) {
        throw new Error("Unexpected bookings API response.");
      }

      setBookings(bookingList);
    } catch (err) {
      setBookings([]);
      setBookingError(err.message || "Unable to fetch bookings.");
    } finally {
      setStatsLoading(false);
    }
  };

  // Refresh all page data
  const refreshData = () => {
    fetchCustomers();
    fetchBookingStats();
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Fetch customer profile and booking history
  const handleViewProfile = async (customerId) => {
    setSelectedCustomer(null);
    setCustomerBookings([]);
    setProfileError("");
    setHistoryError("");
    setProfileLoading(true);
    setHistoryLoading(true);

    let headers;

    try {
      headers = getAuthHeaders();
    } catch (err) {
      setProfileError(err.message);
      setProfileLoading(false);
      setHistoryLoading(false);
      return;
    }

    // Fetch customer profile
    try {
      const response = await fetch(`${CUSTOMERS_API}/${customerId}`, {
        headers,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load customer profile.");
      }

      setSelectedCustomer(data.customer);
    } catch (err) {
      setProfileError(err.message || "Unable to load customer profile.");
    } finally {
      setProfileLoading(false);
    }

    // Fetch bookings and filter for the selected customer
    try {
      const response = await fetch(BOOKINGS_API, { headers });
      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Unable to load booking history.");
      }

      const allBookings = Array.isArray(data)
        ? data
        : Array.isArray(data.bookings)
          ? data.bookings
          : null;

      if (!allBookings) {
        throw new Error("Unexpected bookings API response.");
      }

      const history = allBookings
        .filter(
          (booking) => Number(booking.user_id) === Number(customerId)
        )
        .sort((a, b) => Number(b.id) - Number(a.id));

      setCustomerBookings(history);
    } catch (err) {
      setCustomerBookings([]);
      setHistoryError(err.message || "Unable to load booking history.");
    } finally {
      setHistoryLoading(false);
    }
  };

  // Close profile modal
  const closeProfile = () => {
    if (profileLoading) return;

    setSelectedCustomer(null);
    setProfileError("");
    setCustomerBookings([]);
    setHistoryError("");
  };

  // Search by name or email
  const filteredCustomers = customers.filter((customer) => {
    const query = search.trim().toLowerCase();

    return (
      String(customer.name || "").toLowerCase().includes(query) ||
      String(customer.email || "").toLowerCase().includes(query)
    );
  });

  // Customers registered today
  const today = new Date();

  const newCustomers = customers.filter((customer) => {
    if (!customer.created_at) return false;

    const registeredDate = new Date(customer.created_at);

    return (
      !Number.isNaN(registeredDate.getTime()) &&
      registeredDate.getDate() === today.getDate() &&
      registeredDate.getMonth() === today.getMonth() &&
      registeredDate.getFullYear() === today.getFullYear()
    );
  }).length;

  // Pending bookings
  const pendingBookings = bookings.filter(
    (booking) =>
      String(booking.status || "Pending").trim().toLowerCase() === "pending"
  ).length;

  // Summary cards
  const customerStats = [
    {
      title: "Total Customers",
      value: loading ? "..." : customers.length,
      icon: "👥",
      color: "text-cyan-400",
    },
    {
      title: "New Customers Today",
      value: loading ? "..." : newCustomers,
      icon: "✨",
      color: "text-emerald-400",
    },
    {
      title: "Total Bookings",
      value: statsLoading ? "..." : bookings.length,
      icon: "📋",
      color: "text-blue-400",
    },
    {
      title: "Pending Bookings",
      value: statsLoading ? "..." : pendingBookings,
      icon: "⏳",
      color: "text-amber-400",
    },
  ];

  // Booking status styles
  const getStatusClass = (status) => {
    const normalizedStatus = String(status || "Pending")
      .trim()
      .toLowerCase();

    if (normalizedStatus === "completed") {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }

    if (normalizedStatus === "cancelled") {
      return "bg-red-500/10 text-red-400 border-red-500/20";
    }

    if (normalizedStatus === "pending") {
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }

    return "bg-blue-500/10 text-blue-400 border-blue-500/20";
  };

  return (
    <main className="min-h-screen bg-slate-950 p-4 text-white sm:p-6">
      {/* Page heading */}
      <div className="mb-8 mt-2">
        <h1 className="text-3xl font-bold">Customers</h1>

        <p className="mt-2 text-slate-400">
          Manage your MobileFix customers and booking overview.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {customerStats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{stat.title}</p>

              <span className="text-2xl" aria-hidden="true">
                {stat.icon}
              </span>
            </div>

            <p className={`mt-4 text-3xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Booking statistics error */}
      {bookingError && (
        <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-300">
          Booking statistics could not load: {bookingError}

          <button
            type="button"
            onClick={fetchBookingStats}
            className="ml-3 font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Customer list */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
        <div className="mb-2 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers by name or email..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-cyan-500"
          />

          <button
            type="button"
            onClick={refreshData}
            disabled={loading || statsLoading}
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading || statsLoading ? "Loading..." : "Refresh"}
          </button>
        </div>

        <p className="mt-3 text-sm text-slate-400">
          Matching customers: {filteredCustomers.length}
        </p>

        {loading && (
          <div className="py-12 text-center text-slate-400">
            Loading customers from database...
          </div>
        )}

        {!loading && error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-5">
            <p className="text-red-400">{error}</p>

            <button
              type="button"
              onClick={fetchCustomers}
              className="mt-3 rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-400"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && filteredCustomers.length === 0 && (
          <div className="mt-6 rounded-xl border border-dashed border-slate-700 p-10 text-center">
            <h2 className="text-xl font-semibold">
              {search ? "No customers found" : "No customers available"}
            </h2>

            <p className="mt-2 text-slate-400">
              {search
                ? "Try another name or email."
                : "Registered customers will appear here."}
            </p>
          </div>
        )}

        {!loading && !error && filteredCustomers.length > 0 && (
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-800 text-sm text-slate-300">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Registered On</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-t border-slate-800 transition hover:bg-slate-800/50"
                  >
                    <td className="p-4 text-slate-400">{customer.id}</td>

                    <td className="p-4 font-medium">{customer.name}</td>

                    <td className="p-4 text-slate-300">{customer.email}</td>

                    <td className="p-4 text-slate-400">
                      {customer.created_at
                        ? new Date(customer.created_at).toLocaleDateString(
                            "en-IN"
                          )
                        : "—"}
                    </td>

                    <td className="p-4">
                      <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                        Customer
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => handleViewProfile(customer.id)}
                        className="whitespace-nowrap rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Customer profile modal */}
      {(profileLoading || profileError || selectedCustomer) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onClick={closeProfile}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="customer-profile-title"
            className="my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal heading */}
            <div className="mb-6 flex items-center justify-between">
              <h2
                id="customer-profile-title"
                className="text-2xl font-bold"
              >
                Customer Profile
              </h2>

              <button
                type="button"
                disabled={profileLoading}
                onClick={closeProfile}
                aria-label="Close profile"
                className="rounded-lg px-3 py-1 text-2xl text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-50"
              >
                &times;
              </button>
            </div>

            {/* Profile loading */}
            {profileLoading && (
              <p className="py-8 text-center text-slate-400">
                Loading customer profile...
              </p>
            )}

            {/* Profile error */}
            {!profileLoading && profileError && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                <p className="text-red-400">{profileError}</p>
              </div>
            )}

            {/* Customer details and booking history */}
            {!profileLoading && selectedCustomer && (
              <div className="space-y-4">
                {/* Customer ID */}
                <div className="rounded-xl bg-slate-950 p-4">
                  <p className="text-sm text-slate-400">Customer ID</p>
                  <p className="mt-1 font-semibold">
                    #{selectedCustomer.id}
                  </p>
                </div>

                {/* Full name */}
                <div className="rounded-xl bg-slate-950 p-4">
                  <p className="text-sm text-slate-400">Full Name</p>
                  <p className="mt-1 font-semibold">
                    {selectedCustomer.name}
                  </p>
                </div>

                {/* Email */}
                <div className="rounded-xl bg-slate-950 p-4">
                  <p className="text-sm text-slate-400">Email Address</p>
                  <p className="mt-1 break-all font-semibold">
                    {selectedCustomer.email}
                  </p>
                </div>

                {/* Registration date */}
                <div className="rounded-xl bg-slate-950 p-4">
                  <p className="text-sm text-slate-400">
                    Registration Date
                  </p>

                  <p className="mt-1 font-semibold">
                    {selectedCustomer.created_at
                      ? new Date(
                          selectedCustomer.created_at
                        ).toLocaleString("en-IN")
                      : "Not available"}
                  </p>
                </div>

                {/* Booking history */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold">
                      Booking History
                    </h3>

                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">
                      {historyLoading ? "..." : customerBookings.length}
                    </span>
                  </div>

                  {historyLoading && (
                    <p className="py-4 text-center text-slate-400">
                      Loading booking history...
                    </p>
                  )}

                  {!historyLoading && historyError && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                      <p className="text-sm text-red-400">
                        {historyError}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          selectedCustomer &&
                          handleViewProfile(selectedCustomer.id)
                        }
                        className="mt-2 text-sm font-semibold text-cyan-400 underline"
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  {!historyLoading &&
                    !historyError &&
                    customerBookings.length === 0 && (
                      <p className="py-5 text-center text-sm text-slate-400">
                        No bookings linked to this customer yet.
                      </p>
                    )}

                  {!historyLoading &&
                    !historyError &&
                    customerBookings.length > 0 && (
                      <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
                        {customerBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="rounded-xl border border-slate-800 bg-slate-900 p-4"
                          >
                            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                              <p className="font-semibold text-cyan-400">
                                Booking #{booking.id}
                              </p>

                              <span
                                className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                                  booking.status
                                )}`}
                              >
                                {booking.status || "Pending"}
                              </span>
                            </div>

                            <div className="space-y-2 text-sm">
                              <p>
                                <span className="text-slate-400">
                                  Device:{" "}
                                </span>
                                <span className="font-medium">
                                  {booking.brand || "—"}{" "}
                                  {booking.model || ""}
                                </span>
                              </p>

                              <p>
                                <span className="text-slate-400">
                                  Service:{" "}
                                </span>
                                {booking.service || "—"}
                              </p>

                              <p>
                                <span className="text-slate-400">
                                  Booking Date:{" "}
                                </span>
                                {booking.created_at
                                  ? new Date(
                                      booking.created_at
                                    ).toLocaleString("en-IN")
                                  : "Not available"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>

                {/* Close button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={closeProfile}
                    className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Customers;