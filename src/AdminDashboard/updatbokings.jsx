const StatusUpdateModal = ({ booking, onClose, onUpdate }) => {
  if (!booking) return null;

  return (
    <div>
      <button
        onClick={() => onUpdate(booking.id, "Completed")}
      >
        Update
      </button>

      <button onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default StatusUpdateModal;