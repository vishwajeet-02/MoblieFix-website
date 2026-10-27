import { FaMobileAlt, FaTools, FaUser } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

const Statcounter =()=>{
    const stat=[
        {
        icon:<FaUser/>,
        title:"10K+",
        desc:"Happy Customer.",
 },
  {
        icon:<FaMobileAlt/>,
        title:"15K+",
        desc:"Devices Repaired.",
 },
   {
        icon:<FaTools/>,
        title:"50+",
        desc:"Expert Technicians.",
 },

   {
        icon:<FaStar/>,
        title:"4.5*",
        desc:"Customer Rating.",
 },
];
return(
    <section className="bg-slate-900 py-24 px-6">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-white mb-4">
                Our Achievements
            </h2>
           
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
{stat.map((item,index)=>(
    <div key={index} className="bg=slate-800 border border-slate-700
     rounded-3xl p-8 text-center hover:scale-105  duration-300 shadow-2xl">
        <div className="text-5xl text-cyan-400 mb-5 flex justify-center">
            {item.icon}
        </div>
        <h3 className="text-5xl font-bold text-white mb-3">{item.title}</h3>
        <p className="text-gray-400"> 
            {item.desc}
        
        </p>
     </div>


))


}
            </div>
        </div>
    </section>


)



}
export default Statcounter;