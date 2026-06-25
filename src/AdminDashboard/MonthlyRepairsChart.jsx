const MonthlyRepairsChart = () => {
  const data = [
    { month: "Jan", repairs: 42 },
    { month: "Feb", repairs: 55 },
    { month: "Mar", repairs: 68 },
    { month: "Apr", repairs: 73 },
    { month: "May", repairs: 60 },
    { month: "Jun", repairs: 80 },
  ];

  return (
    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
      <h2 className="text-2xl font-bold text-white mb-6">
        Monthly Repairs
      </h2>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.month}>
            <div className="flex justify-between text-sm text-slate-300 mb-1">
              <span>{item.month}</span>
              <span>{item.repairs}</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-3">
              <div
                className="bg-cyan-500 h-3 rounded-full"
                style={{ width: `${item.repairs}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyRepairsChart;