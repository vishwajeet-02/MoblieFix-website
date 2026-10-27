
import { useState } from "react";
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaTools,
  FaInfoCircle,
  FaCalendarAlt,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  let loggedInUser = null;

  try {
    loggedInUser = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    loggedInUser = null;
  }

  const navLinkClass =
    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-cyan-300";

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    closeMenu();
    navigate("/login", { replace: true });
  };

  const handleMyBookings = () => {
    closeMenu();

    if (isLoggedIn) {
      navigate("/mybookings");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/95 text-white shadow-xl backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-8">

        {/* LOGO */}
        <Link
          to="/Home"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-3"
        >
          <img
            src="/logo3.jpg"
            alt="MobileFix Logo"
            className="h-12 w-12 rounded-full border-2 border-cyan-400/70 object-cover md:h-14 md:w-14"
          />

          <div>
            <h1 className="text-xl font-extrabold tracking-wide md:text-2xl">
              Mobile<span className="text-cyan-400">Fix</span>
            </h1>
            <p className="hidden text-xs text-slate-400 sm:block">
              Mobile Repair at Your Doorstep
            </p>
          </div>
        </Link>

        {/* SEARCH BAR */}
        <div className="order-3 w-full md:order-none md:w-64 lg:w-80">
          <div className="flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2.5 transition focus-within:border-cyan-400">
            <FaSearch className="shrink-0 text-slate-400" />
            <input
              type="search"
              placeholder="Search repair services..."
              aria-label="Search repair services"
              className="ml-3 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-1 md:flex">
          <Link to="/Home" className={navLinkClass}>
            <FaInfoCircle />
            About
          </Link>

          <Link to="/bookrepair" className={navLinkClass}>
            <FaTools />
            Book Repair
          </Link>

          {/* MY BOOKINGS - ALWAYS VISIBLE */}
          <button
            type="button"
            onClick={handleMyBookings}
            className={navLinkClass}
          >
            <FaCalendarAlt />
            My Bookings
          </button>

          {/* LOGIN / SIGNUP OR LOGOUT */}
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="ml-2 flex items-center gap-2 rounded-full border border-cyan-400 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
              >
                <FaSignInAlt />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                <FaUserPlus />
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="ml-2 max-w-32 truncate text-sm text-slate-300">
                Hi, {loggedInUser?.name || "User"}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-full bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500 hover:text-white"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-white/10 p-3 text-xl transition hover:bg-white/10 md:hidden"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <div className="mx-4 mb-4 flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-900 p-4 shadow-xl md:hidden">
          <Link
            to="/Home"
            onClick={closeMenu}
            className={navLinkClass}
          >
            <FaInfoCircle />
            About
          </Link>

          <Link
            to="/bookrepair"
            onClick={closeMenu}
            className={navLinkClass}
          >
            <FaTools />
            Book Repair
          </Link>

          {/* MY BOOKINGS - ALWAYS VISIBLE */}
          <button
            type="button"
            onClick={handleMyBookings}
            className={navLinkClass}
          >
            <FaCalendarAlt />
            My Bookings
          </button>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl border border-cyan-400 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
              >
                <FaSignInAlt />
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                <FaUserPlus />
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <p className="px-3 py-2 text-sm text-slate-300">
                Welcome, {loggedInUser?.name || "User"}
              </p>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-500/15 py-3 font-semibold text-red-300 transition hover:bg-red-500 hover:text-white"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
