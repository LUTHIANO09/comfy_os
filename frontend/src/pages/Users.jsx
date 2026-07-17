import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../layouts/DashboardLayout";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import UserToolbar from "../components/UserToolbar";
import UserTable from "../components/UserTable";
import AddUserModal from "../components/AddUserModal";

import {
  getUsers,
} from "../services/userService";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const keyword = search.toLowerCase();

      return (
        user.username
          ?.toLowerCase()
          .includes(keyword) ||

        user.first_name
          ?.toLowerCase()
          .includes(keyword) ||

        user.last_name
          ?.toLowerCase()
          .includes(keyword) ||

        user.email
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [users, search]);

  const handleAddUser = () => {
  setSelectedUser(null);
  setOpenModal(true);
};

const handleEditUser = (user) => {
  setSelectedUser(user);
  setOpenModal(true);
};

  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <p className="mt-2 text-slate-500">
          Manage system users.
        </p>

      </div>

      <UserToolbar
        search={search}
        setSearch={setSearch}
        onAddUser={handleAddUser}
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <UserTable
          users={filteredUsers}
          onEdit={handleEditUser}
          onToggleStatus={() => {}}
        />
      )}

      <AddUserModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onSuccess={fetchUsers}
            user={selectedUser}
            />

    </DashboardLayout>
  );
}

export default Users;