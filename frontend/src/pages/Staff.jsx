import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import AddUserModal from "../components/AddUserModal";

import ConfirmModal from "../components/ui/ConfirmModal";

import {
  deleteUser,
} from "../services/userService";

import { toast } from "react-toastify";

import DashboardLayout from "../layouts/DashboardLayout";

import { getUsers } from "../services/staffService";

function Staff() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [userToDelete, setUserToDelete] = useState(null);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (user) => {
        setUserToDelete(user);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteUser(userToDelete.id);

            toast.success("User deleted successfully.");

            setConfirmOpen(false);

            setUserToDelete(null);

            loadUsers();

        } catch (error) {
            console.error(error);

            toast.error("Failed to delete user.");
        }
    };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Staff Management
          </h1>

          <p className="text-slate-500">
            Manage system users
          </p>
        </div>

        <button
                onClick={() => {
                    setSelectedUser(null);
                    setOpenModal(true);
                }}
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-800"
            >
          <Plus size={18} />
          Add User
        </button>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Username
              </th>

              <th className="px-6 py-4 text-left">
                Full Name
              </th>

              <th className="px-6 py-4 text-left">
                Email
              </th>

              <th className="px-6 py-4 text-left">
                Phone
              </th>

              <th className="px-6 py-4 text-left">
                Role
              </th>

              <th className="px-6 py-4 text-left">
                Status
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
                  colSpan="7"
                  className="p-10 text-center"
                >
                  Loading...
                </td>
              </tr>

            ) : users.length === 0 ? (

              <tr>
                <td
                  colSpan="7"
                  className="p-10 text-center text-slate-500"
                >
                  No users found.
                </td>
              </tr>

            ) : (

              users.map((user) => (

                <tr
                  key={user.id}
                  className="border-t"
                >

                  <td className="px-6 py-4 font-semibold">
                    {user.username}
                  </td>

                  <td className="px-6 py-4">
                    {user.first_name} {user.last_name}
                  </td>

                  <td className="px-6 py-4">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    {user.phone_number}
                  </td>

                  <td className="px-6 py-4">

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {user.role_display}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    {user.is_active ? (

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Active
                      </span>

                    ) : (

                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        Inactive
                      </span>

                    )}

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() => {
                            setSelectedUser(user);
                            setOpenModal(true);
                        }}
                        className="rounded-lg bg-yellow-100 p-2 text-yellow-700 hover:bg-yellow-200"
                    >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(user)}
                        className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200">
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

      <AddUserModal
        open={openModal}
        onClose={() => {
            setOpenModal(false);
            setSelectedUser(null);
        }}
        onSuccess={loadUsers}
        user={selectedUser}
    />

    <ConfirmModal
        open={confirmOpen}
        title="Delete User"
        message={
            userToDelete
                ? `Delete "${userToDelete.username}"?`
                : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => {
            setConfirmOpen(false);
            setUserToDelete(null);
        }}
    />

    </DashboardLayout>
  );
}

export default Staff;