
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/register";
import Login from "./pages/login";
import Layout from "./pages/Layout";
import Home from "./Home/Home";
import BookRepair from "./pages/BookRepair";
import MyBookings from "./pages/MyBookings";

import AdminDashboard from "./AdminDashboard/adminDashboard";
import AnalyticsDashboard from "./AdminDashboard/AnalyticsDashboard";
import AdminLayout from "./AdminDashboard/AdminLayout";

import Customers from "./AdminDashboard/Customers";
import Technicians from "./AdminDashboard/Technicians";
import Settings from "./AdminDashboard/Settings";

import { ToastContainer } from "react-toastify";
import { EditProvider } from "./contextapi/Editcontext";

import ProtectedRoute from "./components/ProtectedRoute";
import Bookings from "./AdminDashboard/Bookings";
import RepairTracking from "./pages/RepairTracking";

const App = () => {
  return (
    <EditProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/bookrepair" element={<BookRepair />} />

          {/* Logged-in User Routes */}
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/mybookings" element={<MyBookings />} />
            <Route
  path="/mybookings/:id/track"
  element={<RepairTracking />}
/>
          </Route>

          {/* Admin-only Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route element={<AdminLayout />}>
              <Route
                path="/AdminDashboard"
                element={<AdminDashboard />}
              />

              <Route
                path="/analytics"
                element={<AnalyticsDashboard />}
              />

              <Route
                path="/AdminDashboard/customers"
                element={<Customers />}
              />

              <Route
                path="/AdminDashboard/technicians"
                element={<Technicians />}
              />

              <Route
                path="/AdminDashboard/settings"
                element={<Settings />}
              />
              <Route
  path="/AdminDashboard/bookings"
  element={<Bookings />}
/>

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </EditProvider>
  );
};

export default App;
