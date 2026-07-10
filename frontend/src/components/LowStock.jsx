import Card from "./Card";

function LowStock() {
  return (
    <Card title="Low Stock">

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Nike Air Max</span>
          <span className="text-red-500 font-semibold">3 left</span>
        </div>

        <div className="flex justify-between">
          <span>Adidas Samba</span>
          <span className="text-orange-500 font-semibold">5 left</span>
        </div>

        <div className="flex justify-between">
          <span>Puma RS-X</span>
          <span className="text-yellow-500 font-semibold">7 left</span>
        </div>

      </div>

    </Card>
  );
}

export default LowStock;