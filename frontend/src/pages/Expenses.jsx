import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import {
  getExpenses,
} from "../services/expenseService";
import AddExpenseModal from "../components/AddExpenseModal";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

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
            onClick={() => setOpenModal(true)}
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
                Created By
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="6"
                  className="p-10 text-center"
                >
                  Loading...
                </td>

              </tr>

            ) : expenses.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
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
                    {expense.created_by_name}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <AddExpenseModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onSuccess={loadExpenses}
            />

    </DashboardLayout>
  );
}

export default Expenses;