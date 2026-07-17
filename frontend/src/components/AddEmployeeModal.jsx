import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getUsers } from "../services/userService";

import {
  createEmployee,
  updateEmployee,
} from "../services/employeeService";

function AddEmployeeModal({
  open,
  onClose,
  onSuccess,
  employee,
}) {
  const initialForm = {
    user: "",
    full_name: "",
    phone_number: "",
    address: "",
    salary: "",
    is_active: true,
  };

  const [formData, setFormData] = useState(initialForm);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (employee) {
      setFormData({
        user: employee.user || "",
        full_name: employee.full_name || "",
        phone_number: employee.phone_number || "",
        address: employee.address || "",
        salary: employee.salary || "",
        is_active: employee.is_active,
      });
    } else {
      setFormData(initialForm);
    }
  }, [employee, open]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (open) {
      fetchUsers();
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (employee) {
        await updateEmployee(employee.id, formData);

        toast.success("Employee updated successfully.");
      } else {
        await createEmployee(formData);

        toast.success("Employee created successfully.");
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
        const firstError = Object.values(errors)[0];

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

        {/* Header */}
        <div className="border-b p-6">
          <h2 className="text-2xl font-bold">
            {employee ? "Edit Employee" : "Add Employee"}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6">

          <form className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* User */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                User *
              </label>

              <select
                name="user"
                value={formData.user}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              >
                <option value="">
                  Select User
                </option>

                {users.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.first_name} {user.last_name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name *
              </label>

              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>

              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Salary
              </label>

              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Address
              </label>

              <textarea
                rows="3"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Active */}
            <div className="flex items-center gap-3 md:col-span-2">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
              />

              <label className="text-sm font-medium">
                Active Employee
              </label>
            </div>

          </form>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3 border-t pt-6">

            <button
              type="button"
              onClick={() => {
                setFormData(initialForm);
                onClose();
              }}
              className="rounded-xl border px-5 py-2.5 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-white hover:bg-slate-800"
            >
              {employee ? "Update Employee" : "Save Employee"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AddEmployeeModal;