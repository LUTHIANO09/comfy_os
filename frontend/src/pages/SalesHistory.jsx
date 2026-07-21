import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getSales,
  returnSale,
} from "../services/salesService";
import { Search } from "lucide-react";
import ReceiptModal from "../components/ReceiptModal";
import ConfirmModal from "../components/ui/ConfirmModal";

import { toast } from "react-toastify";

import { exportSalesCSV } from "../services/exportService";

import { saveAs } from "file-saver";

function SalesHistory() {
  const [sales, setSales] = useState([]);

const [summary, setSummary] = useState({
  total_revenue: 0,
  total_sales: 0,
  average_sale: 0,
  today_sales: 0,
});

  const [receipt, setReceipt] = useState("");

  const [date, setDate] = useState("");

  const [selectedSale, setSelectedSale] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [saleToReturn, setSaleToReturn] = useState(null);
  const [returnReason, setReturnReason] = useState("");

  useEffect(() => {
  fetchSales();
}, [receipt, date]);



const fetchSales = async () => {
  try {
    const data = await getSales(receipt, date);

    setSummary(data.summary);

    setSales(data.sales);

  } catch (error) {
    console.error(error);
  }
};

const handleExportCSV = async () => {
    try {
      const blob = await exportSalesCSV(receipt, date);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "sales.csv";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
    }
  };  
  


return (
    <DashboardLayout>



      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Sales History
        </h1>

        <p className="text-slate-500 mt-2">
          View all completed sales.
        </p>

            <div className="bg-white rounded-xl border shadow-sm p-5 mb-8">

                <div className="flex flex-col lg:flex-row gap-4 items-center">

                    {/* Search */}

            <div className="relative flex-1">

                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    type="text"
                    placeholder="Search receipt number..."
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
                        transition
                    "
                />

            </div>

                    {/* Date */}

            <div className="relative w-56">

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
                text-slate-700
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                transition
                cursor-pointer
                "
            />

            </div>

        {/* Clear */}

        <button
            onClick={()=>{
                setReceipt("");
                setDate("");
            }}
            className="
                h-11
                px-6
                rounded-lg
                bg-slate-100
                hover:bg-slate-200
                font-medium
                whitespace-nowrap
            "
        >
            Clear Filters
        </button>

        <button
            onClick={handleExportCSV}
            className="
                h-11
                px-6
                rounded-lg
                bg-green-600
                hover:bg-green-700
                text-white
                font-medium
                whitespace-nowrap
                transition
            "
        >
            Export CSV
        </button>

    </div>

</div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl border p-6 shadow-sm">
            <p className="text-slate-500 text-sm">
            Total Revenue
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-600">
            ₦{Number(summary.total_revenue).toLocaleString()}
            </h2>
        </div>

        <div className="bg-white rounded-xl border p-6 shadow-sm">
            <p className="text-slate-500 text-sm">
            Total Sales
            </p>

            <h2 className="text-3xl font-bold mt-2">
            {summary.total_sales}
            </h2>
        </div>

        <div className="bg-white rounded-xl border p-6 shadow-sm">
            <p className="text-slate-500 text-sm">
            Average Sale
            </p>

            <h2 className="text-3xl font-bold mt-2 text-blue-600">
            ₦{Number(summary.average_sale).toLocaleString()}
            </h2>
        </div>

        <div className="bg-white rounded-xl border p-6 shadow-sm">
            <p className="text-slate-500 text-sm">
            Today's Sales
            </p>

            <h2 className="text-3xl font-bold mt-2 text-orange-600">
            {summary.today_sales}
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
                Payment
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Total
              </th>

              <th className="px-6 py-4 text-left">
                Date
              </th>

              <th className="px-6 py-4 text-left">
                  Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {sales.map((sale) => (

              <tr
                key={sale.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="px-6 py-4 font-medium">
                  {sale.receipt_number}
                </td>

                <td className="px-6 py-4">
                  {sale.cashier_name}
                </td>

                <td className="px-6 py-4">
                  {sale.payment_method_display}
                </td>

                <td className="px-6 py-4">
                  {sale.status === "COMPLETED" && (
                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        bg-green-100
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-green-700
                      "
                    >
                      Completed
                    </span>
                  )}

                  {sale.status === "RETURNED" && (
                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        bg-red-100
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-red-700
                      "
                    >
                      Returned
                    </span>
                  )}

                  {sale.status === "DRAFT" && (
                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        bg-yellow-100
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-yellow-700
                      "
                    >
                      Draft
                    </span>
                  )}

                  {sale.status === "CANCELLED" && (
                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        bg-slate-200
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-slate-700
                      "
                    >
                      Cancelled
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 font-semibold">
                  ₦
                  {Number(sale.total_amount).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {new Date(
                    sale.created_at
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 space-x-2">

                <button
                  onClick={() => setSelectedSale(sale)}
                  className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    text-sm
                  "
                >
                  Receipt
                </button>

                {sale.status === "COMPLETED" ? (
                <button
                  onClick={() => {
                    setSaleToReturn(sale);
                    setReturnReason("");
                    setConfirmOpen(true);
                  }}
                  className="
                    ml-2
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    text-sm
                    font-medium
                    transition
                  "
                >
                  Return
                </button>
              ) : (
                <span
                  className="
                    ml-2
                    inline-flex
                    items-center
                    rounded-lg
                    bg-green-100
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-green-700
                  "
                >
                  Returned
                </span>
              )}

              </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

            <ReceiptModal sale={selectedSale} onClose={() => setSelectedSale(null)} />

            <ConfirmModal
                  open={confirmOpen}
                  title="Return Sale"
                  message="Are you sure you want to return this sale? This action cannot be undone."

                  showReason={true}
                  reason={returnReason}
                  setReason={setReturnReason}

                  confirmText="Return Sale"
                  cancelText="Cancel"

                  onCancel={() => {
                    setConfirmOpen(false);
                    setSaleToReturn(null);
                    setReturnReason("");
                  }}

                  onConfirm={async () => {
                    if (!saleToReturn) return;

                    if (!returnReason.trim()) {
                      toast.error("Please enter a reason for the return.");
                      return;
                    }

                    try {
                      await returnSale(
                          saleToReturn.id,
                          returnReason
                        );

                      toast.success("Sale returned successfully.");

                      setConfirmOpen(false);
                      setSaleToReturn(null);
                      setReturnReason("");

                      fetchSales();

                    } catch (error) {
                      console.error(error);

                      toast.error(
                        error.response?.data?.detail ||
                        "Unable to return sale."
                      );
                    }
                  }}
                />

    </DashboardLayout>
  );
}

export default SalesHistory;