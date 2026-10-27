const DeleteBookingModal = ({
  booking,
  onClose,
  onDelete,
}) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-8 rounded-3xl w-[500px]">
        <h2 className="text-2xl font-bold text-red-400 mb-4">
          Delete Booking
        </h2>

        <p className="text-slate-300">
          Delete booking #{booking.id} ?
        </p>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-700 py-3 rounded-xl text-white"
          >
            Cancel
          </button>

          <button
            onClick={() => onDelete(booking.id)}
            className="flex-1 bg-red-500 py-3 rounded-xl text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookingModal;