
import { FaCheckCircle, FaClipboard, FaTools } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

const Dashboardcard = ({ bookings = [] }) => {
  // Normalize status to handle uppercase, lowercase and extra spaces
  const normalizeStatus = (status) =>
    String(status ?? "Pending")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

  // Calculate counts from the bookings received from the API
  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => normalizeStatus(booking.status) === "pending"
  ).length;

  const progressBookings = bookings.filter(
    (booking) => normalizeStatus(booking.status) === "in progress"
  ).length;

  const completedBookings = bookings.filter(
    (booking) => normalizeStatus(booking.status) === "completed"
  ).length;

  const cards = [
    {
      title: "Total Bookings",
      count: totalBookings,
      icon: FaClipboard,
      color: "text-cyan-400",
      border: "border-slate-800",
    },
    {
      title: "Pending",
      count: pendingBookings,
      icon: FaClock,
      color: "text-yellow-400",
      border: "border-yellow-500/20",
    },
    {
      title: "In Progress",
      count: progressBookings,
      icon: FaTools,
      color: "text-blue-400",
      border: "border-blue-500/20",
    },
    {
      title: "Completed",
      count: completedBookings,
      icon: FaCheckCircle,
      color: "text-green-400",
      border: "border-green-500/20",
    },
  ];

  return (
    <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`rounded-3xl border ${card.border} bg-slate-900 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400">{card.title}</p>

                <h2 className={`mt-2 text-4xl font-bold ${card.color}`}>
                  {card.count}
                </h2>
              </div>

              <Icon className={`text-4xl ${card.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboardcard;
