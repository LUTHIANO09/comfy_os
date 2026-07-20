import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import ConfirmModal from "../components/ui/ConfirmModal";
import { toast } from "react-toastify";

import {
  getPayrollRecords,
  runPayroll,
  payPayroll,
} from "../services/payrollService";

function Payroll() {
  const [records, setRecords] = useState([]);
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPayroll();
  }, []);

  const loadPayroll = async () => {
    try {
      const data = await getPayrollRecords();
      setRecords(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRunPayroll = async () => {
    try {
        const response = await runPayroll();

        toast.success(response.message);

        loadPayroll();
    } catch (error) {
        console.error(error);

        toast.error(
            error.response?.data?.detail ||
            "Unable to run payroll."
        );
    }
    };

  const totalEmployees = records.length;

    const pendingPayroll = records.filter(
    (r) => r.status === "PENDING"
    ).length;

    const paidPayroll = records.filter(
    (r) => r.status === "PAID"
    ).length;

    const totalSalary = records.reduce(
    (sum, r) => sum + Number(r.salary),
    0
    );

    const filteredRecords = records.filter((record) =>
        record.employee_name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

  return (
    <DashboardLayout>
      <h1 className="mb-6 text-3xl font-bold">
        Payroll
      </h1>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl bg-white p-6 shadow">
                <h3 className="text-slate-500">
                Employees
                </h3>

                <p className="mt-3 text-3xl font-bold">
                {totalEmployees}
                </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
                <h3 className="text-slate-500">
                Pending Payroll
                </h3>

                <p className="mt-3 text-3xl font-bold text-orange-600">
                {pendingPayroll}
                </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
                <h3 className="text-slate-500">
                Paid Payroll
                </h3>

                <p className="mt-3 text-3xl font-bold text-green-600">
                {paidPayroll}
                </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
                <h3 className="text-slate-500">
                Total Salary
                </h3>

                <p className="mt-3 text-3xl font-bold">
                ₦{totalSalary.toLocaleString()}
                </p>
            </div>

            </div>

            <div className="mb-6 flex items-center justify-between">

                <input
                    type="text"
                    placeholder="Search employee..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
                        w-80
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none
                        focus:border-blue-500
                    "
                />

                <button
                    onClick={handleRunPayroll}
                    className="
                        rounded-xl
                        bg-blue-600
                        px-5
                        py-3
                        font-medium
                        text-white
                        hover:bg-blue-700
                    "
                >
                    Run Payroll
                </button>

            </div>



      <table className="min-w-full rounded-xl bg-white shadow">

        <thead className="bg-slate-100">

          <tr>
            <th className="p-4 text-left">Employee</th>
            <th className="p-4 text-left">Period</th>
            <th className="p-4 text-left">Salary</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Paid At</th>
            <th className="p-4 text-center">Action </th>

            
          </tr>

        </thead>

        <tbody>

            {filteredRecords.length === 0 ? (

                <tr>
                    <td
                        colSpan="6"
                        className="p-6 text-center text-slate-500"
                    >
                        No payroll records found.
                    </td>
                </tr>

            ) : (

                filteredRecords.map((record) => (
            <tr
              key={record.id}
              className="border-t"
            >
              <td className="p-4">
                {record.employee_name}
              </td>

              <td className="p-4">
                {record.period}
              </td>

              <td className="p-4">
                ₦{Number(record.salary).toLocaleString()}
              </td>

              <td className="p-4">

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    record.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                >
                    {record.status}
                </span>

                </td>

              <td className="p-4">
                {record.paid_at
                  ? new Date(record.paid_at).toLocaleString()
                  : "-"}
              </td>


              <td className="p-4 text-center">

                    {record.status === "PAID" ? (

                        <span className="text-sm text-green-600 font-semibold">
                        Paid
                        </span>

                    ) : (

                        <button
                        onClick={() => setSelectedPayroll(record)}
                        className="
                            rounded-lg
                            bg-blue-600
                            px-4
                            py-2
                            text-white
                            hover:bg-blue-700
                        "
                        >
                        Pay Salary
                        </button>

                    )}

                    </td>

            </tr>

                ))
            )}

        </tbody>

      </table>

      <ConfirmModal
            open={!!selectedPayroll}
            title="Pay Salary"
            message={
                selectedPayroll
                ? `Pay ₦${Number(selectedPayroll.salary).toLocaleString()} to ${selectedPayroll.employee_name}?`
                : ""
            }
            confirmText="Pay Salary"
            cancelText="Cancel"
            onCancel={() => setSelectedPayroll(null)}
            onConfirm={async () => {

                try {

                await payPayroll(selectedPayroll.id);

                toast.success("Salary paid successfully.");

                setSelectedPayroll(null);

                await loadPayroll();

                } catch (error) {

                toast.error(
                    error.response?.data?.detail ||
                    "Unable to pay salary."
                );

                }

            }}
            />

    </DashboardLayout>
  );
}

export default Payroll;