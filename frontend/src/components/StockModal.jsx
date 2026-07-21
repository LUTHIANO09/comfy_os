import { useState } from "react";
import { X } from "lucide-react";
import {
  addStock,
  removeStock,
} from "../services/inventoryService";
import { toast } from "react-toastify";

function StockModal({
  open,
  onClose,
  inventory,
  onSuccess,
  mode,
}) {
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async () => {
  try {
    if (mode === "add") {
      await addStock(
        inventory.id,
        Number(quantity)
      );
    } else {
      await removeStock(
        inventory.id,
        Number(quantity)
      );
    }

    toast.success(
      mode === "add"
        ? "Stock added successfully."
        : "Stock removed successfully."
    );

    onSuccess();

    onClose();

    setQuantity("");

  } catch (error) {
    console.error(error);

    const message =
      error.response?.data?.error ||
      "Operation failed.";

    toast.error(message);
  }
};



  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">

        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b">

            <h2 className="text-xl font-bold">
                {mode === "add" ? "Add Stock" : "Remove Stock"}
            </h2>

          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-5">

          <div>

            <label className="block text-sm font-medium mb-2">
              Product
            </label>

            <input
              value={inventory?.product_name || ""}
              readOnly
              className="w-full border rounded-xl p-3 bg-slate-100"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Current Quantity
            </label>

            <input
              value={inventory?.quantity || 0}
              readOnly
              className="w-full border rounded-xl p-3 bg-slate-100"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              {mode === "add"
              ? "Quantity to Add"
              : "Quantity to Remove"}
            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              className="w-full border rounded-xl p-3"
              placeholder="Enter quantity"
            />

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 p-6 border-t">

          <button
            onClick={onClose}
            className="px-5 py-3 border rounded-xl"
          >
            Cancel
          </button>

            <button
            onClick={handleSubmit}
            className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
            {mode === "add"
              ? "Add Stock"
              : "Remove Stock"}
            </button>

        </div>

      </div>

    </div>
  );
}

export default StockModal;