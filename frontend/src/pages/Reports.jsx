import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { getDashboardReport } from "../services/reportService";

import MonthlySalesChart from "../components/MonthlySalesChart";

import { exportReportPDF } from "../utils/exportPDF";

function Reports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("today");

  useEffect(() => {
    loadReport(filter);
    }, [filter]);

  const loadReport = async (period = filter) => {
    try {
      const data = await getDashboardReport(period);
      setReport(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <h2>Loading...</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <p className="text-slate-500">
          Business Overview
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">

        <button
            onClick={() => setFilter("today")}
            className={`rounded-xl px-5 py-2 ${
                filter === "today"
                ? "bg-slate-900 text-white"
                : "border border-slate-300 hover:bg-slate-100"
            }`}
            >
            Today
            </button>

        <button
                onClick={() => setFilter("week")}
                className={`rounded-xl px-5 py-2 ${
                    filter === "week"
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 hover:bg-slate-100"
                }`}
                >
                This Week
                </button>

        <button
                onClick={() => setFilter("month")}
                className={`rounded-xl px-5 py-2 ${
                    filter === "month"
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 hover:bg-slate-100"
                }`}
                >
                This Month
                </button>

        <button
            onClick={() => setFilter("year")}
            className={`rounded-xl px-5 py-2 ${
                filter === "year"
                ? "bg-slate-900 text-white"
                : "border border-slate-300 hover:bg-slate-100"
            }`}
            >
            This Year
            </button>

            <button
                onClick={() => exportReportPDF(report)}
                className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
                >
                Export PDF
                </button>

        <button
            onClick={() => setFilter("custom")}
            className={`rounded-xl px-5 py-2 ${
                filter === "custom"
                ? "bg-slate-900 text-white"
                : "border border-slate-300 hover:bg-slate-100"
            }`}
            >
            Custom
            </button>

        </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-slate-500">
            Total Sales
          </h3>

          <p className="mt-3 text-3xl font-bold">
            ₦{Number(report.total_sales).toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-slate-500">
            Total Expenses
          </h3>

          <p className="mt-3 text-3xl font-bold">
            ₦{Number(report.total_expenses).toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-slate-500">
            Net Profit
          </h3>

          <p className="mt-3 text-3xl font-bold text-green-600">
            ₦{Number(report.net_profit).toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-slate-500">
            Products
          </h3>

          <p className="mt-3 text-3xl font-bold">
            {report.products}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-slate-500">
            Customers
          </h3>

          <p className="mt-3 text-3xl font-bold">
            {report.customers}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-slate-500">
            Low Stock Items
          </h3>

          <p className="mt-3 text-3xl font-bold text-red-600">
            {report.low_stock}
          </p>
        </div>

      </div>

      {/* Monthly Chart */}

        <div className="mt-10">
        <MonthlySalesChart
            data={report.monthly_summary}
        />
        </div>

      {/* Recent Activity */}

      <div className="mt-10 grid gap-6 lg:grid-cols-2">

        {/* Recent Sales */}

        <div className="overflow-hidden rounded-2xl bg-white shadow">

          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold">
              Recent Sales
            </h2>
          </div>

          <table className="min-w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-5 py-3 text-left">
                  Receipt
                </th>

                <th className="px-5 py-3 text-left">
                  Amount
                </th>

                <th className="px-5 py-3 text-left">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {report.recent_sales.length === 0 ? (

                <tr>

                  <td
                    colSpan="3"
                    className="p-6 text-center text-slate-500"
                  >
                    No sales found.
                  </td>

                </tr>

              ) : (

                report.recent_sales.map((sale) => (

                  <tr
                    key={sale.id}
                    className="border-t"
                  >

                    <td className="px-5 py-3">
                      {sale.receipt_number}
                    </td>

                    <td className="px-5 py-3 font-semibold">
                      ₦{Number(sale.total_amount).toLocaleString()}
                    </td>

                    <td className="px-5 py-3">
                      {new Date(
                        sale.created_at
                      ).toLocaleDateString()}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* Recent Expenses */}

        <div className="overflow-hidden rounded-2xl bg-white shadow">

          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold">
              Recent Expenses
            </h2>
          </div>

          <table className="min-w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-5 py-3 text-left">
                  Category
                </th>

                <th className="px-5 py-3 text-left">
                  Amount
                </th>

                <th className="px-5 py-3 text-left">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {report.recent_expenses.length === 0 ? (

                <tr>

                  <td
                    colSpan="3"
                    className="p-6 text-center text-slate-500"
                  >
                    No expenses found.
                  </td>

                </tr>

              ) : (

                report.recent_expenses.map((expense) => (

                  <tr
                    key={expense.id}
                    className="border-t"
                  >

                    <td className="px-5 py-3">
                      {expense.category_name}
                    </td>

                    <td className="px-5 py-3 font-semibold">
                      ₦{Number(expense.amount).toLocaleString()}
                    </td>

                    <td className="px-5 py-3">
                      {expense.expense_date}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Reports;