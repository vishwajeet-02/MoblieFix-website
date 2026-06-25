
import { FaBatteryHalf, FaChargingStation, FaMicrochip, FaMobileAlt, FaTint, FaVolumeUp } from "react-icons/fa";

const Services=()=>{
    const service=[   {
            icon:<FaMobileAlt/>,
            title:"Screen Repair",
            desc:"Cracked scren replacement with genuine parts.",
     },
       {
            icon:<FaBatteryHalf/>,
            title:"Battery Replacement",
            desc:"Long lasting battery replacement service.",
     },
       {
            icon:<FaTint/>,
            title:"Water Damage",
            desc:"Advanced recovery for water damage devices.",
     },
       {
            icon:<FaMicrochip/>,
            title:"Software Issues",
            desc:"Fix lagging, boot loops and software errors.",
     },
       {
            icon:<FaChargingStation/>,
            title:"Charging Port",
            desc:"Repair charging and connectivity problems.",
     },
       {
            icon:<FaVolumeUp/>,
            title:"Speaker repair",
            desc:"Audio and speaker trobuleshooting solution.",
     },]
    return(
        <section className="bg-slate-900 py-24 px-6">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-white mb-4">
                Our Services
            </h2>
            <p className="text-center text-gray-400 mb-16">
                Professional mobile repair solutions.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
{service.map((item,index)=>(
    <div key={index} className="bg-slate-800 p-8 rounded-3xl border border-slate-700 
    hover:border-cyan-400 hover:translate-y-2 duration-300 shadow-2xl">
        <div className="text-5xl text-cyan-400 mb-6 ">
            {item.icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
        <p className="text-cyan-400 mb-6"> 
            {item.desc}
        
        </p>
        <button 
        className=" bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 rounded-xl text-white font-semibold">
            Learn More
        </button>
     </div>


))


}
            </div>
        </div>
    </section>


    )
}
export default Services;