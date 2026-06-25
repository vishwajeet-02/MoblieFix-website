import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext,useEffect } from "react";
import { EditContext } from "../contextapi/Editcontext";

const BookRepair=()=>{
    const {editData}= useContext(EditContext)
    console.log("Edit Data:",editData);
    
let [form, setForm]=useState({
    
    brand:'',
    model:"",
    service:"",
    address:"",
    
   })
   useEffect(()=>{
    if(editData){
        setForm(editData);
        SetEdit(editData.id)
    }
   },[editData]);
   const [edit, SetEdit] =useState(null);
   const editBooking=(item)=>{setForm(item);
   SetEdit(item.id)
   }
   

let navigate= useNavigate()
let Bookingdata=(e)=>{
    setForm({...form,[e.target.name]:e.target.value,
 })
        
    
};
let submitHandler=(e)=>{
    e.preventDefault();
    console.log(form);
localStorage.setItem("signkey",JSON.stringify(form))
    if (
    !form.brand.trim()||
    !form.model.trim()||
   !form.service.trim()||
    !form.address.trim()
    
   )
{toast.error("please fill all fields!");
    return;
    }
    if(edit){
        axios.put(`http://localhost:3000/userdata/${edit}`,form)
.then(()=>{
    toast.success("Booking Update");
    fetchBookings();
    SetEdit(null)
});
return;
    }

    axios.post(`http://localhost:3000/userdata/`,form)
    .then((e)=>{ toast.success("Booking Submitted Successful");
    setForm({
    brand:"",
    model:"",
    service:"",
    address:"",
 
    });
    
 navigate("/MyBookings")
  
    
})
    
    
   
.catch((r)=>{toast.error("Booking Failed")

});
  
    
};
    return(
        <div className="min-h-screen flex items-center justify-start px-10 lg:peer-odd:x20 
        bg-cover bg-center " style={{backgroundImage:"url('/mobile.png')"}}>
            <div className="absolute inset-0 bg-black/50"></div>
            
        <div className="max-w-xl relative z-10 w-full">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl mb-2">
            <h1 className="text-4xl text-white font-bold mb-2 p-2">
                Book Repair
            </h1>
            <p className="text-gray-200 mb-8 p-2">Fast & Professional Mobile Repair Service</p>
            <form onSubmit={submitHandler} className="space-y-5">
                <input type="text" 
                name="brand"
                placeholder="Mobile Brand"
                value={form.brand}
                onChange={Bookingdata}
                // className="w-full p-4 rounded-xl bg-white/20 border border-white/20
                //  text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"/>
                //  <input type="text" 
                // name="brand"
                // placeholder="Mobile Brand"
                // value={form.status}
                onChange={Bookingdata}
                className="w-full p-4 rounded-xl bg-white/20 border border-white/20
                 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"/>
                <input type="text" 
                name="model"
                value={form.model}
                placeholder="Mobile Model"
                onChange={Bookingdata}
                className="w-full p-4 rounded-xl bg-white/20 border border-white/20
                 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"/>
                <select name="service" value={form.service} onChange={Bookingdata}
                className="w-full p-4 rounded-xl bg-white/20 border border-white/20
                 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400">
                <option className="text-black">Select Service</option>
                 <option className="text-black">Screen Repair</option>
                 <option className="text-black">Battery Replacement</option>
                  <option className="text-black">Charging Issue </option>
                   <option className="text-black">Speaker Repair</option>
                    <option className="text-black">Water Damage</option>
                     <option className="text-black">Software Issue</option>
                </select>
                <textarea name="address" placeholder="Address" value={form.address}
                onChange={Bookingdata}
                         className="w-full p-4 rounded-xl bg-white/20 border border-white/20
                 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"> </textarea>
                <button type="submit" className=" w-full py-6  rounded-xl font-semibold text-white {'bg-gradient-to-r'}
                 from-blue-600 to-cyan-500 hover:scale-105 transition duration-300 shadow-lg
                 ">{edit? "Update Booking":"Book Repair Now"}

                </button>
                
            </form>
        </div>
        </div>
         </div>
    );
}
export default BookRepair;