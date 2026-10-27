import { FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";

    const Footer2=()=>{
    return(
        <>
        <footer className="bg-slate-950 border-t border-slate-800">
<div className="max-w-7xl mx-auto px-6 py-16">
   
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">


    
<div> 

    <h2 className="text-3xl font-bold text-cyan-400">
    Mobile<span className="text-green-500">Fix</span>
    </h2>
    <p className="mt-4 text-gray-400">
      Fast, reliable, and affordable mobile repair services at your doorstep.  
    </p>
    </div>
    <div>
        <h3 className="text-xl font-semibold mb-4 text-white">
            Quick Links
        </h3>
        <ul className="space-y-3 text-gray-400">
<li >Home</li>
<li >Services</li>
<li >Track Repair</li>
<li >Contact Us</li>
        </ul>
    </div>
    <div>
        <h3 className="text-xl text-white font-semibold mb-4">
            Services
            </h3>
            <ul className="space-y-2 text-gray-300">
                <li>Screen Repair</li>
                <li>Battery Replacement</li>
                <li>Water Damage</li>
                <li>Software Issues</li>
            </ul>
    </div>
    <div> <h3 className="text-xl text-white font-semibold mb-4">
         Contact Us</h3>
         <div className="space-y-3 text-gray-400">
            <p className=" flex items-center gap-3">
               <FaPhoneAlt/>
               9754727732 
            </p>
            <p className="flex items-center gap-2">
                  <FaEnvelope/>
                  support@mobilefix.com
            </p>
            <p className="flex items-center gap-2">
                 <FaMapMarkerAlt/>
                 Bhopal,India
            </p>
         </div>

    </div>
    <div>
        <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
    </div>
   
<div className="flex gap-4">

<div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400
hover:bg-cyan-500 hover:text-white duration-300 cursor-pointer"><FaFacebook/></div>
<div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400
hover:bg-cyan-500 hover:text-white duration-300 cursor-pointer"><FaInstagram/></div>
<div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400
hover:bg-cyan-500 hover:text-white duration-300 cursor-pointer"><FaTwitter/></div>
<div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400
hover:bg-cyan-500 hover:text-white duration-300 cursor-pointer"><FaLinkedin/></div>
</div>
</div>
</div>

<div className="border-t border-slate-800 mt-12 pt-6 text-center text-gray-500">

    @ 2026 MobileFix. All Rights Reserved.
</div>
<div/>
 </footer>
        </>
    )
    }
export default Footer2;