
import { useEffect, useState } from "react";

const STATUSES = [
  "Pending",
  "In Progress",
  "Completed",
  "Cancelled",
];

const StatusUpdateModal = ({ booking, onClose, onUpdate }) => {
  const [status, setStatus] = useState(booking?.status || "Pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setStatus(booking?.status || "Pending");
    setError("");
  }, [booking]);

  if (!booking) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (status === booking.status) {
      setError("Please select a different status.");
      return;
    }

    try {
      setLoading(true);
      await onUpdate(booking.id, status);
    } catch (err) {
      setError(err.message || "Failed to update booking status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-2xl">
        <h2 className="mb-2 text-2xl font-bold">
          Update Booking Status
        </h2>

        <p className="mb-5 text-sm text-slate-400">
          Booking ID: {booking.id}
        </p>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="bookingStatus"
            className="mb-2 block text-sm font-medium"
          >
            Select Status
          </label>

          <select
            id="bookingStatus"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setError("");
            }}
            disabled={loading}
            className="mb-4 w-full rounded-lg border border-slate-600 bg-slate-800 p-3 text-white outline-none focus:border-blue-500 disabled:opacity-50"
          >
            {STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {error && (
            <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg bg-slate-700 px-4 py-2 hover:bg-slate-600 disabled:opacity-50"
            >
              Close
            </button>

            <button
              type="submit"
              disabled={loading || status === booking.status}
              className="rounded-lg bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusUpdateModal;
