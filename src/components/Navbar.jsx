import { useState } from "react";
import {   FaSearch, FaSignOutAlt, FaTools, FaUser, } from "react-icons/fa";
import {  FaUserShield,  } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminDashboard from "../AdminDashboard/adminDashboard";
import { FaBars, FaTimes } from "react-icons/fa";
const Navbar=()=>{
  const [menuOpen, setMenuOpen] = useState(false);
 const [showAuth, setShowAuth]= useState(false)
    const [isSignup, setIsSignUp]= useState(true)
    const [isAdminLoggedin, setIsAdminLoggedIn]= useState(false)
    const [admin,setAdmin] =useState({
  name: "",
  email: "",
  password: "",
    } )
      return (
         <>

<nav className="bg-blue-600 text-white w-full">

<div className="w-full px-4 md:px-8 py-3 flex flex-wrap items-center justify-between">


{/* LOGO */}

<div className="flex items-center gap-3">

<img 
src="/logo3.jpg"
alt="logo"
className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
/>


<div>

<h1 className="text-lg md:text-2xl font-bold">
Mobile<span className="text-green-400">Fix</span>
</h1>

<p className="hidden sm:block text-xs">
Mobile Repair at Your Doorstep
</p>

</div>

</div>




{/* SEARCH */}

<div className="
order-3 
w-full 
mt-4
md:order-none
md:mt-0
md:w-[400px]
">


<div className="bg-white rounded-full flex items-center px-4 py-2">

<FaSearch className="text-gray-500"/>


<input
type="text"
placeholder="Search repair services..."
className="
ml-3
w-full
outline-none
text-black
"
/>


</div>


</div>





{/* DESKTOP MENU */}

<div className="hidden md:flex items-center gap-6">


<Link to="/Home">
About
</Link>


<Link to="/mybookings">
MyBookings
</Link>


<Link to="/bookrepair">
BookRepair
</Link>


<Link 
to="/register"
className="
bg-white
text-blue-600
px-5
py-2
rounded-full
"
>
Sign Up
</Link>


<Link
to="/login"
className="
bg-white
text-blue-600
px-5
py-2
rounded-full
"
>
Login
</Link>


<button
onClick={()=>setShowAuth(true)}
className="
group
relative
w-12
h-12
flex
items-center
justify-center
rounded-full
bg-white/10
backdrop-blur-xl
border
border-white/30
shadow-lg
hover:bg-white/20
hover:border-cyan-300
hover:shadow-cyan-400/50
hover:scale-110
transition-all
duration-300
"
>

<FaUserShield
className="
text-2xl
text-white
group-hover:text-cyan-300
group-hover:scale-125
transition-all
duration-300
"
/>

<span
className="
absolute
inset-0
rounded-full
border
border-white/20
opacity-0
group-hover:opacity-100
group-hover:scale-125
transition-all
duration-500
"
/>

</button>


</div>





{/* MOBILE BUTTON */}

<button

className="md:hidden text-2xl"

onClick={()=>setMenuOpen(!menuOpen)}

>

{
menuOpen ? <FaTimes/> : <FaBars/>
}


</button>



</div>





{/* MOBILE MENU */}


{
menuOpen &&

(

<div className="md:hidden bg-blue-700 mx-4 mb-4 p-5 rounded-xl flex flex-col gap-4">
<button
onClick={()=>setShowAuth(true)}
className="
group
relative
w-full
h-12
flex
items-center
justify-center
gap-3
rounded-xl
bg-white/10
backdrop-blur-xl
border
border-white/30
text-white
shadow-lg
hover:bg-white/20
hover:border-cyan-300
hover:shadow-cyan-400/50
hover:scale-[1.03]
transition-all
duration-300
overflow-hidden
"
>

<span
className="
absolute
inset-0
bg-white/10
opacity-0
group-hover:opacity-100
transition
duration-300
"
/>

<FaUserShield
className="
relative
z-10
text-2xl
text-white
group-hover:text-cyan-300
group-hover:scale-125
transition-all
duration-300
"
/>

<span className="relative z-10 font-semibold">
Admin
</span>

</button>   
  

<Link to="/Home">
About
</Link>


<Link to="/mybookings">
MyBookings
</Link>


<Link to="/bookrepair">
BookRepair
</Link>


<Link
to="/register"
className="bg-white text-blue-600 p-2 rounded-full text-center"
>
Sign Up
</Link>


<Link
to="/login"
className="bg-white text-blue-600 p-2 rounded-full text-center"
>
Login
</Link>


</div>

)

}



</nav>

{/* <nav className="bg-blue-600 text-white w-full px-4 md:px-8 py-3 flex flex-wrap items-center gap-4"> 
   <div className="w-full flex flex-wrap items-center justify-between gap-3">
    <div className="flex items-center gap-3 ">
    <img src="/logo3.jpg" 
    alt=" Logo"
  
    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"/>
    <div className="flex flex-col">
    <h1 className="text-white text-base md:text-2xl font-bold"> Mobile<span className="text-green-500">Fix</span> </h1>
    <p className="text-gray-200 text-xs mt-1 hidden sm:block">Mobile Repair at Your Doorstep</p>
    </div>
    </div>

    <div className="order-3 w-full md:order-none md:w-[450px]">
  <div className="flex items-center bg-white rounded-full px-4 py-2">
        <FaSearch className="text-gray-500"/>
        <input type="text" placeholder="Search repair services.."
        className="ml-3 w-full outline-none text-black placeholder-gray-500 bg-transparent" />
        </div>
         </div>
   
  
    <div className="hidden lg:flex items-center gap-6">
    <Link to="/Home" className="text-white font-medium hover:text-gray-200">About</Link>
    <Link to="/mybookings" className="text-white font-medium hover:text-gray-200">MyBookings</Link>
    <Link to="/bookrepair"className="text-white font-medium hover:text-gray-200">BookRepair</Link>
     <Link to="/register" className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold hover:bg-gray-300">Sign-Up</Link>
      <Link to="/login" className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold hover:bg-gray-300">Login</Link>
      <button onClick={()=>setShowAuth(true)} className="p-3 rounded-full bg-white/10 backdrop-blur-md border
       border-white/20 hover:scale-110 transition"><FaUserShield className="text-2xl text-white"/></button>

    </div>
         <button
  className="lg:hidden text-2xl"
  onClick={() => setMenuOpen(!menuOpen)}
>
  {menuOpen ? <FaTimes /> : <FaBars />}
</button>
</div>
{menuOpen && (
  <div className="md:hidden mt-4 bg-blue-700 p-5 flex flex-col gap-4 rounded-xl">
    <Link to="/Home">About</Link>

    <Link to="/mybookings">
      MyBookings
    </Link>

    <Link to="/bookrepair">
      BookRepair
    </Link>

    <Link
      to="/register"
      className="bg-white text-blue-600 p-2 rounded-full text-center"
    >
      Sign Up
    </Link>

    <Link
      to="/login"
      className="bg-white text-blue-600 p-2 rounded-full text-center"
    >
      Login
    </Link>

    
  </div>
)}
</nav>  */}


{showAuth && (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
        
         <div className="absolute right-0 top-0 h-screen w-full sm:w-[430px] bg-slate-950/95 backdrop-blur-xl border
          border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 overflow-y-auto">
            <button onClick={()=> setShowAuth(false)} className="absolute top-5 right-5 text-gray-400 hover:text-white text-xl">X</button>
            <div className="mt-8 mb-10">
            <h2 className="text-4xl font-bold text-white ">{isSignup ?"Admin Signup": "Admin Login"}</h2>
            <p className="text-slate-400 mt-2">Access MobileFix Admin Dashboard</p>
            </div>
            <div className="space-y-5">
            {isSignup && (
                <input type="text" placeholder="Full Name" value={admin.name} onChange={(e)=>setAdmin({...admin,name:e.target.value})} 
                    className="w-full p-4 mb-4 rounded-2xl bg-slate-800 border border-slate-700 text-white outline-none"/>
            )}
             <input type="email" placeholder="Email" value={admin.email} onChange={(e)=>setAdmin({...admin,email:e.target.value})} 
                className="w-full p-4 mb-4 rounded-2xl bg-slate-800 border border-slate-700 text-white outline-none"/>
                 <input type="password" placeholder="Password" value={admin.password} onChange={(e)=>setAdmin({...admin,password:e.target.value})} 
                className="w-full p-4 mb-4 rounded-2xl bg-slate-800 border border-slate-700 text-white outline-none"/>
            <button onClick={()=>{
            if (isSignup) {
  if (!admin.name || !admin.email || !admin.password) {
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem("admin", JSON.stringify(admin));
  alert("Admin registered successfully");
  setIsSignUp(false);
}
else {
  if (!admin.email || !admin.password) {
    alert("Please enter email and password");
    return;
  }

  const savedAdmin = JSON.parse(localStorage.getItem("admin"));

  if (
    savedAdmin?.email === admin.email &&
    savedAdmin?.password === admin.password
  ) {
    setIsAdminLoggedIn(true);
    localStorage.setItem('isAdminLoggedIn',"true")
    setShowAuth(false);
    window.location.href="/AdminDashboard";
  } else {
    alert("Invalid Credentials");
  }
}
} 
            }
             className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-700 to-blue-700
             text-white hover:scale-105 transition">{isSignup ?"Create Account":"Login"}</button>
            <p className="text-center text-slate-400 ">
                {isSignup ?"Already have an account?":"New Admin"}
                <button onClick={()=>setIsSignUp(!isSignup)}className="ml-2 text-cyan-400">
                    {isSignup ? "Login":"Sign Up"}
                </button>
            </p>
            </div>
        </div>
    </div>
)}
{isAdminLoggedin &&(

<AdminDashboard/>

)}

</>
    );

}
export default Navbar;