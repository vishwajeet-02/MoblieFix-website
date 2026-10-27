
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EditContext } from "../contextapi/Editcontext";

const API_URL = "http://localhost:5000/api/bookings";

const BookRepair = () => {
  const { editData } = useContext(EditContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    brand: "",
    model: "",
    service: "",
    address: "",
  });

  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        brand: editData.brand || "",
        model: editData.model || "",
        service: editData.service || "",
        address: editData.address || "",
      });

      setEdit(editData.id);
    }
  }, [editData]);

  const Bookingdata = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      !form.brand.trim() ||
      !form.model.trim() ||
      !form.service.trim() ||
      !form.address.trim()
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      // Get JWT token saved during login
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first!");
        navigate("/login");
        return;
      }

      // Authentication header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (edit) {
        // Update existing booking
        await axios.put(`${API_URL}/${edit}`, form, config);

        toast.success("Booking updated successfully!");
        setEdit(null);
      } else {
        // Create new booking for logged-in customer
        await axios.post(API_URL, form, config);

        toast.success("Booking submitted successfully!");
      }

      // Reset form after successful request
      setForm({
        brand: "",
        model: "",
        service: "",
        address: "",
      });

      navigate("/MyBookings");
    } catch (error) {
      console.error(
        "Booking error:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else if (error.response?.status === 403) {
        toast.error("You are not allowed to perform this action.");
      } else {
        toast.error(
          error.response?.data?.message || "Booking failed!"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-start px-10
      bg-cover bg-center"
      style={{ backgroundImage: "url('/mobile.png')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="max-w-xl relative z-10 w-full">
        <div
          className="backdrop-blur-xl bg-white/10
          border border-white/20 rounded-3xl mb-2"
        >
          <h1 className="text-4xl text-white font-bold mb-2 p-2">
            Book Repair
          </h1>

          <p className="text-gray-200 mb-8 p-2">
            Fast & Professional Mobile Repair Service
          </p>

          <form onSubmit={submitHandler} className="space-y-5 p-2">
            <input
              type="text"
              name="brand"
              placeholder="Mobile Brand"
              value={form.brand}
              onChange={Bookingdata}
              className="w-full p-4 rounded-xl bg-white/20
              border border-white/20 text-white
              placeholder-gray-300 outline-none
              focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              name="model"
              placeholder="Mobile Model"
              value={form.model}
              onChange={Bookingdata}
              className="w-full p-4 rounded-xl bg-white/20
              border border-white/20 text-white
              placeholder-gray-300 outline-none
              focus:ring-2 focus:ring-blue-400"
            />

            <select
              name="service"
              value={form.service}
              onChange={Bookingdata}
              className="w-full p-4 rounded-xl bg-white/20
              border border-white/20 text-white
              outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" className="text-black">
                Select Service
              </option>

              <option value="Screen Repair" className="text-black">
                Screen Repair
              </option>

              <option value="Battery Replacement" className="text-black">
                Battery Replacement
              </option>

              <option value="Charging Issue" className="text-black">
                Charging Issue
              </option>

              <option value="Speaker Repair" className="text-black">
                Speaker Repair
              </option>

              <option value="Water Damage" className="text-black">
                Water Damage
              </option>

              <option value="Software Issue" className="text-black">
                Software Issue
              </option>
            </select>

            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={Bookingdata}
              className="w-full p-4 rounded-xl bg-white/20
              border border-white/20 text-white
              placeholder-gray-300 outline-none
              focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 rounded-xl font-semibold
              text-white bg-gradient-to-r from-blue-600
              to-cyan-500 hover:scale-105 transition
              duration-300 shadow-lg disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : edit
                ? "Update Booking"
                : "Book Repair Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookRepair;
