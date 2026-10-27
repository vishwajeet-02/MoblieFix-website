

import { Link } from "react-router-dom";
import Whychoose from "./WhyChoose";
import Services from "./Services";
import Repairprocess from "./Repairprocess";
import Statcounter from "./Statcounter";
import Testimonial from "./Testimonials";
import CallToAction from "./CTA";
import Footer2 from "./Footer2";

const Home =()=>{
    return(
        <>
        <section className="relative min-h-screen overflow-hidden">
<video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover">
    <source src="/videos/mobile-repair.mp4"  type="video/mp4"/>
</video>
<div className="absolute inset-0 bg-black/70"></div>
<div className="relative z-10 flex items-center min-h-screen px-8 lg:px-20">
    <div className="max-w-3xl">
        <span className="bg-blue-600 text-white px-4 py-2 rounded-full">#1 Mobile Repair  Service</span>
        <h1 className="text-5xl lg:text-7xl font-bold text-white mt-6"> Fast & Reliable</h1>
        <p className="text-gray-300 text-lg mt-6">
          Professional  Mobile repair services with doorstep supoort and genuine parts.
        </p>
        <div className="flex gap-4 mt-20">
             {/* <button className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 rounded-xl text-white font-semibold">
                 Book Repair 
                  </button>
                  <button className="border border-white px-8 py-4 rounded-xl text-white">
                    Track Repair
                  </button> */}
                   <Link to="/bookrepair" className="bg-white text-blue-700 px-10 
        py-4 rounded-2xl font-bold shadow-2xl hover:scale-105 duration-300">Book Repair Now</Link>
        <Link to="/TrackRpair" className="bg-white text-blue-700 px-10 
        py-4 rounded-2xl font-bold shadow-2xl hover:scale-105 duration-300">Track Your Device</Link>
        
        </div>
    </div>
</div>
 </section>
 
 <Whychoose/>

<Services/>
<Repairprocess/>
<Statcounter/>
<Testimonial/>
<CallToAction/>
<Footer2/>
        
    </>
    )
}
export default Home;