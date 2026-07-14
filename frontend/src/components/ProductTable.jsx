import {
  Pencil,
  Trash2,
  Package,
} from "lucide-react";

import EmptyState from "./ui/EmptyState";

function ProductTable({ products, onDelete, onEdit}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                SKU
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Price
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
            {products.length === 0 ? (
              <tr>
              <td colSpan="6">
                <EmptyState
                  title="No Products Found"
                  message="Click 'Add Product' to create your first product."
                />
              </td>
            </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          product.image ||
                          "https://placehold.co/60x60"
                        }
                        alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />

                      <div>
                        <h4 className="font-semibold">
                          {product.name}
                        </h4>

                        <p className="text-sm text-slate-500">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6">
                    {product.sku}
                  </td>

                  <td className="px-6">
                    {product.category_name}
                  </td>

                  <td className="px-6">
                    ₦{Number(product.selling_price).toLocaleString()}
                  </td>

                  <td className="px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6">
                    <div className="flex justify-end gap-3">
                    <button
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:text-blue-800"
                    >
                    <Pencil size={18} />
                    </button>

                      <button
                        onClick={() => onDelete(product)}
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

export default ProductTable;