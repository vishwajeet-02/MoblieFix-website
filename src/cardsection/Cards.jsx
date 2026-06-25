
  import { FaMobileAlt,
     FaBatteryFull,
      FaPlug,
     FaVolumeUp,
     FaTint,
     FaCog } from "react-icons/fa";
     const services =[{
        icon:<FaMobileAlt/>,
        title:"Screen Replacement",
        desc:"Cracked or broken screen repair"
     },
     {
            icon:<FaBatteryFull/>,
        title:"Screen Replacement",
        desc:"Cracked or broken screen repair"
     },
     {
            icon:<FaPlug/>,
        title:"Charging Port Repair",
        desc:"Charging Port & connector issues"
     },
     {
            icon:<FaVolumeUp/>,
        title:"Speaker Rpair",
        desc:"Loudsspeaker & earpiece issues"
     },
     {
            icon:<FaTint/>,
        title:"Water Damage",
        desc:"Water damage restoration"
     },
     {
            icon:<FaCog/>,
        title:"Software Issues",
        desc:"Os update & software proplem fix"
     },
    ];
     const Card =()=>{ 
    return(
    
    <section className="py-16 bg-white">
<div className="max-w-7xl mx-auto px-4">
    <h4 className="text-center text-blue-600 font-semibold uppercase">
        Our  Services
    </h4>
    <h2 className="text-center text-4xl font-bold mt-2">
        What We Repair
    </h2>
     <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded"></div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
    {services.map((item, index)=>( 
<div 
key={index}
className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition duration-300">
    <div className="text-5xl text-blue-600 flex justify-center mb-4">
        {item.icon}
    </div>
    <h3 className="font-bold text-lg mb-2">
        {item.title}
    </h3>
    <p className="text-gray-600 text-sm">
{item.desc}

    </p>
    </div>


    ))}
</div>
</div>



    </section>


    
    
    
    
    )
}
export default Card;