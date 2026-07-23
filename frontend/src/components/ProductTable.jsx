import {
  Pencil,
  Trash2,
} from "lucide-react";

import EmptyState from "./ui/EmptyState";

function ProductTable({
  products,
  onDelete,
  onEdit,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100">
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
                    className="
                        border-b
                        border-slate-100
                        transition
                        duration-200
                        hover:bg-blue-50
                    "
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          product.image ||
                          "https://placehold.co/60x60"
                        }
                        alt={product.name}
                        className="
                          w-16
                          h-16
                          rounded-2xl
                          border
                          object-cover
                          shadow-sm
                          "
                      />

                      <div>
                        <h4 className="text-base font-bold text-slate-900">
                          {product.name}
                        </h4>

                        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6">

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">

                          {product.sku}

                      </span>

                  </td>

                  <td className="px-6">

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                            {product.category_name}

                        </span>

                    </td>

                  <td className="px-6 font-bold text-green-600">
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
                      {product.is_active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6">
                    <div className="flex justify-end gap-2">
                      <button
                          onClick={() => onEdit(product)}
                          className="
                              rounded-xl
                              bg-blue-50
                              p-2
                              text-blue-600
                              transition
                              hover:bg-blue-600
                              hover:text-white
                          "
                      >
                          <Pencil size={18} />
                      </button>

                      <button
                          onClick={() => onDelete(product)}
                          className="
                              rounded-xl
                              bg-red-50
                              p-2
                              text-red-600
                              transition
                              hover:bg-red-600
                              hover:text-white
                          "
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