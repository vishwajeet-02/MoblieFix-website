import { FaClipboardCheck, FaRegCheckCircle, FaShippingFast, FaTools } from "react-icons/fa"
import { FaTruckPickup } from "react-icons/fa6"

const Repairprocess=()=>{
let step=[
{
            icon:<FaClipboardCheck/>,
            title:"Book Repair",
            desc:"Submit your repair request.",
     },
     {
                 icon:<FaTruckPickup/>,
                 title:"Pickup Divice",
                 desc:"Technician collect devices.",
          },
          {
                      icon:<FaTools/>,
                      title:"Repair Process",
                      desc:"Professional diagnosis & repair.",
               },
               {
                           icon:<FaRegCheckCircle/>,
                           title:"Quality Check",
                           desc:"Testing before delivery.",
                    },
                    {
                                icon:<FaShippingFast/>,
                                title:"Delivery",
                                desc:"Divice deliverd safly.",
                         },



];
    return(
        <section className="bg-slate-950 py-24 px-6">

  
        <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-white mb-4">
                Repair Process
            </h2>
            <p className="text-center text-gray-400 mb-16">
                Simple, Fast & Transparent.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
{step.map((item,index)=>(
    <div key={index} className="relative text-center"> 
    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-cyan-500
flex items-center text-4xl text-white shadow-2xl">
        
            {item.icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-6">{item.title}</h3>
        <p className="text-cyan-400 mt-3"> 
            {item.desc}
        
        </p>
       {/* {index !== step.length -1 &&(
        <div className="hidden md:block absolute top-12 left-[65%] w-full h-1 bg-cyan-500">
            <div/>
)} */}
     </div>
       ))}


            </div>
        </div>
    </section>

    )
}
export default Repairprocess;