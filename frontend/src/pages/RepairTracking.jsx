
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaMobileAlt,
  FaTools,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSyncAlt,
} from "react-icons/fa";

const API_URL = "http://localhost:5000/api/bookings";

const steps = [
  {
    label: "Booking Received",
    status: "Pending",
    description: "Your repair request has been received.",
    icon: FaClock,
  },
  {
    label: "Repair In Progress",
    status: "In Progress",
    description: "The repair service is currently in progress.",
    icon: FaTools,
  },
  {
    label: "Repair Completed",
    status: "Completed",
    description: "Your repair has been marked as completed.",
    icon: FaCheckCircle,
  },
];

const RepairTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBooking = async (manualRefresh = false) => {
    try {
      if (manualRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to track your repair.");
        navigate("/login");
        return;
      }

      // Fetch bookings for the logged-in customer.
      // The backend must restrict this endpoint to the authenticated user.
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const bookings = Array.isArray(response.data)
        ? response.data
        : response.data.bookings || [];

      const matchedBooking = bookings.find(
        (item) => String(item.id) === String(id)
      );

      if (!matchedBooking) {
        setBooking(null);
        toast.error("Booking not found in your account.");
        return;
      }

      setBooking(matchedBooking);

      if (manualRefresh) {
        toast.success("Repair status refreshed.");
      }
    } catch (error) {
      console.error(
        "Repair tracking error:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        toast.error("Your session has expired. Please login again.");
        navigate("/login");
      } else {
        toast.error(
          error.response?.data?.message ||
            "Unable to load repair tracking."
        );
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBooking();
    // Fetch when the booking ID changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const status = booking?.status || "Pending";
  const currentStep = steps.findIndex(
    (step) => step.status === status
  );

  const statusColors = {
    Pending: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    "In Progress": "border-sky-400/30 bg-sky-400/10 text-sky-300",
    Completed:
      "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    Cancelled: "border-rose-400/30 bg-rose-400/10 text-rose-300",
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080f1e] text-white">
        <FaSyncAlt className="mr-3 animate-spin text-sky-400" />
        Loading repair details...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#080f1e] px-5 text-center text-white">
        <FaMobileAlt className="mb-4 text-5xl text-slate-500" />
        <h1 className="text-2xl font-bold">Booking Not Found</h1>
        <p className="mt-2 text-slate-400">
          We could not find this booking in your account.
        </p>
        <button
          onClick={() => navigate("/mybookings")}
          className="mt-6 rounded-xl bg-sky-400 px-5 py-3 font-semibold text-slate-950"
        >
          Back to My Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080f1e] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => navigate("/mybookings")}
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-sky-300"
        >
          <FaArrowLeft /> Back to My Bookings
        </button>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111b2e] shadow-2xl">
          <div className="bg-gradient-to-br from-blue-950 via-[#172554] to-[#111b2e] p-6 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                  MobileFix Tracking
                </p>
                <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                  Repair Status
                </h1>
                <p className="mt-2 text-slate-300">
                  Booking #{booking.id}
                </p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-400/10 text-3xl text-sky-300">
                <FaMobileAlt />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                  statusColors[status] || statusColors.Pending
                }`}
              >
                {status === "Cancelled" ? (
                  <FaTimesCircle />
                ) : (
                  <FaTools />
                )}
                {status}
              </span>

              <button
                onClick={() => fetchBooking(true)}
                disabled={refreshing}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10 disabled:opacity-50"
              >
                <FaSyncAlt
                  className={refreshing ? "animate-spin" : ""}
                />
                {refreshing ? "Refreshing..." : "Refresh Status"}
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-9">
            <h2 className="text-xl font-bold">Repair Journey</h2>
            <p className="mt-1 text-sm text-slate-400">
              Follow the current progress of your service request.
            </p>

            {status === "Cancelled" ? (
              <div className="mt-6 flex gap-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-5">
                <FaTimesCircle className="mt-1 shrink-0 text-2xl text-rose-400" />
                <div>
                  <h3 className="font-bold text-rose-300">
                    Booking Cancelled
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    This booking has been cancelled. Contact the service
                    team if you need further assistance.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-7 space-y-6">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const completed = index <= currentStep;

                  return (
                    <div key={step.status} className="flex gap-4 sm:gap-5">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
                            completed
                              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                              : "border-white/10 bg-white/[0.03] text-slate-500"
                          }`}
                        >
                          <Icon className="text-lg" />
                        </div>

                        {index !== steps.length - 1 && (
                          <div
                            className={`mt-2 min-h-10 w-0.5 flex-1 ${
                              index < currentStep
                                ? "bg-emerald-400"
                                : "bg-slate-700"
                            }`}
                          />
                        )}
                      </div>

                      <div className="flex-1 pb-3">
                        <h3
                          className={`font-bold ${
                            completed ? "text-white" : "text-slate-500"
                          }`}
                        >
                          {step.label}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {step.description}
                        </p>

                        {step.status === status && (
                          <span className="mt-3 inline-block rounded-lg border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-300">
                            Current Stage
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-8 grid gap-4 border-t border-white/10 pt-7 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <FaMobileAlt className="text-sky-400" />
                  Device
                </p>
                <p className="mt-2 font-bold">
                  {booking.brand} {booking.model}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <FaTools className="text-sky-400" />
                  Service
                </p>
                <p className="mt-2 font-bold">{booking.service}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:col-span-2">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <FaMapMarkerAlt className="text-sky-400" />
                  Service Address
                </p>
                <p className="mt-2 break-words text-sm leading-6 text-slate-200">
                  {booking.address || "Address not provided"}
                </p>
              </div>

              {booking.created_at && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:col-span-2">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <FaCalendarAlt className="text-sky-400" />
                    Booking Date
                  </p>
                  <p className="mt-2 font-semibold">
                    {new Date(booking.created_at).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/mybookings")}
              className="mt-7 w-full rounded-xl bg-sky-400 px-5 py-3.5 font-bold text-slate-950 transition hover:bg-sky-300"
            >
              Back to My Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairTracking;
