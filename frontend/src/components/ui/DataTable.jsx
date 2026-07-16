import EmptyState from "./EmptyState";
import LoadingSpinner from "./LoadingSpinner";

function DataTable({
  columns,
  data,
  loading = false,
  emptyTitle = "No Data Found",
  emptyMessage = "There is nothing to display.",
}) {
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.header}
                  className={`px-6 py-4 text-sm font-semibold text-slate-700 ${
                    column.className || "text-left"
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState
                    title={emptyTitle}
                    message={emptyMessage}
                  />
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row.id || index}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  {columns.map((column) => (
                    <td
                      key={column.header}
                      className={`px-6 py-5 ${
                        column.cellClassName || ""
                      }`}
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default DataTable;