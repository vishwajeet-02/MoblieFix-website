import {  useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
const Login=()=>{
const navigate = useNavigate();
const [user, setUser] = useState({email:"", password:"",});
const handleChange =(e)=>{setUser({...user,[e.target.name]: e.target.value,});
}
const submit =(e)=>{
    e.preventDefault();
    console.log(user);
  
    const savedUser =
    JSON.parse(localStorage.getItem("signkey"));
    if(
        savedUser?.email === user.email && 
        savedUser?.password ===user.password 
    )
    {  toast.success("login successfull")
        localStorage.setItem("isLoggedIn","true");
        navigate("/BookRepair");
    }
    else{
        toast.info("Invelid Email or Password");
    }
};
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
        <h1 className="text-3xl font-bold text-white">Wellcome<span className="text-yellow-400">!</span> to sign in:</h1>
        <p className="text-gray-300 mt-2">Join MobileFix Today</p>
    </div>
    <form onSubmit={submit} className="space-y-5">


<input type="email" name="email" placeholder="Email Address" value={user.email} onChange={handleChange}
className="w-full p-4 rounded-xl bg-white/10 border-white/20 text-white
placeholder-gray-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"/>

<input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange}
className="w-full p-4 rounded-xl bg-white/10 border-white/20 text-white
placeholder-gray-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"/>
<button type="submit" className="w-full py-4 rounded-xl font-bold bg-yellow-400 text-black hover:bg-yellow-300
 hover:scale-105 transition-all duration-300">Login</button>


    </form>
    <p className="text-center text-gray-300 mt-6">Already have an account?
    <span className="text-yellow-400 cursor-pointer ml-1">Login Now</span>
  </p>
  </div>

</div>
 </div>
   
        </>
    );
}
export default Login;