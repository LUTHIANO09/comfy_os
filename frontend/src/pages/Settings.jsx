import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getSettings,
  updateSettings,
} from "../services/settingsService";

function Settings() {
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    business_name: "",
    business_address: "",
    phone_number: "",
    email: "",
    currency: "₦",
    low_stock_threshold: 5,
    receipt_footer: "",
    tax_percentage: 0,
    logo: null,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();

      setFormData({
        ...data,
        logo: null,
      });

    } catch (error) {
      console.error(error);

      toast.error("Failed to load settings.");

    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);

      const payload = new FormData();

      Object.keys(formData).forEach((key) => {
        if (
          formData[key] !== null &&
          formData[key] !== undefined
        ) {
          payload.append(key, formData[key]);
        }
      });

      await updateSettings(payload);

      toast.success("Settings updated successfully.");

      loadSettings();

    } catch (error) {
      console.error(error);

      toast.error("Unable to save settings.");

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <h2 className="text-xl font-semibold">
          Loading settings...
        </h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-slate-500">
          Configure your business information.
        </p>

      </div>

            <div className="rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-xl font-semibold">
            Business Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <div>
            <label className="mb-2 block text-sm font-medium">
                Business Name
            </label>

            <input
                type="text"
                name="business_name"
                value={formData.business_name}
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
                Currency
            </label>

            <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
            </div>

            <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
                Business Address
            </label>

            <textarea
                rows={3}
                name="business_address"
                value={formData.business_address}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
            </div>

            <div>
            <label className="mb-2 block text-sm font-medium">
                Low Stock Threshold
            </label>

            <input
                type="number"
                name="low_stock_threshold"
                value={formData.low_stock_threshold}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
            </div>

            <div>
            <label className="mb-2 block text-sm font-medium">
                Tax Percentage
            </label>

            <input
                type="number"
                step="0.01"
                name="tax_percentage"
                value={formData.tax_percentage}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
            </div>

            <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
                Receipt Footer
            </label>

            <textarea
                rows={3}
                name="receipt_footer"
                value={formData.receipt_footer}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
            </div>

            <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
                Business Logo
            </label>

            <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleChange}
                className="block w-full rounded-xl border border-slate-300 px-4 py-3"
            />
            </div>

        </div>

        <div className="mt-8 border-t pt-6 flex justify-end">

            <button
            onClick={handleSubmit}
            disabled={saving}
            className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800 disabled:opacity-50"
            >
            {saving ? "Saving..." : "Save Changes"}
            </button>

        </div>

        </div>

    </DashboardLayout>
  );
}

export default Settings;