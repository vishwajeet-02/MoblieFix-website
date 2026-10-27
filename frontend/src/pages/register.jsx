
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/register";

const Register = () => {
  const navigate = useNavigate();

  const [signdata, setSigndata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function store(event) {
    const { name, value } = event.target;

    setSigndata({
      ...signdata,
      [name]: value,
    });
  }

  async function submit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(API_URL, {
        name: signdata.name.trim(),
        email: signdata.email.trim(),
        password: signdata.password,
      });

      toast.success(
        response.data.message || "Registration successful!"
      );

      setSigndata({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/mobile.png')" }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl animate-pulse"></div>

      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl animate-pulse"></div>

      <div className="relative z-10 flex min-h-screen items-center justify-end px-4 py-10 md:px-20">
        <div
          className="w-full max-w-md rounded-3xl border border-white/20
          bg-white/10 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35)]
          backdrop-blur-xl"
        >
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white">
              Create Account
            </h1>

            <p className="mt-2 text-gray-300">
              Join MobileFix Today
            </p>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={signdata.name}
              onChange={store}
              required
              maxLength={100}
              autoComplete="name"
              className="w-full rounded-xl border border-white/20
              bg-white/10 p-4 text-white placeholder-gray-300
              focus:border-yellow-400 focus:outline-none
              focus:ring-2 focus:ring-yellow-400/50"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={signdata.email}
              onChange={store}
              required
              maxLength={150}
              autoComplete="email"
              className="w-full rounded-xl border border-white/20
              bg-white/10 p-4 text-white placeholder-gray-300
              focus:border-yellow-400 focus:outline-none
              focus:ring-2 focus:ring-yellow-400/50"
            />

            <input
              type="password"
              name="password"
              placeholder="Password (minimum 8 characters)"
              value={signdata.password}
              onChange={store}
              required
              minLength={8}
              autoComplete="new-password"
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
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-300">
            Already have an account?

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="ml-2 cursor-pointer text-yellow-400 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
