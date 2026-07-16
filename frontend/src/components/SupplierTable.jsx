import { Pencil, Trash2 } from "lucide-react";
import EmptyState from "./ui/EmptyState";

function SupplierTable({
  suppliers,
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
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Company
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
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <EmptyState
                    title="No Suppliers Found"
                    message="Click 'Add Supplier' to create your first supplier."
                  />
                </td>
              </tr>
            ) : (
              suppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-6 py-5 font-medium">
                    {supplier.name}
                  </td>

                  <td className="px-6">
                    {supplier.company || "-"}
                  </td>

                  <td className="px-6">
                    {supplier.phone}
                  </td>

                  <td className="px-6">
                    {supplier.email || "-"}
                  </td>

                  <td className="px-6">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        supplier.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {supplier.status}
                    </span>
                  </td>

                  <td className="px-6">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => onEdit(supplier)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(supplier)}
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

export default SupplierTable;