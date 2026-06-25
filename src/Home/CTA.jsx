import { Link } from "react-router-dom";

const CallToAction=()=>{
    return(
<section className="py-24 px-6 bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-700">
<div className="max-w-5xl mx-auto text-center">
    <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
        Need Mobile  Repair Today?
    </h2>
    <p className="text-xl text-gray-100 mb-10">Fast, Reliable & Affordable Mobile Repair Services
        with Genuine Parts and Expert Technicians.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-5">
        <Link to="/bookrepair" className="bg-white text-blue-700 px-10 
        py-4 rounded-2xl font-bold shadow-2xl hover:scale-105 duration-300">Book Repair Now</Link>
        <Link to="/TrackRpair" className="bg-white text-blue-700 px-10 
        py-4 rounded-2xl font-bold shadow-2xl hover:scale-105 duration-300">Track Your Device</Link>
    </div>
</div>
</section>
    )
}
export default CallToAction;