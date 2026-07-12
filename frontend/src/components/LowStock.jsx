import Card from "./Card";

function LowStock({ items = [] }) {
  return (
    <Card title="Low Stock">
      {items.length === 0 ? (
        <p className="text-slate-500">No low stock products 🎉</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-slate-800">
                  {item.name}
                </p>

                <p className="text-sm text-red-500">
                  {item.quantity} left
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default LowStock;