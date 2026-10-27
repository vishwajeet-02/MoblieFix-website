const ConfirmationModal = ({
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 w-[450px] p-8 rounded-3xl border border-slate-700 shadow-xl">

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-4">
          {title}
        </h2>

        {/* Message */}
        <p className="text-slate-300 mb-6">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-slate-700 text-white hover:bg-slate-600 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            {confirmText}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;