

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login"; 
import Layout from "./pages/Layout";
import  Home from "./Home/Home"
import BookRepair from "./pages/BookRepair";
import MyBookings from "./pages/MyBookings";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./AdminDashboard/adminDashboard";
import AnalyticsDashboard from "./AdminDashboard/AnalyticsDashboard";


const App=()=>{
    return(
    <>
  
        <BrowserRouter>
        <Routes>
     <Route path="/" element={<Layout/>}/>       
<Route path="/register" element={<Register/>}/>

<Route path="/login" element={<Login/>}/>
<Route path="/Home" element={<Home/>} />
<Route path="/bookrepair" element={<BookRepair/>}/>
<Route path="/mybookings" element={<MyBookings/>}/>
<Route path="/AdminDashboard" element={<AdminDashboard/>}/>
<Route path="/analytics" element={<AnalyticsDashboard/>} />

        </Routes>

         </BrowserRouter>
<ToastContainer/>
         </>
        );
}
export default App; 