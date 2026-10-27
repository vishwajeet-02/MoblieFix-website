
const RepairStatusPieChart = ({ bookings = [] }) => {
  const statuses = [
    { status: "Completed", color: "bg-green-500" },
    { status: "Pending", color: "bg-yellow-500" },
    { status: "In Progress", color: "bg-blue-500" },
    { status: "Cancelled", color: "bg-rose-500" },
  ];

  const getCount = (status) =>
    bookings.filter(
      (item) =>
        String(item.status || "").toLowerCase() ===
        status.toLowerCase()
    ).length;

  const total = bookings.length;
  const cancelled = getCount("Cancelled");

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Repair Status
      </h2>

      <p className="mb-5 text-sm text-slate-400">
        Total bookings: {total}
      </p>

      <div className="space-y-5">
        {statuses.map((item) => {
          const count = getCount(item.status);
          const percentage =
            total > 0 ? (count / total) * 100 : 0;

          return (
            <div key={item.status}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-300">
                  {item.status}
                </span>
                <span className="text-white">
                  {count} ({percentage.toFixed(1)}%)
                </span>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-3 rounded-full ${item.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-slate-700 p-4">
        <p className="text-sm text-slate-400">
          Cancellation Rate
        </p>
        <p className="mt-1 text-2xl font-bold text-rose-400">
          {total > 0 ? ((cancelled / total) * 100).toFixed(1) : "0.0"}%
        </p>
      </div>
    </div>
  );
};

export default RepairStatusPieChart;
