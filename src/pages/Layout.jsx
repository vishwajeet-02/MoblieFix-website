
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom";
import Hero from "../Hero section/Hero";
import Cards from "../cardsection/Cards"
import Card1 from "../cardsection/Cards1";
import Footer from "../footer section/Footer";

const Layout=()=>{
    return(
         <>
        
       <Navbar/>
       <Hero/>
       <Cards/>
       <Card1/>
       <Footer/>
       
        
        </>
    );
};
export default Layout;