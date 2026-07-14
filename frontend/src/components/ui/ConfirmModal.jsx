function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-red-600",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-slate-900">
            {title}
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-slate-600 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onCancel}
            className="rounded-lg border px-4 py-2 text-slate-700 hover:bg-slate-100"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`${confirmColor} rounded-lg px-4 py-2 text-white transition hover:opacity-90`}
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ConfirmModal;