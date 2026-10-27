
const Dashboardheader = ({ bookings = [] }) => {
  const total = bookings.length;

  const pending = bookings.filter(
    (item) => String(item.status || "Pending").trim().toLowerCase() === "pending"
  ).length;

  const completed = bookings.filter(
    (item) => String(item.status || "").trim().toLowerCase() === "completed"
  ).length;

  const inProgress = bookings.filter(
    (item) => String(item.status || "").trim().toLowerCase() === "in progress"
  ).length;

  const stats = [
    {
      title: "Total Bookings",
      value: total,
      color: "text-cyan-400",
      icon: "📋",
    },
    {
      title: "Pending",
      value: pending,
      color: "text-amber-400",
      icon: "⏳",
    },
    {
      title: "In Progress",
      value: inProgress,
      color: "text-blue-400",
      icon: "🔧",
    },
    {
      title: "Completed",
      value: completed,
      color: "text-emerald-400",
      icon: "✅",
    },
  ];

  return (
    <section className="mb-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white">
          Dashboard Overview
        </h2>

        <p className="mt-2 text-slate-400">
          Welcome back, Admin. Here is your live booking summary.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
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
    </section>
  );
};

export default Dashboardheader;