import Button from "./Button";

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
          <Button
            variant="secondary"
            onClick={onCancel}
            >
            {cancelText}
            </Button>

            <Button
            variant="danger"
            onClick={onConfirm}
            >
            {confirmText}
            </Button>
        </div>

      </div>
    </div>
  );
}

export default ConfirmModal;