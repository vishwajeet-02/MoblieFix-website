import axios from "axios";
import { useContext } from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EditContext } from "../contextapi/Editcontext";
const MyBookings=()=>{
    const {setEditData} = useContext(EditContext);
    const navigate=useNavigate();
    const handleEdit =(item)=>{
        setEditData(item)
        console.log("Data Set",item);
          navigate('/bookrepair')
        
    }
   const[booking,setBookings] =useState([]);
  

   const fetchBookings= async()=>{
    try{ 
        const res = await axios.get(
            "http://localhost:3000/userdata"
        );
        setBookings(res.data);
    }
    catch(error){
        console.log(error
        );
        
    }
    
   }
   useEffect(()=>{
    fetchBookings();
   },[])
     const cancelBooking= async(id) =>{

try{
    await axios.delete(`http://localhost:3000/userdata/${id}`);
    toast.success("Booking Cancelled Successfully");
    fetchBookings();
} catch (error){
    console.log(error);
  
    
}

     }  
    
    return(
        <div className="min-h-screen bg-slate-100 py-10 px-5">
            <h1 className="text-4xl font-bold text-center text-blue-900 mb-10">
                My Bookings
            </h1>
            {booking.length === 0 ?(
<div className="text-center text-gray-500 text-xl">
    No Booking Found</div>


            ):( 
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {booking.map((item)=>(
<div key={item.id}

className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl duration-300">
    {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
    <div className="flex justify-between items-center mb-4">
<h2 className="text-xl font-bold">{item.name}</h2>
<span  className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">Pending</span>


    </div>
    <p className="mb-2">Mobile Brand:{item.brand}</p>
    <p className="mb-2">Mobile Model: {item.model}</p>
     <p className="mb-2">Service:{item.service}</p>
     <p className="mb-2">address:{item.address}</p>
      <p className="mb-4">Booking ID:{item.id}</p>
      <div className="flex gap-3">
<button className="bg-blue-900 text-white pxx-4 py-2 rounded-lg w-full">
    Track Repair
</button>
<button onClick={()=>
    cancelBooking(item.id)
} className="bg-red-500 text-white px-4 py-2 rounded-lg w-full">Cancel</button>
<button onClick={()=>
    handleEdit(item) } className="bg-red-500 text-white px-4 py-2 rounded-lg w-full">Edit</button>

      </div>
      </div>

     ))}





</div>
            )}
            
            
             </div>

    );
}
export default MyBookings;