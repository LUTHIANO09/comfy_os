import { Pencil, Trash2 } from "lucide-react";
import EmptyState from "./ui/EmptyState";

function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Employee
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Salary
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {employees.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <EmptyState
                    title="No Employees Found"
                    message="Click 'Add Employee' to create your first employee."
                  />
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-5">
                    <div>
                      <h4 className="font-semibold">
                        {employee.full_name}
                      </h4>

                      <p className="text-sm text-slate-500">
                        {employee.address || "-"}
                      </p>
                    </div>
                  </td>

                  <td className="px-6">
                    {employee.phone_number || "-"}
                  </td>

                  <td className="px-6">
                    {employee.email || "-"}
                  </td>

                  <td className="px-6">
                    ₦{Number(employee.salary).toLocaleString()}
                  </td>

                  <td className="px-6">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        employee.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {employee.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6">
                    <div className="flex justify-end gap-3">

                      <button
                        onClick={() => onEdit(employee)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(employee)}
                        className="text-red-600 hover:text-red-800"
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
    </div>
  );
}

export default EmployeeTable;