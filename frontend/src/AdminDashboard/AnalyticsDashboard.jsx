
import { useEffect, useState } from "react";
import Dashboardheader from "./Dashboardheader";
import RevenueBarChart from "./RevenueBarChart";
import MonthlyRepairsChart from "./MonthlyRepairsChart";
import RepairStatusPieChart from "./RepairStatusPieChart";
import ConfirmationModal from "./ConfirmationModal";

const API_URL = "http://localhost:5000/api/admin/bookings";

const AnalyticsDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const response = await fetch(API_URL, {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        });

        if (!response.ok) {
          throw new Error(`Failed to load bookings (${response.status})`);
        }

        const result = await response.json();

        const bookingList = Array.isArray(result)
          ? result
          : Array.isArray(result?.bookings)
          ? result.bookings
          : Array.isArray(result?.data)
          ? result.data
          : [];

        setBookings(bookingList);
      } catch (err) {
        setError(err.message || "Unable to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleConfirm = () => {
    alert("Report Generated Successfully");
    setShowModal(false);
  };

  const totalBookings = bookings.length;

  const completed = bookings.filter(
    (item) => String(item.status || "").trim().toLowerCase() === "completed"
  ).length;

  const cancelled = bookings.filter((item) => {
    const status = String(item.status || "").trim().toLowerCase();
    return status === "cancelled" || status === "canceled";
  }).length;

  const cancellationRate =
    totalBookings > 0
      ? ((cancelled / totalBookings) * 100).toFixed(1)
      : "0.0";

  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-hidden bg-slate-950 p-3 text-white sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-[1600px] min-w-0">
        <Dashboardheader />

        <header className="mb-6 mt-5 sm:mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Analytics Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Monitor bookings, repair status and business growth
          </p>
        </header>

        {loading && (
          <p className="mb-6 text-cyan-400">
            Loading booking analytics...
          </p>
        )}

        {error && (
          <div className="mb-6 break-words rounded-xl border border-red-800 bg-red-950 p-4 text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Booking Stats */}
            <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5 lg:mb-8 lg:gap-6">
              <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
                <h3 className="text-sm text-slate-400 sm:text-base">
                  Total Bookings
                </h3>
                <p className="mt-2 text-3xl font-bold text-cyan-400">
                  {totalBookings}
                </p>
              </div>

              <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
                <h3 className="text-sm text-slate-400 sm:text-base">
                  Completed Repairs
                </h3>
                <p className="mt-2 text-3xl font-bold text-green-400">
                  {completed}
                </p>
              </div>

              <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
                <h3 className="text-sm text-slate-400 sm:text-base">
                  Cancelled Bookings
                </h3>
                <p className="mt-2 text-3xl font-bold text-rose-400">
                  {cancelled}
                </p>
              </div>

              <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
                <h3 className="text-sm text-slate-400 sm:text-base">
                  Cancellation Rate
                </h3>
                <p className="mt-2 text-3xl font-bold text-amber-400">
                  {cancellationRate}%
                </p>
              </div>
            </section>

            {/* Charts */}
            <section className="mb-6 grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2 lg:mb-8 lg:gap-6">
              <div className="min-w-0">
                <RevenueBarChart />
              </div>

              <div className="min-w-0">
                <RepairStatusPieChart bookings={bookings} />
              </div>
            </section>

            {/* Monthly Repairs */}
            <section className="mb-6 min-w-0 lg:mb-8">
              <MonthlyRepairsChart />
            </section>

            {/* Generate Report */}
            <div className="mt-6 pb-4 sm:mt-8">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="w-full rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 sm:w-auto"
              >
                Generate Report
              </button>
            </div>
          </>
        )}

        {showModal && (
          <ConfirmationModal
            title="Generate Analytics Report"
            message="Do you want to generate the latest analytics report?"
            onConfirm={handleConfirm}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </main>
  );
};

export default AnalyticsDashboard;
