import { FaQuoteLeft, FaStar } from "react-icons/fa"

const Testimonial=()=>{
const reviews=[
    { 
     name:"Harmanpreet kaur",
     city:"Punjab",
     Image:"f1.jpg" ,
     review:"Excellent services. My phone screen repaired within a few hours."  

},
 { 
     name:"Neeru Bajba",
     city:"Indore",
     Image:"f2.jpg" ,
     review:"Very professional technicians and affordable pricing."  

},
 { 
     name:"Neha Sharma",
     city:"Dehli",
     Image:"f3.jpg" ,
     review:"Best mobile repair services. Highly recommended."  

},
]
    return(
<section className="bg-slate-950 py-24 px-6">
    <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center text-white mb-4">
What Our Customers Say</h2>
<p className="text-center text-gray-400 mb-16">
    Trusted by thasound of customers.
</p>
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {reviews.map((item, index)=>(
       <div key={index} className="backdrop-blur-xl bg-white/10 rounded-3xl border
        border-white/10 p-8 shadow-2xl hover:scale-105 duration-300">
            <FaQuoteLeft className="text-cyan-400 text-4xl mb-5"/>
<p className="text-gray-300">{item.review}</p>
<div className="flex bm-4">{[...Array(5).map((_, i)=>(
   <FaStar key={i}  className="text-yellow-400"/>
))]}</div>
<div className="flex items-center gap-4"> 
<img 
src={item.Image} alt="" className="w-14 h-14 rounded-full border-2 border-cyan-400"/>
<h4 className="text-white font-bold">{item.name}</h4>
<p className="test-gray-400">{item.city}</p>
</div>
       </div> 
    )
    
    
    
    )}


</div>
    </div>





</section>
    )
}
export default Testimonial;