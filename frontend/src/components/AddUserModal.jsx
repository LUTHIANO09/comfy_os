import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  createUser,
  updateUser,
} from "../services/userService";

function AddUserModal({
  open,
  onClose,
  onSuccess,
  user,
}) {
  const initialForm = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: "SALES_REP",
    password: "",
    confirm_password: "",
    is_active: true,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        role: user.role || "SALES_REP",
        password: "",
        confirm_password: "",
        is_active: user.is_active,
      });
    } else {
      setFormData(initialForm);
    }
  }, [user, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (
      formData.password !== formData.confirm_password
    ) {
      toast.error("Passwords do not match.");
      return;
    }

    const payload = {
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      role: formData.role,
      is_active: formData.is_active,
    };

    if (formData.password) {
      payload.password = formData.password;
    }

    try {
      if (user) {
        await updateUser(user.id, payload);

        toast.success(
          "User updated successfully."
        );
      } else {
        await createUser(payload);

        toast.success(
          "User created successfully."
        );
      }

      setFormData(initialForm);

      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);

      const errors = error.response?.data;

      if (errors) {
        const firstError =
          Object.values(errors)[0];

        toast.error(
          Array.isArray(firstError)
            ? firstError[0]
            : firstError
        );
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

        <div className="border-b p-6">
          <h2 className="text-2xl font-bold">
            {user ? "Edit User" : "Add User"}
          </h2>
        </div>

        <div className="p-6">

          <form className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Username *
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              >
                <option value="ADMIN">
                  Admin
                </option>

                <option value="SALES_REP">
                  Sales Representative
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                First Name
              </label>

              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Last Name
              </label>

              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>

              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                {user
                  ? "New Password"
                  : "Temporary Password"}
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
              />

              <label>
                Active User
              </label>
            </div>

          </form>

          <div className="mt-6 flex justify-end gap-3 border-t pt-6">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-5 py-2.5"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-white"
            >
              {user ? "Update User" : "Save User"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AddUserModal;