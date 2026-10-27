import { useState, useRef, useEffect } from "react";
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

const searchItems = [
  {
    title: "Home",
    description: "MobileFix home page",
    keywords: "home mobilefix",
    path: "/Home",
  },
  {
    title: "About",
    description: "Learn about our mobile repair service",
    keywords: "about company information",
    path: "/Home",
  },
  {
    title: "Book Repair",
    description: "Book a mobile repair at your doorstep",
    keywords: "repair booking mobile fix service",
    path: "/bookrepair",
  },
  {
    title: "My Bookings",
    description: "View and track your repair bookings",
    keywords: "my bookings track repair status",
    path: "/mybookings",
    requiresLogin: true,
  },
  {
    title: "Login",
    description: "Login to your account",
    keywords: "login sign in account",
    path: "/login",
  },
  {
    title: "Sign Up",
    description: "Create a new account",
    keywords: "signup register create account",
    path: "/register",
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef(null);
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

  const closeSearch = () => {
    setShowResults(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const filteredResults = searchItems.filter((item) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return false;

    const searchableText =
      `${item.title} ${item.description} ${item.keywords}`.toLowerCase();

    return searchableText.includes(query);
  });

  const handleSearchSelect = (item) => {
    if (item.requiresLogin && !isLoggedIn) {
      navigate("/login");
    } else {
      navigate(item.path);
    }

    setSearchQuery("");
    closeSearch();
    closeMenu();
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (filteredResults.length > 0) {
      handleSearchSelect(filteredResults[0]);
    } else if (searchQuery.trim()) {
      setShowResults(true);
    }
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

        {/* FUNCTIONAL SEARCH BAR */}
        <div
          ref={searchRef}
          className="relative order-3 w-full md:order-none md:w-64 lg:w-80"
        >
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2.5 transition focus-within:border-cyan-400"
          >
            <FaSearch className="shrink-0 text-slate-400" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setShowResults(true);
              }}
              onFocus={() => {
                if (searchQuery.trim()) setShowResults(true);
              }}
              placeholder="Search pages and services..."
              aria-label="Search pages and services"
              aria-expanded={showResults}
              className="ml-3 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
            />

            {searchQuery && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setSearchQuery("");
                  setShowResults(false);
                }}
                className="ml-2 text-slate-400 hover:text-white"
              >
                <FaTimes />
              </button>
            )}
          </form>

          {showResults && searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-white/10 bg-slate-900 p-2 shadow-2xl">
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleSearchSelect(item)}
                    className="flex w-full flex-col rounded-lg px-3 py-3 text-left transition hover:bg-white/10"
                  >
                    <span className="font-semibold text-cyan-300">
                      {item.title}
                    </span>
                    <span className="mt-1 text-xs text-slate-400">
                      {item.description}
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-4 text-sm text-slate-400">
                  No matching pages found.
                </p>
              )}
            </div>
          )}
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