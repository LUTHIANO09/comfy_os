import { useEffect, useState } from "react";
import {
  getExpenseCategories,
  createExpense,
  updateExpense,
} from "../services/expenseService";

import { toast } from "react-toastify";

function AddExpenseModal({
  open,
  onClose,
  onSuccess,
  expense,
  isEditing,
}) {
  const initialForm = {
    category: "",
    amount: "",
    description: "",
    expense_date: "",
    payment_method: "CASH",
    receipt: null,
    };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
  if (expense) {
    setFormData({
      category: expense.category,
      amount: expense.amount,
      description: expense.description || "",
      expense_date: expense.expense_date,
      payment_method: expense.payment_method,
      receipt: null,
    });
  } else {
    setFormData({
      category: "",
      amount: "",
      description: "",
      expense_date: "",
      payment_method: "CASH",
      receipt: null,
    });
  }
}, [expense]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (open) {
        loadCategories();

        if (!expense) {
        setFormData(initialForm);
        }
    }
    }, [open, expense]);


  const loadCategories = async () => {
    try {
        const data = await getExpenseCategories();
        setCategories(data);
    } catch (error) {
        console.error(error);
    }
    };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
    }));
    };

  const handleSubmit = async () => {
    if (
        !formData.category ||
        !formData.amount ||
        !formData.expense_date
    ) {
        toast.error("Please fill all required fields.");
        return;
    }

    try {
        const expenseData = new FormData();

        expenseData.append("category", formData.category);
        expenseData.append("amount", formData.amount);
        expenseData.append("description", formData.description);
        expenseData.append("expense_date", formData.expense_date);
        expenseData.append("payment_method", formData.payment_method);

        expenseData.append("created_by", 1);

        if (formData.receipt) {
        expenseData.append("receipt", formData.receipt);
        }

        if (isEditing) {
        await updateExpense(expense.id, expenseData);
        toast.success("Expense updated successfully.");
        } else {
        await createExpense(expenseData);
        toast.success("Expense added successfully.");
        }

        onSuccess();

        onClose();

    } catch (error) {
       console.error(error.response?.data);

            toast.error(
            JSON.stringify(error.response?.data) || "Failed to save expense."
            );
    }
    };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="border-b p-6">

          <h2>
            {isEditing ? "Edit Expense" : "Add Expense"}
            </h2>

        </div>

        {/* Body */}

        <div className="p-6">

          <form className="grid gap-5 md:grid-cols-2">

            {/* Category */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              >
                <option value="">
                Select Category
                </option>

                {categories.map((category) => (
                <option
                    key={category.id}
                    value={category.id}
                >
                    {category.name}
                </option>
                ))}
              </select>

            </div>

            {/* Amount */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />

            </div>

            {/* Date */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Expense Date
              </label>

              <input
                type="date"
                name="expense_date"
                value={formData.expense_date}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />

            </div>

            {/* Payment */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Payment Method
              </label>

              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              >
                <option value="CASH">
                  Cash
                </option>

                <option value="TRANSFER">
                  Transfer
                </option>

                <option value="POS">
                  POS
                </option>

                <option value="OTHER">
                  Other
                </option>

              </select>

            </div>

            {/* Description */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />

            </div>

            <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium">
                Receipt (Optional)
            </label>

            <input
                type="file"
                name="receipt"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            </div>

          </form>

          {/* Footer */}

          <div className="mt-6 flex justify-end gap-3 border-t pt-6">

            <button
              onClick={onClose}
              className="rounded-xl border px-5 py-2.5"
            >
              Cancel
            </button>

            <button
            onClick={handleSubmit}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-white"
            >
            {isEditing ? "Update Expense" : "Save Expense"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddExpenseModal;