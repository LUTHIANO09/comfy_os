import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  FileText,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";

import AddExpenseModal from "../components/AddExpenseModal";

import ConfirmModal from "../components/ui/ConfirmModal";

import {
  getExpenses,
  deleteExpense,
} from "../services/expenseService";

import { toast } from "react-toastify";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [selectedExpense, setSelectedExpense] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

    const handleDelete = (expense) => {
    setExpenseToDelete(expense);
    setConfirmOpen(true);
    };

    const confirmDelete = async () => {
    if (!expenseToDelete) return;

    try {
        await deleteExpense(expenseToDelete.id);

        setConfirmOpen(false);
        setExpenseToDelete(null);

        await loadExpenses();

        toast.success("Expense deleted successfully.");

    } catch (error) {
        console.error(error);

        toast.error("Failed to delete expense.");
    }
    };


  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Expenses
          </h1>

          <p className="text-slate-500">
            Manage business expenses
          </p>

        </div>

        <button
            onClick={() => {
                    setSelectedExpense(null);
                    setIsEditing(false);
                    setOpenModal(true);
                    }}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-800"
            >
            <Plus size={18} />

            Add Expense
            </button>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Date
              </th>

              <th className="px-6 py-4 text-left">
                Category
              </th>

              <th className="px-6 py-4 text-left">
                Description
              </th>

              <th className="px-6 py-4 text-left">
                Amount
              </th>

              <th className="px-6 py-4 text-left">
                Payment
              </th>

              <th className="px-6 py-4 text-left">
                Receipt
                </th>

              <th className="px-6 py-4 text-left">
                Created By
              </th>

              <th className="px-6 py-4 text-left">
                Actions
                </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="8"
                  className="p-10 text-center"
                >
                  Loading...
                </td>

              </tr>

            ) : expenses.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="p-10 text-center text-slate-500"
                >
                  No expenses found.
                </td>

              </tr>

            ) : (

              expenses.map((expense) => (

                <tr
                  key={expense.id}
                  className="border-t"
                >

                  <td className="px-6 py-4">
                    {expense.expense_date}
                  </td>

                  <td className="px-6 py-4">
                    {expense.category_name}
                  </td>

                  <td className="px-6 py-4">
                    {expense.description}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    ₦{Number(expense.amount).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    {expense.payment_method}
                  </td>

                  <td className="px-6 py-4">

                    {expense.receipt ? (

                        <a
                            href={expense.receipt}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-100"
                            >
                            <FileText size={16} />
                            View
                            </a>

                    ) : (

                        <span className="text-slate-400">
                        —
                        </span>

                    )}

                    </td>

                  <td className="px-6 py-4">
                    {expense.created_by_name}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex gap-2">

                        <button
                            onClick={() => {
                                setSelectedExpense(expense);
                                setIsEditing(true);
                                setOpenModal(true);
                            }}
                            className="rounded-lg bg-yellow-100 p-2 text-yellow-700 hover:bg-yellow-200"
                            >
                            <Pencil size={18} />
                            </button>

                        <button
                            onClick={() => handleDelete(expense)}
                            className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200"
                            >
                            <Trash2 size={18} />
                            </button>

                    </div>

                    </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <AddExpenseModal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setSelectedExpense(null);
                    setIsEditing(false);
                }}
                onSuccess={loadExpenses}
                expense={selectedExpense}
                isEditing={isEditing}
                />

                <ConfirmModal
                    open={confirmOpen}
                    title="Delete Expense"
                    message={
                        expenseToDelete
                            ? `Are you sure you want to delete the ₦${Number(
                                expenseToDelete.amount
                            ).toLocaleString()} expense under "${expenseToDelete.category_name}"?`
                            : ""
                        }
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={confirmDelete}
                    onCancel={() => {
                        setConfirmOpen(false);
                        setExpenseToDelete(null);
                    }}
                    />

    </DashboardLayout>
  );
}

export default Expenses;