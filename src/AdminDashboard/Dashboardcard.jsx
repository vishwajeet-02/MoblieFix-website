import { FaCheckCircle, FaClipboard, FaTools } from "react-icons/fa"
import { FaClock } from "react-icons/fa6"
import { useState } from "react";
  
const Dashboardcard =()=>{
const [totalBookings] = useState(0);
const [pendingBookings] = useState(0);
const [progressBookings] = useState(0);
const [completedBookings] = useState(0);
    return (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:scale-105 transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400">Total Bookings</p>
          <h2 className="text-4xl font-bold text-white mt-2">{totalBookings}</h2>
        </div>
        <FaClipboard className="text-cyan-400 text-4xl" />
      </div>
    </div>

    <div className="bg-slate-900 border border-yellow-500/20 rounded-3xl p-6 hover:scale-105 transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400">Pending</p>
          <h2 className="text-4xl font-bold text-yellow-400 mt-2">{pendingBookings}</h2>
        </div>
        <FaClock className="text-yellow-400 text-4xl" />
      </div>
    </div>

    <div className="bg-slate-900 border border-blue-500/20 rounded-3xl p-6 hover:scale-105 transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400">In Progress</p>
          <h2 className="text-4xl font-bold text-blue-400 mt-2">{progressBookings}</h2>
        </div>
        <FaTools className="text-blue-400 text-4xl" />
      </div>
    </div>

    <div className="bg-slate-900 border border-green-500/20 rounded-3xl p-6 hover:scale-105 transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400">Completed</p>
          <h2 className="text-4xl font-bold text-green-400 mt-2">{completedBookings}</h2>
        </div>
        <FaCheckCircle className="text-green-400 text-4xl" />
      </div>
    </div>

  </div>
);
}
export default Dashboardcard