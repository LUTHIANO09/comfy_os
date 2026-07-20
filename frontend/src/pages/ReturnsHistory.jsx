import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getReturnedSales } from "../services/salesService";
import { Search } from "lucide-react";

function ReturnsHistory() {
  const [returns, setReturns] = useState([]);

  const [receipt, setReceipt] = useState("");
  const [date, setDate] = useState("");

  const [summary, setSummary] = useState({
    totalReturns: 0,
    totalRefund: 0,
    todayReturns: 0,
    averageRefund: 0,
    });

  useEffect(() => {
    loadReturns();
    }, [receipt, date]);

//   const loadReturns = async () => {
//     try {
//       const data = await getReturnedSales();
//       setReturns(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

const loadReturns = async () => {
  try {
    const data = await getReturnedSales(receipt, date);

    setReturns(data);

    const today = new Date().toDateString();

    const totalReturns = data.length;

    const totalRefund = data.reduce(
      (sum, item) => sum + Number(item.refund_amount),
      0
    );

    const todayReturns = data.filter(
      (item) =>
        new Date(item.returned_at).toDateString() === today
    ).length;

    const averageRefund =
      totalReturns > 0
        ? totalRefund / totalReturns
        : 0;

    setSummary({
      totalReturns,
      totalRefund,
      todayReturns,
      averageRefund,
    });

  } catch (error) {
    console.error(error);
  }
};

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Returned Sales
        </h1>

        <p className="text-slate-500 mt-2">
          View all returned transactions.
        </p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-5 mt-6 mb-8">

        <div className="flex flex-col lg:flex-row gap-4 items-center">

            {/* Search */}

            <div className="relative flex-1">

            <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
                type="text"
                placeholder="Search receipt..."
                value={receipt}
                onChange={(e) => setReceipt(e.target.value)}
                className="
                w-full
                h-12
                pl-11
                pr-4
                rounded-xl
                border
                border-slate-300
                bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "
            />

            </div>

            {/* Date */}

            <div className="w-56">

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="
                w-full
                h-12
                px-4
                rounded-xl
                border
                border-slate-300
                bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "
            />

            </div>

            {/* Clear */}

            <button
            onClick={() => {
                setReceipt("");
                setDate("");
            }}
            className="
                h-12
                px-6
                rounded-xl
                bg-slate-100
                hover:bg-slate-200
                font-medium
            "
            >
            Clear Filters
            </button>

        </div>

        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

            <div className="bg-white rounded-xl border p-6 shadow-sm">
                <p className="text-slate-500 text-sm">
                Total Returns
                </p>

                <h2 className="text-3xl font-bold mt-2 text-red-600">
                {summary.totalReturns}
                </h2>
            </div>

            <div className="bg-white rounded-xl border p-6 shadow-sm">
                <p className="text-slate-500 text-sm">
                Total Refunded
                </p>

                <h2 className="text-3xl font-bold mt-2 text-green-600">
                ₦{summary.totalRefund.toLocaleString()}
                </h2>
            </div>

            <div className="bg-white rounded-xl border p-6 shadow-sm">
                <p className="text-slate-500 text-sm">
                Today's Returns
                </p>

                <h2 className="text-3xl font-bold mt-2 text-orange-600">
                {summary.todayReturns}
                </h2>
            </div>

            <div className="bg-white rounded-xl border p-6 shadow-sm">
                <p className="text-slate-500 text-sm">
                Average Refund
                </p>

                <h2 className="text-3xl font-bold mt-2 text-blue-600">
                ₦{summary.averageRefund.toLocaleString(undefined,{
                    minimumFractionDigits:2,
                    maximumFractionDigits:2,
                })}
                </h2>
            </div>

            </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

        <table className="min-w-full">

          <thead className="bg-slate-100">
                <tr>
                    <th className="px-6 py-4 text-left">
                    Receipt
                    </th>

                    <th className="px-6 py-4 text-left">
                    Cashier
                    </th>

                    <th className="px-6 py-4 text-left">
                    Refund
                    </th>

                    <th className="px-6 py-4 text-left">
                    Reason
                    </th>

                    <th className="px-6 py-4 text-left">
                    Date
                    </th>
                </tr>
                </thead>

          <tbody>

                {returns.length === 0 ? (

                    <tr>

                    <td
                        colSpan="5"
                        className="py-16 text-center"
                    >

                        <div className="flex flex-col items-center">

                        <div className="text-6xl mb-4">
                            📦
                        </div>

                        <h3 className="text-xl font-semibold text-slate-700">
                            No Returned Sales
                        </h3>

                        <p className="text-slate-500 mt-2">
                            There are no returned sales matching your search.
                        </p>

                        </div>

                    </td>

                    </tr>

                ) : (

                    returns.map((item) => (

                    <tr
                        key={item.id}
                        className="border-b hover:bg-slate-50"
                    >

                        <td className="px-6 py-4 font-medium">
                        {item.receipt_number}
                        </td>

                        <td className="px-6 py-4">
                        {item.cashier_name}
                        </td>

                        <td className="px-6 py-4">
                        <span
                        className="
                            inline-flex
                            rounded-full
                            bg-red-100
                            px-3
                            py-1
                            text-sm
                            font-semibold
                            text-red-700
                        "
                        >
                        ₦
                        {Number(item.refund_amount).toLocaleString(undefined,{
                            minimumFractionDigits:2,
                            maximumFractionDigits:2,
                        })}
                        </span>
                        </td>

                        <td className="px-6 py-4">
                        {item.reason || "No reason provided"}
                        </td>

                        <td className="px-6 py-4">
                        {new Date(item.returned_at).toLocaleString("en-NG", {
                            dateStyle: "medium",
                            timeStyle: "short",
                            })}
                        </td>

                    </tr>

                    ))

                )}

                </tbody>
        </table>

      </div>

    </DashboardLayout>
  );
}

export default ReturnsHistory;