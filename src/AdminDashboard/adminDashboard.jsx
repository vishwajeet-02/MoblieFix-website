import { Link  } from "react-router-dom";
import { FaChartBar, FaClipboard, FaCog, FaEdit, FaEye, FaSignOutAlt, FaTachometerAlt, FaTrash, FaUserTie } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import Dashboardheader from "./Dashboardheader";
import Dashboardcard from "./Dashboardcard";
import ViewBookingModal from "./ViewBookingModal";
import StatusUpdateModal from "./updatbokings";
import DeleteBookingModal from "./DeleteBookingModal"
import ExportTools from "../components/ExportTool";

import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AdminDashboard=()=>{
    const [selectedBooking, setSelectedBooking] = useState(null);
const handleStatusUpdate = (id, newStatus) => {
  console.log("Booking ID:", id);
  console.log("New Status:", newStatus);

  setShowStatusModal(false);
};
const handleDelete = (id) => {
  console.log("Delete Booking:", id);

  setShowDeleteModal(false);
};
const [showViewModal, setShowViewModal] = useState(false);
const [showStatusModal, setShowStatusModal] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate= useNavigate()
    useEffect(()=>{
        const login=localStorage.getItem("isAdminLoggedIn");
        if(login !=="true"){
            navigate("/login")
        }
    },[])
const [search,setSearch]=useState("");
const[statusFilter,setStatusFilter]=useState("All")
const bookings = [
  {
    id: 1,
    brand: "Samsung",
    service: "Screen Repair",
    status: "Pending",
  },
];


const [booking,setBooking] = useState([])
useEffect(() => {
  fetch("http://localhost:3000/userdata")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (Array.isArray(data)) {
        setBooking(data);
      } else {
        setBooking([]);
      }
    })
    .catch((err) => {
      console.log(err);
      setBooking([]);
    });
}, []);
  const filteredBookings = Array.isArray(booking)
  ? booking.filter((item) => {
      const matchesSearch =
        item.id?.toString().includes(search) ||
        item.brand?.toLowerCase().includes(search.toLowerCase()) ||
        item.service?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All"
          ? true
          : item.status ==="pending";

      return matchesSearch && matchesStatus;
    })
  : [];
    return(
    
<>
 <div>
    
    
    <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-950 border-r border-slate-800 shadow-2xl z-40">
       
        <div className="p-6 border-b border-slate-800">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">MobileFix</h1>
            <p className="text-slate-400 text-sm mt-1">Admin Dashboard</p>
            </div>
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                    <div className=" w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500
                     to-blue-600 flex items-center justify-center font-bold text-lg">A</div>
                     <div>
                        <h3 className="font-semibold text-white">Admin</h3>
                        <p className="text-sm text-slate-400">Super Admiin</p>
                     </div>
                </div>
            </div>
        <div className="p-4 space-y-2">
          <Link to="/AdminDashboard" className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-800 text-white">
           <FaTachometerAlt/>
             Dashboard
          </Link>
         
          {/* <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-800 text-white"> <FaTachometerAlt/>
            Dashboard
            </button> */}
          <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-800 text-white"><FaClipboard/>
            Bookings
            </button>
           <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-800 text-white"><FaUsers/>
            Customer

           </button>
            <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-800 text-white"><FaUserTie/>
                Technicians
                 </button>
              
  <Link
  to="/analytics"
  className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-800 text-white"
>
  <FaChartBar />
  Analytics
</Link>
             {/* <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-800 text-white"><FaChartBar/>
                Analytics
                </button> */}
      
               <button className="w-full flex items-center gap-4 p-4 bg-slate-800 text-white rounded-xl"><FaCog/>
                Settings

               </button>
                <button  onClick={() =>{
                      localStorage.removeItem("isAdminLoggedIn")
                    localStorage.removeItem("AdminDashboard");
                   navigate("/");
                }}

  className="w-full flex items-center justify-center gap-3 py-4 bg-red-500/30 text-red-400  hover:bg-red-500/30 transition rounded-xl " >
    <FaSignOutAlt/>Logout</button>
  </div>
  
  </aside>
  <main className="ml-72 p-6"> 
     <Dashboardheader/>
     <Dashboardcard/>

       <div className="mt-8 mb-6">
    <h2 className="text-2xl font-bold text-white">
      Booking Management
    </h2>
    <p className="text-slate-400">
      Manage and track all customer bookings
    </p>
  </div>
 <div className="flex flex-col md:flex-row gap-4 mb-6">
    <input type="text" placeholder="Search MyBookings..." value={search} onChange={(e)=>setSearch(e.target.value)}
    className="flex-1 p-4 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none"/>
    <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}
    className="p-4 rounded-xl bg-slate-900  border-slate-800 text-white">
<option>All</option>
<option>Pending</option>
<option>In Progress</option>
<option>Completed</option>
</select>
  </div>
  <div className="overflow-hidden rounded-3xl  bg-slate-900 border border-slate-800 ">
    <table className="w-full">
        <thead>
            <tr className="border-b border-slate-800">
                <th className="p-5 text-left text-slate-400">ID</th>
                  <th className="p-5 text-left text-slate-400">Brand</th>
                    <th className="p-5 text-left text-slate-400">Service</th>
                      <th className="p-5 text-left text-slate-400">Status</th>
                        <th className="p-5 text-left text-slate-400">Actions</th>
            </tr>
        </thead>
        <tbody>
            {filteredBookings.map((item)=>(
                <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="p-5 text-white ">#{item.id}</td>
                      <td className="p-5 text-white">#{item.brand}</td>
                        <td className="p-5 text-white">#{item.service}</td>
                          <td className="p-5">
                            <span className={`px-4 py-2 rounded-full text-sm
                            ${item.status==="Pending" ? "bg-yellow-500/20 text-yellow-400"
                            :item.status==="In Progress"  ? "bg-blue-500/20 text-blue-400" 
                            :"bg-green-500/20 text-green-400"  
                            }
                            `}>{item.status}</span>
                        </td>
                          <td className="p-5">
                            <div className="flex gap-3">
                                <button
  onClick={() => {
    setSelectedBooking(item);
    setShowViewModal(true);
  }}
  className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400"
>
  <FaEye />
</button>

<button
  onClick={() => {
    setSelectedBooking(item);
    setShowStatusModal(true);
  }}
  className="p-3 rounded-xl bg-blue-500/20 text-blue-400"
>
  <FaEdit />
</button>

<button
  onClick={() => {
    setSelectedBooking(item);
    setShowDeleteModal(true);
  }}
  className="p-3 rounded-xl bg-red-500/20 text-red-400"
>
  <FaTrash />
</button>
                            </div>
                          </td>
                </tr>
            ))}
        </tbody>
    </table>
  {/* <bookinbg.json/> */}
    
  </div>
     {showViewModal && (
  <ViewBookingModal
    booking={selectedBooking}
    onClose={() => setShowViewModal(false)}
  />
)}

{showStatusModal && (
  <StatusUpdateModal
    booking={selectedBooking}
    onClose={() => setShowStatusModal(false)}
    onUpdate={handleStatusUpdate}
  />
)}

{showDeleteModal && (
  <DeleteBookingModal
    booking={selectedBooking}
    onClose={() => setShowDeleteModal(false)}
    onDelete={handleDelete}
  />
)}
      </main>
  </div>
 
</>
    )
}
export default AdminDashboard;