const RevenueCard = ({ title, amount, color }) => {
  return (
    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
      <h3 className="text-slate-400">{title}</h3>

      <p className={`text-3xl font-bold ${color}`}>
        ₹{amount}
      </p>
    </div>
  );
};

export default RevenueCard;