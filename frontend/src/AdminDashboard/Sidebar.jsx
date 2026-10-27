
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaChartBar,
  FaUsers,
  FaUserTie,
  FaCog,
  FaSignOutAlt,
  FaTools,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const links = [
    {
      name: "Dashboard",
      path: "/AdminDashboard",
      icon: <FaTachometerAlt />,
      end: true,
    },
    {
      name: "Bookings",
      path: "/AdminDashboard/bookings",
      icon: <FaClipboardList />,
      end: true,
    },
    {
      name: "Customers",
      path: "/AdminDashboard/customers",
      icon: <FaUsers />,
    },
    {
      name: "Technicians",
      path: "/AdminDashboard/technicians",
      icon: <FaUserTie />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartBar />,
      end: true,
    },
    {
      name: "Settings",
      path: "/AdminDashboard/settings",
      icon: <FaCog />,
      end: true,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-950/40"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 flex-col border-r border-slate-800 bg-slate-900 text-white md:flex">
        <div className="border-b border-slate-800 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl">
              <FaTools />
            </div>

            <div>
              <h1 className="text-xl font-bold">MobileFix</h1>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Main Menu
          </p>

          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.end}
              className={navLinkClass}
            >
              <span className="text-lg">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-slate-800 bg-slate-900 px-1 py-2 text-white md:hidden">
        {links.slice(0, 4).map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-xs ${
                isActive ? "text-blue-400" : "text-slate-300"
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            <span>{link.name}</span>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
