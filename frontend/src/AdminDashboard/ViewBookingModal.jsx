const ViewBookingModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-8 rounded-3xl w-[500px]">
        <h2 className="text-2xl font-bold text-white mb-6">
          Booking Details
        </h2>

        <p className="text-white">ID: #{booking.id}</p>
        <p className="text-white">Brand: {booking.brand}</p>
        <p className="text-white">Service: {booking.service}</p>
        <p className="text-white">Status: {booking.status}</p>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-cyan-500 py-3 rounded-xl text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewBookingModal;