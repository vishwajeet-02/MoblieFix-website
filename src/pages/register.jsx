
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Register=()=>{
    let [signdata,setSigndata] = useState({});
    let navigate= useNavigate();
    function store(event){
        let {name,value}= event.target;
        setSigndata({...signdata,[name]: value,})
    }
    function submit(e){
        e.preventDefault()
        console.log(signdata);
        localStorage.setItem("signkey",JSON.stringify(signdata))
        toast.success("Registration Successful!")
        navigate("/login");

    }
    return(
    <>
    <div className="relative  min-h-screen overflow-hidden bg-cover bg-center" style={{background:"url('/mobile.png')"}  }>
        {/* <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" >
        <source src="/videos/mobile-repair.mp4" type="video/mp4"/>
</video> */}

<div className="absolute inset-0 bg-black/70"/><div/>
<div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
<div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
<div className="relative z-10 min-h-screen flex items-center justify-end px-4">

<div className="w-full max-w-md p-8 rounded-3xl border border-white/20 bg-white/10
  backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] animate-[flout_ease-in-out_infinite]">
    <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Creat Account</h1>
        <p className="text-gray-300 mt-2">Join MobileFix Today</p>
    </div>
    <form onSubmit={submit} className="space-y-5">
        <input type="text" name="name" placeholder="Full Name" value={signdata.name} onChange={store}
className="w-full p-4 rounded-xl bg-white/10 border-white/20 text-white
placeholder-gray-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"/>

<input type="email" name="email" placeholder="Email Address" value={signdata.email} onChange={store}
className="w-full p-4 rounded-xl bg-white/10 border-white/20 text-white
placeholder-gray-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"/>

<input type="password" name="password" placeholder="Password" value={signdata.password} onChange={store}
className="w-full p-4 rounded-xl bg-white/10 border-white/20 text-white
placeholder-gray-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"/>
<button type="submit" className="w-full py-4 rounded-xl font-bold bg-yellow-400 text-black hover:bg-yellow-300
 hover:scale-105 transition-all duration-300">Sign Up</button>


    </form>
    <p className="text-center text-gray-300 mt-6">Already have an account?
    <span className="text-yellow-400 cursor-pointer ml-1">Login</span>
  </p>
  </div>

</div>
 </div>
   

    </>
    )
}
export default Register;