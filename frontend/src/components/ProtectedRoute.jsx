
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  // Login required
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check user role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/Home" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
