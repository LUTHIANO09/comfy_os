function StockMovementTable({ movements }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50 border-b">

            <tr>

              <th className="px-6 py-4 text-left">
                Product
              </th>

              <th className="px-6 py-4 text-left">
                Movement
              </th>

              <th className="px-6 py-4 text-left">
                Quantity
              </th>

              <th className="px-6 py-4 text-left">
                Note
              </th>

              <th className="px-6 py-4 text-left">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {movements.map((movement) => (

              <tr
                key={movement.id}
                className="border-b hover:bg-slate-50 transition"
              >

                <td className="px-6 py-4 font-medium">
                  {movement.product_name}
                </td>

                <td className="px-6 py-4">

                  {movement.movement_type === "ADD" && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Added
                    </span>
                  )}

                  {movement.movement_type === "REMOVE" && (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Removed
                    </span>
                  )}

                  {movement.movement_type === "SALE" && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Sale
                    </span>
                  )}

                  {movement.movement_type === "RETURN" && (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Return
                    </span>
                  )}

                  {movement.movement_type === "DAMAGE" && (
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Damage
                    </span>
                  )}

                </td>

                <td className="px-6 py-4 font-semibold">
                  {movement.quantity}
                </td>

                <td className="px-6 py-4">
                  {movement.note || "-"}
                </td>

                <td className="px-6 py-4 text-slate-500">
                  {new Date(
                    movement.created_at
                  ).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default StockMovementTable;