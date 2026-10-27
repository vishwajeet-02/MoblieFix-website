
const MonthlyRepairsChart = () => {
  const data = [
    { month: "Jan", repairs: 42 },
    { month: "Feb", repairs: 55 },
    { month: "Mar", repairs: 68 },
    { month: "Apr", repairs: 73 },
    { month: "May", repairs: 60 },
    { month: "Jun", repairs: 80 },
  ];

  const maxRepairs = Math.max(...data.map((item) => item.repairs));

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Monthly Repairs
      </h2>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.month}>
            <div className="mb-1 flex justify-between text-sm text-slate-300">
              <span>{item.month}</span>
              <span>{item.repairs} repairs</span>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-3 rounded-full bg-cyan-500 transition-all duration-500"
                style={{
                  width: `${(item.repairs / maxRepairs) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyRepairsChart;
