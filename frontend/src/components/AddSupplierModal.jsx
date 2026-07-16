import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createSupplier,
  updateSupplier,
} from "../services/supplierService";

function AddSupplierModal({
  open,
  onClose,
  onSuccess,
  supplier,
}) {

    const initialForm = {
  name: "",
  company: "",
  phone: "",
  email: "",
  address: "",
  status: "ACTIVE",
  notes: "",
};

    const [formData, setFormData] = useState(initialForm);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

useEffect(() => {
  if (supplier) {
    setFormData({
      name: supplier.name || "",
      company: supplier.company || "",
      phone: supplier.phone || "",
      email: supplier.email || "",
      address: supplier.address || "",
      status: supplier.status || "ACTIVE",
      notes: supplier.notes || "",
    });
  } else {
    setFormData(initialForm);
  }
}, [supplier, open]);

const handleSubmit = async () => {
  try {
    if (supplier) {
      await updateSupplier(supplier.id, formData);

      toast.success("Supplier updated successfully.");
    } else {
      await createSupplier(formData);

      toast.success("Supplier created successfully.");
    }

    setFormData(initialForm);

    onClose();

    if (onSuccess) {
      onSuccess();
    }

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to save supplier."
    );
  }
};

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

        <div className="border-b p-6">
          <h2 className="text-2xl font-bold">
            Add Supplier
          </h2>
        </div>

        <div className="p-6">

          <form className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>
                    <label className="mb-2 block text-sm font-medium">
                    Supplier Name *
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                    Company
                    </label>

                    <input
                    type="text"
                    name="company"
                    value={formData.company}
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

                    <div className="flex justify-end gap-3 border-t p-6">
                    
                        <button
                            onClick={onClose}
                            className="rounded-xl border px-5 py-2.5 hover:bg-slate-100"
                        >
                            Cancel
                        </button>

                            <button
                            onClick={handleSubmit}
                            className="rounded-xl bg-slate-900 px-5 py-2.5 text-white hover:bg-slate-800"
                            >
                            Save Supplier
                            </button>

                        </div>

        </div>

      </div>

    </div>
  );
}

export default AddSupplierModal;