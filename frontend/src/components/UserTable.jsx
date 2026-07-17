import { Pencil, Shield, ShieldOff } from "lucide-react";
import EmptyState from "./ui/EmptyState";

function UserTable({
  users,
  onEdit,
  onToggleStatus,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Username
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Full Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Role
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

            {users.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <EmptyState
                    title="No Users Found"
                    message="Click 'Add User' to create your first user."
                  />
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >

                  <td className="px-6 py-5 font-medium">
                    {user.username}
                  </td>

                  <td className="px-6">
                    {`${user.first_name} ${user.last_name}`.trim() || "-"}
                  </td>

                  <td className="px-6">
                    {user.email || "-"}
                  </td>

                  <td className="px-6">
                    {user.role === "ADMIN"
                      ? "Admin"
                      : "Sales Representative"}
                  </td>

                  <td className="px-6">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6">
                    <div className="flex justify-end gap-3">

                      <button
                        onClick={() => onEdit(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onToggleStatus(user)}
                        className={
                          user.is_active
                            ? "text-red-600 hover:text-red-800"
                            : "text-green-600 hover:text-green-800"
                        }
                      >
                        {user.is_active ? (
                          <ShieldOff size={18} />
                        ) : (
                          <Shield size={18} />
                        )}
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

export default UserTable;