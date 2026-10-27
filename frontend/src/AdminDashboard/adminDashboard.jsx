
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboardheader from "./Dashboardheader";
import BookingAnalytics from "./BookingAnalytics";

const API_URL = "http://localhost:5000/api/admin/bookings";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
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

      const result = Array.isArray(data) ? data : data.bookings;

      if (!Array.isArray(result)) {
        throw new Error("Invalid bookings response from server");
      }

      setBookings(result);
    } catch (err) {
      console.error("Dashboard bookings error:", err);
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

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-[1800px] px-3 pb-24 pt-6 sm:px-5 md:px-6 md:pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-slate-400">
              Monitor repair services and booking statistics.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchBookings}
            disabled={loading}
            className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold hover:bg-cyan-500 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        <section className="mt-6">
        <Dashboardheader bookings={bookings} />
        </section>

        {error && (
          <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
            <button
              type="button"
              onClick={fetchBookings}
              className="ml-3 underline"
            >
              Try again
            </button>
          </div>
        )}

        <section className="mt-6">
          <BookingAnalytics bookings={bookings} />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
