
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDownload,
  FaEdit,
  FaEye,
  FaTrash,
} from "react-icons/fa";

import ViewBookingModal from "./ViewBookingModal";
import StatusUpdateModal from "./updatbokings";
import DeleteBookingModal from "./DeleteBookingModal";

const API_URL = "http://localhost:5000/api/admin/bookings";
const BOOKINGS_PER_PAGE = 20;

const Bookings = () => {
  const navigate = useNavigate();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("isAdminLoggedIn");

        navigate("/login", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch bookings");
      }

      const bookings = Array.isArray(data) ? data : data.bookings;

      if (!Array.isArray(bookings)) {
        throw new Error("Invalid bookings response from server");
      }

      setBooking(bookings);
    } catch (err) {
      console.error("Fetch bookings error:", err);
      setError(err.message || "Unable to load bookings");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    let user = null;

    try {
      user = JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      user = null;
    }

    if (!localStorage.getItem("token") || user?.role !== "admin") {
      navigate("/login", { replace: true });
      return;
    }

    fetchBookings();
  }, [fetchBookings, navigate]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed");
      }

      setBooking((previous) =>
        previous.map((item) =>
          String(item.id) === String(id)
            ? { ...item, status: newStatus }
            : item
        )
      );

      setSelectedBooking((previous) =>
        previous && String(previous.id) === String(id)
          ? { ...previous, status: newStatus }
          : previous
      );

      setShowStatusModal(false);
      setSelectedBooking(null);
    } catch (err) {
      console.error("Status update error:", err);
      window.alert(err.message || "Status update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking deletion failed");
      }

      setBooking((previous) =>
        previous.filter((item) => String(item.id) !== String(id))
      );

      setShowDeleteModal(false);
      setSelectedBooking(null);
    } catch (err) {
      console.error("Delete booking error:", err);
      window.alert(err.message || "Booking deletion failed");
    }
  };

  const filteredBookings = booking.filter((item) => {
    const query = search.trim().toLowerCase().replace(/^#/, "");

    const fields = [
      item.id,
      item.booking_id,
      item.bookingId,
      item.booking_uid,
      item.name,
      item.customer_name,
      item.customerName,
      item.customer,
      item.phone,
      item.mobile,
      item.mobile_number,
      item.email,
      item.brand,
      item.model,
      item.service,
    ];

    const matchesSearch =
      !query ||
      fields.some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      );

    const normalizeStatus = (value) =>
      String(value ?? "Pending").trim().toLowerCase();

    const matchesStatus =
      statusFilter === "All" ||
      normalizeStatus(item.status) === normalizeStatus(statusFilter);

    return matchesSearch && matchesStatus;
  });

  const handleReset = () => {
    setSearch("");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    if (loading || error || filteredBookings.length === 0) {
      window.alert("There are no bookings available to export.");
      return;
    }

    const headers = [
      "Booking ID",
      "Booking UID",
      "Customer Name",
      "Phone",
      "Email",
      "Brand",
      "Model",
      "Service",
      "Address",
      "Status",
      "Created At",
    ];

    const escapeCSV = (value) => {
      let text = String(value ?? "");

      if (/^[\s]*[=+\-@]/.test(text)) {
        text = `'${text}`;
      }

      return `"${text.replace(/"/g, '""')}"`;
    };

    const rows = filteredBookings.map((item) => [
      item.id ?? item.booking_id ?? item.bookingId,
      item.booking_uid,
      item.name ?? item.customer_name ?? item.customerName ?? item.customer,
      item.phone ?? item.mobile ?? item.mobile_number,
      item.email,
      item.brand,
      item.model,
      item.service,
      item.address,
      item.status || "Pending",
      item.created_at ?? item.createdAt,
    ]);

    const csv = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\r\n");

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `mobilefix-bookings-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const totalPages = Math.ceil(
    filteredBookings.length / BOOKINGS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage((page) =>
      Math.min(page, Math.max(1, totalPages))
    );
  }, [totalPages]);

  const startIndex = (currentPage - 1) * BOOKINGS_PER_PAGE;

  const paginatedBookings = filteredBookings.slice(
    startIndex,
    startIndex + BOOKINGS_PER_PAGE
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-[1800px] px-3 pb-24 pt-6 sm:px-5 md:px-6 md:pb-8">

        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">Bookings Management</h1>
            <p className="mt-2 text-sm text-slate-400">
              View and manage all customer repair bookings.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-red-500/30 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10"
          >
            Logout
          </button>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_190px_auto_auto_auto]">
          <input
            type="search"
            aria-label="Search bookings"
            placeholder="Search ID, customer, phone, brand..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="min-w-0 rounded-xl border border-slate-800 bg-slate-900 p-3.5 outline-none placeholder:text-slate-500 focus:border-cyan-500"
          />

          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-slate-800 bg-slate-900 p-3.5 outline-none focus:border-cyan-500"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            onClick={handleReset}
            disabled={!search && statusFilter === "All"}
            className="rounded-xl border border-slate-700 px-4 py-3 hover:bg-slate-800 disabled:opacity-50"
          >
            Reset
          </button>

          <button
            onClick={fetchBookings}
            disabled={loading}
            className="rounded-xl bg-cyan-600 px-4 py-3 font-semibold hover:bg-cyan-500 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>

          <button
            onClick={handleExportCSV}
            disabled={loading || Boolean(error) || filteredBookings.length === 0}
            className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 font-semibold text-cyan-300 hover:bg-cyan-500/20 disabled:opacity-50"
          >
            <FaDownload />
            Export CSV ({filteredBookings.length})
          </button>
        </div>

        <div className="mb-4 text-sm text-slate-400">
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredBookings.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-white">
            {booking.length}
          </span>{" "}
          bookings
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-4 text-left text-slate-400">ID</th>
                <th className="p-4 text-left text-slate-400">Brand</th>
                <th className="p-4 text-left text-slate-400">Service</th>
                <th className="p-4 text-left text-slate-400">Status</th>
                <th className="p-4 text-left text-slate-400">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    Loading bookings...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-red-400">
                    <p>{error}</p>
                    <button
                      onClick={fetchBookings}
                      className="mt-3 text-cyan-400 underline"
                    >
                      Try Again
                    </button>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    {booking.length === 0
                      ? "No bookings available."
                      : "No bookings match your filters."}
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((item) => {
                  const status = String(item.status ?? "Pending")
                    .trim()
                    .toLowerCase();

                  const statusClass =
                    status === "pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : status === "in progress"
                      ? "bg-blue-500/20 text-blue-400"
                      : status === "cancelled"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400";

                  return (
                    <tr
                      key={item.id ?? item.booking_uid}
                      className="border-b border-slate-800 hover:bg-slate-800/50"
                    >
                      <td className="whitespace-nowrap p-4">
                        #{item.id ?? item.booking_id ?? "—"}
                      </td>
                      <td className="p-4">{item.brand || "—"}</td>
                      <td className="p-4">{item.service || "—"}</td>
                      <td className="p-4">
                        <span className={`inline-block whitespace-nowrap rounded-full px-3 py-1.5 text-xs ${statusClass}`}>
                          {item.status || "Pending"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            title="View Booking"
                            onClick={() => {
                              setSelectedBooking(item);
                              setShowViewModal(true);
                            }}
                            className="rounded-lg bg-cyan-500/20 p-2.5 text-cyan-400 hover:bg-cyan-500/30"
                          >
                            <FaEye />
                          </button>

                          <button
                            title="Update Status"
                            onClick={() => {
                              setSelectedBooking(item);
                              setShowStatusModal(true);
                            }}
                            className="rounded-lg bg-blue-500/20 p-2.5 text-blue-400 hover:bg-blue-500/30"
                          >
                            <FaEdit />
                          </button>

                          <button
                            title="Delete Booking"
                            onClick={() => {
                              setSelectedBooking(item);
                              setShowDeleteModal(true);
                            }}
                            className="rounded-lg bg-red-500/20 p-2.5 text-red-400 hover:bg-red-500/30"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!loading && !error && filteredBookings.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">
              Showing {startIndex + 1}–
              {Math.min(startIndex + BOOKINGS_PER_PAGE, filteredBookings.length)}{" "}
              of {filteredBookings.length}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-700 px-3 py-2 hover:bg-slate-800 disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm text-slate-300">
                Page {currentPage} of {Math.max(totalPages, 1)}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(Math.max(totalPages, 1), p + 1)
                  )
                }
                disabled={currentPage >= totalPages}
                className="rounded-lg border border-slate-700 px-3 py-2 hover:bg-slate-800 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {showViewModal && selectedBooking && (
          <ViewBookingModal
            booking={selectedBooking}
            onClose={() => {
              setShowViewModal(false);
              setSelectedBooking(null);
            }}
          />
        )}

        {showStatusModal && selectedBooking && (
          <StatusUpdateModal
            booking={selectedBooking}
            onClose={() => {
              setShowStatusModal(false);
              setSelectedBooking(null);
            }}
            onUpdate={handleStatusUpdate}
          />
        )}

        {showDeleteModal && selectedBooking && (
          <DeleteBookingModal
            booking={selectedBooking}
            onClose={() => {
              setShowDeleteModal(false);
              setSelectedBooking(null);
            }}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Bookings;

