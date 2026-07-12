import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getStockMovements } from "../services/inventoryService";
import StockMovementTable from "../components/StockMovementTable";

function StockMovements() {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    fetchMovements();
  }, []);

  const fetchMovements = async () => {
    try {
      const data = await getStockMovements();
      setMovements(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Stock Movements
        </h1>

        <p className="mt-2 text-slate-500">
          View all inventory transactions.
        </p>
      </div>

        <StockMovementTable
        movements={movements}
        />

    </DashboardLayout>
  );
}

export default StockMovements;