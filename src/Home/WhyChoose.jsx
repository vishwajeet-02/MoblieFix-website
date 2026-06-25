import { FaTools, FaTruck } from "react-icons/fa";
import { FaBold, FaShield } from "react-icons/fa6";

const Whychoose =()=>{
    const data=[
        {
        icon:<FaBold/>,
        title:"Fast Repair",
        desc:"same day repair service for most devices.",
 },
  {
        icon:<FaShield/>,
        title:"90 Days Warranty",
        desc:"Warranty on every repair service.",
 },
   {
        icon:<FaTools/>,
        title:"Genuine Part",
        desc:"Only original quality spare parts used .",
 },

   {
        icon:<FaTruck/>,
        title:"Doorstep Service",
        desc:"Pickup and delivery available.",
 },
];
return(
    <section className="bg-slate-950 py-24 px-6">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-white mb-4">
                Why Choose MobileFix
            </h2>
            <p className="text-center text-gray-400 mb-16">
                Professional repair solutions with trusted service.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
{data.map((item,index)=>(
    <div key={index} className="backdrop-blur-xl bg-white/10 boder border-white/10
     rounded-3xl p-8 text-center hover:scale-105 hover:border-cyan-400 transition-all duration-300 shadow-2xl">
        <div className="text-5xl text-cyan-400 mb-6 flex justify-center">
            {item.icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
        <p className="text-cyan-400"> 
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
export default Whychoose;