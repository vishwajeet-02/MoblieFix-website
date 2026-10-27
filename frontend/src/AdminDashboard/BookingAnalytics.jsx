
import { useMemo, useState } from "react";
import {
  FaCalendarDay,
  FaChartBar,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

const STATUS_OPTIONS = [
  { label: "Pending", color: "bg-amber-400", text: "text-amber-400" },
  { label: "In Progress", color: "bg-blue-400", text: "text-blue-400" },
  { label: "Completed", color: "bg-emerald-400", text: "text-emerald-400" },
  { label: "Cancelled", color: "bg-red-400", text: "text-red-400" },
];

const getStatus = (value) => {
  const status = String(value || "Pending")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  if (status === "in progress") return "In Progress";
  if (status === "completed") return "Completed";
  if (status === "cancelled" || status === "canceled") return "Cancelled";

  return "Pending";
};

const getBookingDate = (item) => {
  const value =
    item.created_at ??
    item.createdAt ??
    item.booking_date ??
    item.bookingDate;

  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

const dateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const startOfWeek = (date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);

  const day = result.getDay();
  result.setDate(result.getDate() - ((day + 6) % 7));

  return result;
};

const BookingAnalytics = ({ bookings = [] }) => {
  const [period, setPeriod] = useState("daily");

  const analytics = useMemo(() => {
    const now = new Date();

    const validBookings = bookings.map((item) => ({
      ...item,
      _analyticsDate: getBookingDate(item),
      _analyticsStatus: getStatus(item.status),
    }));

    const total = bookings.length;

    const statusCounts = STATUS_OPTIONS.map((status) => ({
      ...status,
      count: validBookings.filter(
        (item) => item._analyticsStatus === status.label
      ).length,
    }));

    const completed = statusCounts.find(
      (item) => item.label === "Completed"
    )?.count || 0;

    const pending = statusCounts.find(
      (item) => item.label === "Pending"
    )?.count || 0;

    const cancelled = statusCounts.find(
      (item) => item.label === "Cancelled"
    )?.count || 0;

    const cancellationRate = total
      ? (cancelled / total) * 100
      : 0;

    let buckets = [];

    if (period === "daily") {
      buckets = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(now);
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - (6 - index));

        return {
          key: dateKey(date),
          label: date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          }),
          start: date,
          end: new Date(date.getTime() + 86400000),
        };
      });
    } else if (period === "weekly") {
      buckets = Array.from({ length: 8 }, (_, index) => {
        const endWeek = startOfWeek(now);
        const start = new Date(endWeek);
        start.setDate(start.getDate() - (7 * (7 - index)));

        const end = new Date(start);
        end.setDate(end.getDate() + 7);

        return {
          key: dateKey(start),
          label: start.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          }),
          start,
          end,
        };
      });
    } else {
      buckets = Array.from({ length: 6 }, (_, index) => {
        const start = new Date(
          now.getFullYear(),
          now.getMonth() - (5 - index),
          1
        );

        const end = new Date(
          start.getFullYear(),
          start.getMonth() + 1,
          1
        );

        return {
          key: `${start.getFullYear()}-${start.getMonth() + 1}`,
          label: start.toLocaleDateString("en-IN", {
            month: "short",
            year: "2-digit",
          }),
          start,
          end,
        };
      });
    }

    const trend = buckets.map((bucket) => ({
      ...bucket,
      count: validBookings.filter((item) => {
        const date = item._analyticsDate;

        return date && date >= bucket.start && date < bucket.end;
      }).length,
    }));

    const maxTrend = Math.max(1, ...trend.map((item) => item.count));

    return {
      total,
      completed,
      pending,
      cancelled,
      cancellationRate,
      statusCounts,
      trend,
      maxTrend,
    };
  }, [bookings, period]);

  const cards = [
    {
      title: "Total Bookings",
      value: analytics.total,
      icon: <FaChartBar />,
      color: "text-cyan-400",
      background: "bg-cyan-500/10",
    },
    {
      title: "Completed",
      value: analytics.completed,
      icon: <FaCheckCircle />,
      color: "text-emerald-400",
      background: "bg-emerald-500/10",
    },
    {
      title: "Pending",
      value: analytics.pending,
      icon: <FaClock />,
      color: "text-amber-400",
      background: "bg-amber-500/10",
    },
    {
      title: "Cancelled",
      value: analytics.cancelled,
      icon: <FaTimesCircle />,
      color: "text-red-400",
      background: "bg-red-500/10",
    },
  ];

  return (
    <section className="mx-auto mt-6 w-full max-w-7xl space-y-6 overflow-hidden px-1 sm:mt-8 sm:px-2">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Booking Analytics
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Booking trends, status distribution and cancellation insights
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{card.title}</p>
              <div
                className={`rounded-xl p-3 ${card.background} ${card.color}`}
              >
                {card.icon}
              </div>
            </div>

            <p className="mt-4 text-3xl font-bold text-white">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Booking trend chart */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Booking Trends
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Number of bookings by time period
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
              { value: "monthly", label: "Monthly" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPeriod(option.value)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  period === option.value
                    ? "bg-cyan-500 text-slate-950"
                    : "border border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-1.5 sm:mt-8 sm:gap-4">
          {analytics.trend.map((item) => (
            <div
              key={item.key}
              className="flex min-w-0 flex-col items-center"
            >
              <span className="mb-2 text-xs font-semibold text-slate-300">
                {item.count}
              </span>

              <div className="flex h-32 w-full items-end justify-center rounded-lg bg-slate-800/60 p-1 sm:h-44 sm:p-2">
                <div
                  title={`${item.label}: ${item.count} bookings`}
                  className="w-full max-w-10 rounded-t-md bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-300"
                  style={{
                    height: `${Math.max(
                      item.count > 0 ? 5 : 0,
                      (item.count / analytics.maxTrend) * 100
                    )}%`,
                  }}
                />
              </div>

              <span className="mt-3 text-center text-[10px] text-slate-400 sm:text-xs">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs text-slate-500">
          {period === "daily"
            ? "Last 7 days"
            : period === "weekly"
            ? "Last 8 weeks (weeks start Monday)"
            : "Last 6 months"}
        </p>
      </div>

      {/* Status distribution and cancellation rate */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-white">
            Status-wise Bookings
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Distribution across all loaded bookings
          </p>

          <div className="mt-6 space-y-5">
            {analytics.statusCounts.map((item) => {
              const percentage = analytics.total
                ? (item.count / analytics.total) * 100
                : 0;

              return (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className={`text-sm font-medium ${item.text}`}>
                      {item.label}
                    </span>

                    <span className="text-sm text-slate-300">
                      {item.count} ({percentage.toFixed(1)}%)
                    </span>
                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${item.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-500/10 p-3 text-red-400">
              <FaCalendarDay />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                Cancellation Rate
              </h3>
              <p className="text-sm text-slate-400">
                Cancelled bookings ÷ total bookings
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-5xl font-bold text-white">
              {analytics.cancellationRate.toFixed(1)}%
            </p>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-red-400 transition-all duration-300"
                style={{
                  width: `${analytics.cancellationRate}%`,
                }}
              />
            </div>

            <div className="mt-5 flex justify-between gap-4 text-sm">
              <span className="text-slate-400">
                Cancelled: {analytics.cancelled}
              </span>
              <span className="text-slate-400">
                Total: {analytics.total}
              </span>
            </div>
          </div>

          <p className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
            {analytics.total === 0
              ? "No bookings available to calculate the cancellation rate."
              : analytics.cancellationRate > 20
              ? "Cancellation rate is above 20%. Review cancellation reasons to identify possible improvements."
              : "Cancellation rate is 20% or lower. Continue monitoring booking outcomes."}
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Analytics are calculated from the bookings currently loaded by the dashboard.
        Trend charts require a valid booking creation date.
      </p>
    </section>
  );
};

export default BookingAnalytics;
