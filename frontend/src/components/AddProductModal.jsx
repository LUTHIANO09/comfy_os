import { X } from "lucide-react";

import {
  createProduct,
  updateProduct,
} from "../services/productService";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";
import { toast } from "react-toastify";





function AddProductModal({ open, onClose, onSuccess,  product, }) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
  fetchCategories();
}, []);

const fetchCategories = async () => {
  try {
    const data = await getCategories();
    setCategories(data);
  } catch (error) {
    console.error(error);
  }
};

const [formData, setFormData] = useState({
  category: "",
  name: "",
  sku: "",
  description: "",
  cost_price: "",
  markup_percentage: "",
  selling_price: "",
  image: null,
  is_active: true,
});

useEffect(() => {
  if (product) {
    setFormData({
      category: product.category || "",
      name: product.name || "",
      sku: product.sku || "",
      description: product.description || "",
      cost_price: product.cost_price || "",
      markup_percentage: product.markup_percentage || "",
      selling_price: product.selling_price || "",
      image: product.image || null,
      is_active: product.is_active,
    });

    // Show existing image
    setPreview(product.image || null);

  } else {
    // Reset form when adding a new product
    setFormData({
      category: "",
      name: "",
      sku: "",
      description: "",
      cost_price: "",
      markup_percentage: "",
      selling_price: "",
      image: null,
      is_active: true,
    });

    setPreview(null);
  }
}, [product, open]);

const [preview, setPreview] = useState(null);

const handleChange = (e) => {
  const { name, value } = e.target;

  let updated = {
    ...formData,
    [name]: value,
  };

  const cost = parseFloat(updated.cost_price) || 0;
  const markup = parseFloat(updated.markup_percentage) || 0;
  const selling = parseFloat(updated.selling_price) || 0;

  // User changed Cost or Markup
  if (name === "cost_price" || name === "markup_percentage") {
    if (cost > 0) {
      updated.selling_price = (
        cost + (cost * markup) / 100
      ).toFixed(2);
    }
  }

  // User changed Selling Price
  if (name === "selling_price") {
    if (cost > 0) {
      updated.markup_percentage = (
        ((selling - cost) / cost) * 100
      ).toFixed(2);
    }
  }

  setFormData(updated);
};

const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setFormData({
    ...formData,
    image: file,
  });

  setPreview(URL.createObjectURL(file));
};

const handleSubmit = async () => {
  try {
    if (product) {
      await updateProduct(product.id, formData);

      toast.success("Product updated successfully!");
    } else {
      await createProduct(formData);

      toast.success("Product created successfully!");
    }

    onSuccess();

    onClose();

  } catch (error) {
    console.error(error);
    toast.error("Operation failed.");
  }
};

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b">

          <h2 className="text-2xl font-bold">
            {product ? "Edit Product" : "Add Product"}
            </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="p-8 space-y-8">

          <div className="grid md:grid-cols-2 gap-5">

            <div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Category
                    </label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
                    >
                        <option value="">Select Category</option>

                        {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                        ))}
                    </select>
                    </div>

              <label className="block text-sm font-medium mb-2">
                Product Name
              </label>
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="Nike Air Max"
                    />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                SKU
              </label>

                <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
                placeholder="NK-001"
                />

            </div>

          </div>

          <div>

                <label className="block text-sm font-medium mb-3">
                    Product Image
                </label>

                <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-blue-500">

                    {preview ? (

                    <img
                          src={preview}
                          alt="Preview"
                          className="mx-auto h-64 w-full max-w-sm rounded-2xl object-cover"
                      />

                    ) : (

                    <div className="text-slate-500">

                        <p>No Image Selected</p>

                    </div>

                    )}

                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-5"
                    />

                </div>

                </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Description
            </label>

                <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
                />

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            <div>

              <label className="block text-sm font-medium mb-2">
                Cost Price
              </label>

                <input
                type="number"
                name="cost_price"
                value={formData.cost_price}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
                />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Markup %
              </label>

                <input
                type="number"
                name="markup_percentage"
                value={formData.markup_percentage}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
                />

            </div>

                <input
                        type="number"
                        name="selling_price"
                        value={formData.selling_price}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
                        />

          </div>

          <div className="grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-green-50 p-4">
                    <p className="text-sm text-slate-500">
                    Profit
                    </p>

                    <h3 className="text-2xl font-bold text-green-600">
                    ₦
                    {(
                        (parseFloat(formData.selling_price) || 0) -
                        (parseFloat(formData.cost_price) || 0)
                    ).toLocaleString()}
                    </h3>
                </div>

                <div className="rounded-xl bg-blue-50 p-4">
                    <p className="text-sm text-slate-500">
                    Margin
                    </p>

                    <h3 className="text-2xl font-bold text-blue-600">
                    {formData.markup_percentage || 0}%
                    </h3>
                </div>

                </div>

        </div>

        {/* Footer */}

        <div className="flex justify-between border-t bg-slate-50 p-6">

          <button
                onClick={onClose}
                className="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
            >
                Cancel
            </button>

            <button
                onClick={handleSubmit}
                className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
                {product ? "Update Product" : "Create Product"}
            </button>
        </div>

      </div>

    </div>
  );
}

export default AddProductModal;