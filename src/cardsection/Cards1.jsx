
  import { FaTools,
     FaUserCog,
       FaTruck,
       
    } from "react-icons/fa";
    import{MdEngineering} from "react-icons/md"
    import { FaSmile } from "react-icons/fa";
    import { BsEmojiSmileFill } from "react-icons/bs";
    import { FaCheckCircle } from "react-icons/fa";
    import { FaQuoteLeft,FaStar } from "react-icons/fa";
     const services =[{
        icon:<FaTools/>,
        title:"Book Repair",
        desc:"Select your devices issue,choose time & book your services."
     },
     {
            icon:<FaUserCog/>,
        title:"Technician Assigned",
        desc:"We assign a verified tecnician for your request."
     },
     {
            icon:<MdEngineering/>,
        title:"Home Visit",
        desc:"Technician will reach your location at scheduled time."
     },
     {
            icon:<FaTruck/>,
        title:" Repair Completed",
        desc:"Your device is repaired & you pay only if you are 100% satisfied."
     },
    
    ];
    const reviews=[
        {
        name:"Jennifer Lopez",
        city:"Bhopal",
        Image:"w1.jpg",
        review:"Excellent service! My phone screen was repaired within  an hour.",
    },
{
        name:"Taylor Swfit",
        city:"Mumbai",
        Image:"w4.jpg",
        review:"Very professional technicians. highly recommended.",
    },
{
        name:"Meet Kaur",
        city:"Punjab",
        Image:"w3.jpg",
        review:"Quick pickup and repair service. Great experience. ",
    },

];
     const Card1 =()=>{ 
    return(
   <>
    <section className="py-16 bg-gray-50">
<div className="max-w-7xl mx-auto px-4">
    <h4 className="text-center text-blue-600 font-semibold uppercase">
        HOW IT WORKS
    </h4>
    <h2 className="text-center text-4xl font-bold mt-2">
        Simple Steps, Esay Repair
    </h2>
     <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded"></div>

<div className="flex flex-wrap justify-center gap-8 mt-10">
    {services.map((item, index)=>( 
<div 
key={index}
className="w-64 bg-white rounded-xl shadow-md p-6 text-center
 transition-all duration-300 ease-in-out hover:-translate-y-2 
 hover:shadow-2xl hover:border-blue-500 hover:border">
    <div className="text-5xl text-blue-600 flex justify-center mb-4 
    transition-transform duration-300 hover:scale-110">
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
</div> <br /> <br />
<div className="h-20 max-w-7xl border-2 color-red to-sky-400 mx-auto bg-blue-900 rounded-lg flex justify-around items-center    ">
<div>
<FaSmile className="text-yellow-400 text-3xl"/>
 <h1 className="text-white">10,000+</h1>
<p className="text-gray-300 text-sm">Happy Customers</p> 
</div>
<div >
<FaCheckCircle className="text-yellow-400 text-3xl"/>
 <h1 className="text-white">15,000+</h1>
<p className="text-gray-300 text-sm">Repair Completed</p> 
</div>

<div >
<FaUserCog className="text-yellow-400 text-3xl"/>
 <h1 className="text-white">200+</h1>
<p className="text-gray-300 text-sm">Expert Technicians</p>
</div> 
<div >
<BsEmojiSmileFill className="text-yellow-400 text-3xl"/>
 <h1 className="text-white">100%</h1>
<p className="text-gray-300 text-sm">Satisfection Guarantee</p> 
</div>
</div><br /><br />
<div><h4 className="text-center text-blue-600 font-semibold uppercase">
        WHAT OUR CUSTOMERS SAY
    </h4></div>
    <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded"></div> <br /> <br />
    <div className="py-16 bg-gray-100" >
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
        {reviews.map((item,index)=>(
            <div key={index}
            className="w-80 bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                <FaQuoteLeft className="text-4xl text-blue-600 mb-4"/>
                <p className="text-gray-600 mb-6">{item.review}</p>
                <div className="flex items-center gap-4">
                    <img src={item.Image}
                    alt={item.name}
                    className="w-16 h-16 rounded-full object-cover"/>
                    <div>
                        <div className="flex text-yellow-400 mb-1">
                            <FaStar/>
                            <FaStar/>
                            <FaStar/>
                            <FaStar/>
                            <FaStar/>
                        </div>
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-gray-500 text-sm">{item.city}</p>
                    </div>
                </div>
                </div>

        ))}
        </div>  
        
        
        
        
         </div>









    </section>
   


   </> 
    
    
    
    )
}
export default Card1;