
import { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaMobileAlt,
  FaMapMarkerAlt,
  FaTools,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSyncAlt,
  FaEdit,
  FaTrash,
  FaArrowRight,
  FaCalendarAlt,
} from "react-icons/fa";
import { EditContext } from "../contextapi/Editcontext";

const API_URL = "http://localhost:5000/api/bookings";

const STATUS_STEPS = ["Pending", "In Progress", "Completed"];

const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return {
        badge: "bg-amber-400/15 text-amber-300 border-amber-400/30",
        dot: "bg-amber-400",
      };
    case "In Progress":
      return {
        badge: "bg-sky-400/15 text-sky-300 border-sky-400/30",
        dot: "bg-sky-400",
      };
    case "Completed":
      return {
        badge: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
        dot: "bg-emerald-400",
      };
    case "Cancelled":
      return {
        badge: "bg-rose-400/15 text-rose-300 border-rose-400/30",
        dot: "bg-rose-400",
      };
    default:
      return {
        badge: "bg-slate-400/15 text-slate-300 border-slate-400/30",
        dot: "bg-slate-400",
      };
  }
};

const MyBookings = () => {
  const { setEditData } = useContext(EditContext);
  const navigate = useNavigate();

  const [booking, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Please login first.");
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchBookings = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) {
        setRefreshing(true);
      }

      const res = await axios.get(API_URL, getAuthConfig());

      const bookings = Array.isArray(res.data)
        ? res.data
        : res.data.bookings || [];

      setBookings(bookings);

      return true;
    } catch (error) {
      console.error(
        "Fetch bookings error:",
        error.response?.data || error.message
      );

      if (
        error.response?.status === 401 ||
        error.message === "Please login first."
      ) {
        toast.error("Please login again to view your bookings.");
        navigate("/login");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to load bookings."
        );
      }

      return false;
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleRefresh = async () => {
    const success = await fetchBookings(true);

    if (success) {
      toast.success("Booking status refreshed.");
    }
  };

  const handleEdit = (item) => {
    if (["Cancelled", "Completed"].includes(item.status)) {
      toast.error("This booking cannot be edited.");
      return;
    }

    setEditData(item);
    navigate("/bookrepair");
  };

  const cancelBooking = async (id) => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel Booking #${id}?`
    );

    if (!confirmed) return;

    try {
      setCancellingId(id);

      await axios.patch(
        `${API_URL}/${id}/cancel`,
        {},
        getAuthConfig()
      );

      toast.success("Booking cancelled successfully!");
      await fetchBookings();
    } catch (error) {
      console.error(
        "Cancel booking error:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to cancel booking."
        );
      }
    } finally {
      setCancellingId(null);
    }
  };

  const deleteBooking = async (id) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete Booking #${id}?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await axios.delete(`${API_URL}/${id}`, getAuthConfig());

      toast.success("Booking deleted permanently!");
      await fetchBookings();
    } catch (error) {
      console.error(
        "Delete booking error:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to delete booking."
        );
      }
    } finally {
      setDeletingId(null);
    }
  };

  const renderTimeline = (status) => {
    if (status === "Cancelled") {
      return (
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-rose-400/20 bg-rose-400/10 p-4">
          <FaTimesCircle className="shrink-0 text-xl text-rose-400" />
          <div>
            <p className="font-semibold text-rose-300">
              Booking Cancelled
            </p>
            <p className="mt-1 text-xs text-slate-400">
              This repair booking is no longer active.
            </p>
          </div>
        </div>
      );
    }

    const currentIndex = STATUS_STEPS.indexOf(status || "Pending");

    return (
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">
            Repair Progress
          </h3>
          <span className="text-xs text-slate-400">
            Step {currentIndex + 1} of 3
          </span>
        </div>

        <div className="flex items-start">
          {STATUS_STEPS.map((step, index) => {
            const completed = index <= currentIndex;

            const Icon =
              index === 0
                ? FaClock
                : index === 1
                ? FaTools
                : FaCheckCircle;

            return (
              <div key={step} className="relative flex-1 text-center">
                {index > 0 && (
                  <div
                    className={`absolute right-1/2 top-4 h-0.5 w-full ${
                      index <= currentIndex
                        ? "bg-emerald-400"
                        : "bg-slate-700"
                    }`}
                  />
                )}

                <div
                  className={`relative z-10 mx-auto flex h-9 w-9 items-center justify-center rounded-full border ${
                    completed
                      ? "border-emerald-400 bg-emerald-400 text-slate-950"
                      : "border-slate-600 bg-slate-800 text-slate-400"
                  }`}
                >
                  <Icon size={13} />
                </div>

                <p
                  className={`mt-2 text-[11px] font-medium sm:text-xs ${
                    completed ? "text-emerald-300" : "text-slate-500"
                  }`}
                >
                  {step}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#080f1e] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-9 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#172554] via-[#102040] to-[#0f172a] p-6 shadow-2xl sm:p-9">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-sky-300">
                <FaTools />
                MOBILEFIX SERVICE CENTER
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                My <span className="text-sky-400">Bookings</span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Manage your repair requests and track the progress
                of your mobile repair in one place.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-400/15 text-2xl text-sky-300">
                <FaMobileAlt />
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold">{booking.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        {!loading && (
          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              {
                label: "Pending",
                count: booking.filter(
                  (item) => (item.status || "Pending") === "Pending"
                ).length,
                color: "text-amber-300",
                icon: FaClock,
              },
              {
                label: "In Progress",
                count: booking.filter(
                  (item) => item.status === "In Progress"
                ).length,
                color: "text-sky-300",
                icon: FaTools,
              },
              {
                label: "Completed",
                count: booking.filter(
                  (item) => item.status === "Completed"
                ).length,
                color: "text-emerald-300",
                icon: FaCheckCircle,
              },
              {
                label: "Cancelled",
                count: booking.filter(
                  (item) => item.status === "Cancelled"
                ).length,
                color: "text-rose-300",
                icon: FaTimesCircle,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-[#111b2e] p-4 transition hover:-translate-y-1 hover:border-sky-400/30 sm:p-5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-slate-400 sm:text-sm">
                      {item.label}
                    </p>
                    <Icon className={item.color} />
                  </div>

                  <p className={`mt-3 text-3xl font-bold ${item.color}`}>
                    {item.count}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Section Heading */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Your Repair Requests
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              View the details and latest status of your bookings.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className="inline-flex items-center gap-2 rounded-xl border border-sky-400/30 bg-sky-400/10 px-4 py-2.5 text-sm font-semibold text-sky-300 transition hover:bg-sky-400/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaSyncAlt className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Refreshing..." : "Refresh Status"}
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-[#111b2e] px-6 py-20 text-center">
            <FaSyncAlt className="mx-auto mb-4 animate-spin text-3xl text-sky-400" />
            <p className="text-lg font-semibold text-white">
              Loading your bookings...
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Please wait while we fetch your repair details.
            </p>
          </div>
        ) : booking.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-[#111b2e] px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-400/10 text-3xl text-sky-300">
              <FaMobileAlt />
            </div>

            <h3 className="mt-5 text-xl font-bold">
              No Bookings Yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              Your repair requests will appear here once you book a
              service with MobileFix.
            </p>

            <button
              type="button"
              onClick={() => navigate("/bookrepair")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-sky-300"
            >
              Book a Repair <FaArrowRight />
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {booking.map((item) => {
              const status = item.status || "Pending";
              const isCancelled = status === "Cancelled";
              const isCompleted = status === "Completed";
              const cannotModify = isCancelled || isCompleted;
              const statusStyle = getStatusStyle(status);

              return (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-[#111b2e] shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:shadow-2xl hover:shadow-sky-950/30"
                >
                  {/* Card Header */}
                  <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#172554] to-[#111b2e] p-5">
                    <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-sky-400/10 blur-2xl transition group-hover:bg-sky-400/20" />

                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-400/10 text-xl text-sky-300">
                          <FaMobileAlt />
                        </div>

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                            Repair Request
                          </p>
                          <h3 className="mt-1 text-lg font-bold text-white">
                            Booking #{item.id}
                          </h3>
                        </div>
                      </div>

                      <span
                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-bold sm:text-xs ${statusStyle.badge}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                        />
                        {status}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="mb-5">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        Device Details
                      </p>

                      <h4 className="mt-2 text-xl font-bold text-white">
                        {item.brand} {item.model}
                      </h4>

                      <p className="mt-2 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300">
                        <FaTools className="text-sky-400" />
                        {item.service}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        <FaMapMarkerAlt className="text-sky-400" />
                        Service Address
                      </p>

                      <p className="break-words text-sm leading-6 text-slate-200">
                        {item.address || "Address not provided"}
                      </p>
                    </div>

                    {item.created_at && (
                      <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                        <FaCalendarAlt />
                        Booked on{" "}
                        {new Date(item.created_at).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                    )}

                    {renderTimeline(status)}

                    {/* Card Actions */}
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                       onClick={() => navigate(`/mybookings/${item.id}/track`)}
                        className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-sky-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-sky-300"
                      >
                        Track Repair <FaArrowRight size={12} />
                      </button>

                      <button
                        type="button"
                        disabled={cannotModify || cancellingId === item.id}
                        onClick={() => cancelBooking(item.id)}
                        className="flex items-center justify-center gap-2 rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-3 text-sm font-semibold text-rose-300 transition hover:bg-rose-400/20 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <FaTimesCircle />
                        {cancellingId === item.id
                          ? "Cancelling..."
                          : isCancelled
                          ? "Cancelled"
                          : isCompleted
                          ? "Completed"
                          : "Cancel"}
                      </button>

                      <button
                        type="button"
                        disabled={cannotModify}
                        onClick={() => handleEdit(item)}
                        className="flex items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={deletingId === item.id}
                        onClick={() => deleteBooking(item.id)}
                        className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-sm font-semibold text-slate-400 transition hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-300 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <FaTrash />
                        {deletingId === item.id
                          ? "Deleting..."
                          : "Delete Booking"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-slate-500">
          <FaCheckCircle className="text-emerald-400" />
          MobileFix — Your device, our responsibility.
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
