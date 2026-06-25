const RepairStatusPieChart = () => {
  const data = [
    { status: "Completed", value: 120, color: "bg-green-500" },
    { status: "Pending", value: 70, color: "bg-yellow-500" },
    { status: "In Progress", value: 58, color: "bg-blue-500" },
  ];

  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
      <h2 className="text-2xl font-bold text-white mb-6">
        Repair Status
      </h2>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.status} className="flex items-center justify-between">
            <span className="text-slate-300">{item.status}</span>

            <div className="flex items-center gap-3 w-2/3">
              <div className="w-full bg-slate-800 h-3 rounded-full">
                <div
                  className={`${item.color} h-3 rounded-full`}
                  style={{ width: `${(item.value / total) * 100}%` }}
                ></div>
              </div>

              <span className="text-white text-sm">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepairStatusPieChart;