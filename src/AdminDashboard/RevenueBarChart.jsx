const RevenueBarChart = () => {
  const data = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 61000 },
    { month: "Apr", revenue: 70000 },
    { month: "May", revenue: 82000 },
    { month: "Jun", revenue: 95000 },
  ];

  const max = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
      <h2 className="text-2xl font-bold text-white mb-6">
        Revenue Chart
      </h2>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.month}>
            <div className="flex justify-between text-slate-300 text-sm mb-1">
              <span>{item.month}</span>
              <span>₹{item.revenue}</span>
            </div>

            <div className="w-full bg-slate-800 h-3 rounded-full">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{
                  width: `${(item.revenue / max) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueBarChart;