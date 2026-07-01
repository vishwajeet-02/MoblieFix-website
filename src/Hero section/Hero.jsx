import { FaMapMarkerAlt } from "react-icons/fa";

const Hero=()=>{
    return(
        <>
        {/* <section className="flex flex-col md:flex-row items-center justify-between px-15 py-20"> */}
        <section className="w-full flex flex-col md:flex-row items-center justify-between px-5 md:px-12 py-10 md:py-20 gap-10 overflow-hidden">
            <div className= "md:w-1/2">
        <h1 className="text-black text-4xl font-bold leading-none">
            Welcome to: <br/> Mobile Repair at Your <span className="text-blue-500">Doorstep</span></h1>
        <h2 className="mt-4 text-lg">Professional repair for all smartphone brands.
           <br/> Fast reallable and hassle-free home services</h2>
           <button className="mt-6 border border-blue-500 text-blue-500
            px-5 py-2 rounded-full hover:bg-blue-500 hover:text-white "><FaMapMarkerAlt/>Track Repair</button>
            {/* <div className="mt-6 flex items-center gap-4"> */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex gap-2 justify-center">
                    <img src="w1.jpg" alt="images" className="w-12 h-12 rounded-full border-2 border-white" />
                     <img src="w2.jpg" alt="images" className="w-12 h-12 rounded-full border-2 border-white" />
                      <img src="w3.jpg" alt="images" className="w-12 h-12 rounded-full border-2 border-white" />
                       <img src="w4.jpg" alt="images" className="w-12 h-12 rounded-full border-2 border-white" />
                        </div>
                       <div>
{/* <h3 className="font-semibold text-lg"> */}
<h3 className="font-semibold text-base sm:text-lg text-center sm:text-left">
    Trusted by 10,000+ Customers
</h3> 
{/* <p className="flex items-center gap-2 text-yellow-500"> */}
<p className="flex flex-col sm:flex-row items-center gap-2 text-yellow-500">
    ***** <samp className="text-gray-700font-medium">4.8(1200+ Reviews)</samp>
</p>



                      
                </div>
            </div>
           </div>
            {/* <div className="md:w-1/2 flex justify-end">
        <img src="/hero.png" alt="hero" className="w-[500px] max-w-full"/>
        </div> 
         */}
         <div className="w-full md:w-1/2 flex justify-center md:justify-end">

    <img 
      src="/hero.png" 
      alt="hero" 
      className="w-full max-w-[500px]"
    />

</div>
        </section>
        </>
        
    )
}
export default Hero;