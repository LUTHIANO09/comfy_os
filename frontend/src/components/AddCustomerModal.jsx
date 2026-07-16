import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  createCustomer,
  updateCustomer,
} from "../services/customerService";

function AddCustomerModal({
  open,
  onClose,
  onSuccess,
  customer,
}) {
  const initialForm = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    status: "ACTIVE",
    notes: "",
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (customer) {
      setFormData({
        first_name: customer.first_name || "",
        last_name: customer.last_name || "",
        phone: customer.phone || "",
        email: customer.email || "",
        address: customer.address || "",
        status: customer.status || "ACTIVE",
        notes: customer.notes || "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [customer, open]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (customer) {
        await updateCustomer(customer.id, formData);

        toast.success("Customer updated successfully.");
      } else {
        await createCustomer(formData);

        toast.success("Customer created successfully.");
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
            {customer ? "Edit Customer" : "Add Customer"}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6">

          <form className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                First Name *
              </label>

              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
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
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone *
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
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
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

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

            <div>
              <label className="mb-2 block text-sm font-medium">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              >
                <option value="ACTIVE">
                  Active
                </option>

                <option value="INACTIVE">
                  Inactive
                </option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Notes
              </label>

              <textarea
                rows="3"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
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
              {customer ? "Update Customer" : "Save Customer"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddCustomerModal;