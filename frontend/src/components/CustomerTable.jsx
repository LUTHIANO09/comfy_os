import { Pencil, Trash2 } from "lucide-react";
import EmptyState from "./ui/EmptyState";

function CustomerTable({
  customers,
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
                Customer
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Email
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
            {customers.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <EmptyState
                    title="No Customers Found"
                    message="Click 'Add Customer' to create your first customer."
                  />
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-6 py-5">
                    <div>
                      <h4 className="font-semibold">
                        {customer.first_name} {customer.last_name}
                      </h4>

                      <p className="text-sm text-slate-500">
                        {customer.address || "-"}
                      </p>
                    </div>
                  </td>

                  <td className="px-6">
                    {customer.phone}
                  </td>

                  <td className="px-6">
                    {customer.email || "-"}
                  </td>

                  <td className="px-6">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        customer.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  <td className="px-6">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => onEdit(customer)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(customer)}
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

export default CustomerTable;