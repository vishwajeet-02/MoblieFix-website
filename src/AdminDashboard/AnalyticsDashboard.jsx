import { useState } from "react";
import Dashboardheader from "./Dashboardheader";
import RevenueBarChart from "./RevenueBarChart";
import MonthlyRepairsChart from "./MonthlyRepairsChart";
import RepairStatusPieChart from "./RepairStatusPieChart";
import RevenueCard from "./RevenueCard";
import ConfirmationModal from "./ConfirmationModal";

const AnalyticsDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    alert("Report Generated Successfully");
    setShowModal(false);
  };

  return (
    <main className="ml-72 p-6">
      <Dashboardheader />

      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Analytics Dashboard
        </h1>
        <p className="text-slate-400">
          Monitor revenue, repairs and business growth
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <h3 className="text-slate-400">Revenue</h3>
          <p className="text-3xl font-bold text-green-400">₹1,25,000</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <h3 className="text-slate-400">Repairs</h3>
          <p className="text-3xl font-bold text-cyan-400">248</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <h3 className="text-slate-400">Customers</h3>
          <p className="text-3xl font-bold text-blue-400">156</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <h3 className="text-slate-400">Technicians</h3>
          <p className="text-3xl font-bold text-purple-400">12</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-4">
            Revenue Chart
          </h2>

          <div className="h-64 flex items-center justify-center text-slate-400">
            Revenue Chart Here
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-4">
            Repair Status
          </h2>

          <div className="h-64 flex items-center justify-center text-slate-400">
            Pie Chart Here
          </div>
        </div>

      </div>

      {/* Monthly Repairs */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-4">
          Monthly Repairs
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 p-4 rounded-xl">
            <p className="text-slate-400">Jan</p>
            <h3 className="text-2xl font-bold text-cyan-400">42</h3>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl">
            <p className="text-slate-400">Feb</p>
            <h3 className="text-2xl font-bold text-cyan-400">55</h3>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl">
            <p className="text-slate-400">Mar</p>
            <h3 className="text-2xl font-bold text-cyan-400">68</h3>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl">
            <p className="text-slate-400">Apr</p>
            <h3 className="text-2xl font-bold text-cyan-400">73</h3>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 rounded-xl bg-cyan-500 text-white"
        >
          Generate Report
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <ConfirmationModal
          title="Generate Analytics Report"
          message="Do you want to generate the latest analytics report?"
          onConfirm={handleConfirm}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
};

export default AnalyticsDashboard;