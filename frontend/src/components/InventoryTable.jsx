import { Plus } from "lucide-react";




function InventoryTable({
  inventory,
  onAddStock,
  onRemoveStock,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left">
                Product
              </th>

              <th className="px-6 py-4 text-left">
                SKU
              </th>

              <th className="px-6 py-4 text-left">
                Quantity
              </th>

              <th className="px-6 py-4 text-left">
                Low Stock Level
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
            {inventory.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-slate-50 transition-colors"
                >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">

                    <img
                      src={
                        item.product_image ||
                        "https://placehold.co/60x60?text=No+Image"
                      }
                      alt={item.product_name}
                      className="w-12 h-12 rounded-lg object-cover border"
                    />

                    <div>
                      <p className="font-semibold">
                        {item.product_name}
                      </p>
                    </div>

                  </div>
                </td>

                <td className="px-6 py-4">
                  {item.sku}
                </td>

                  <td className="px-6 py-4">
                    <span
                      className={`font-bold text-lg ${
                        item.quantity <= item.low_stock_threshold
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {item.quantity}
                    </span>
                  </td>

                <td className="px-6 py-4">
                  {item.low_stock_threshold}
                </td>

                    <td className="px-6 py-4">
                      {item.quantity <= item.low_stock_threshold ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          <span className="h-2 w-2 rounded-full bg-red-600"></span>
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          <span className="h-2 w-2 rounded-full bg-green-600"></span>
                          In Stock
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                    <div className="flex items-center gap-2">

                          <button
                            onClick={() => onAddStock(item)}
                            className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                          >
                            <Plus size={16} />
                            Add
                          </button>

                          <button
                            onClick={() => onRemoveStock(item)}
                            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                          >
                            Remove
                          </button>
                    </div>
                  </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default InventoryTable;