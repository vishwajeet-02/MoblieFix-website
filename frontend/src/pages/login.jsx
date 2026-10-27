
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/login";
const BOOKINGS_API_URL = "http://localhost:5000/api/bookings";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      // Step 1: Login request
      const response = await axios.post(API_URL, {
        email: user.email.trim(),
        password: user.password,
      });

      const { token, user: loggedInUser } = response.data;

      if (!token || !loggedInUser) {
        toast.error("Invalid server response. Please try again.");
        return;
      }

      // Step 2: Save login details
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      // Step 3: Admin redirect
      if (loggedInUser.role === "admin") {
        toast.success("Admin login successful!");
        navigate("/AdminDashboard");
        return;
      }

      // Step 4: Customer login
      if (loggedInUser.role === "user") {
        try {
          // Fetch bookings belonging to the logged-in user
          const bookingsResponse = await axios.get(
            BOOKINGS_API_URL,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const bookings = bookingsResponse.data;

          if (!Array.isArray(bookings)) {
            toast.error("Invalid bookings response. Please try again.");
            return;
          }

          // User has existing bookings
          if (bookings.length > 0) {
            toast.success("Login successful! Welcome back.");
            navigate("/mybookings");
          } else {
            // User has no bookings
            toast.success("Login successful!");
            navigate("/BookRepair");
          }
        } catch (bookingError) {
          console.error(
            "Booking fetch error:",
            bookingError.response?.data ||
              bookingError.message
          );

          toast.error(
            "Unable to check your bookings. Please try again."
          );
        }

        return;
      }

      // Step 5: Invalid role
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");

      toast.error("Invalid user role. Please contact support.");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login failed. Please check your email and password.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/mobile.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Background effects */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl animate-pulse"></div>

      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl animate-pulse"></div>

      {/* Login form */}
      <div className="relative z-10 flex min-h-screen items-center justify-end px-4 py-10 md:px-20">
        <div
          className="w-full max-w-md rounded-3xl border border-white/20
          bg-white/10 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35)]
          backdrop-blur-xl"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">
              Welcome
              <span className="text-yellow-400">!</span> Sign In
            </h1>

            <p className="mt-2 text-gray-300">
              Welcome back to MobileFix
            </p>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={user.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="w-full rounded-xl border border-white/20
              bg-white/10 p-4 text-white placeholder-gray-300
              focus:border-yellow-400 focus:outline-none
              focus:ring-2 focus:ring-yellow-400/50"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-white/20
              bg-white/10 p-4 text-white placeholder-gray-300
              focus:border-yellow-400 focus:outline-none
              focus:ring-2 focus:ring-yellow-400/50"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-yellow-400 py-4
              font-bold text-black transition-all duration-300
              hover:scale-105 hover:bg-yellow-300
              disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-300">
            Don't have an account?

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="ml-2 cursor-pointer text-yellow-400 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
