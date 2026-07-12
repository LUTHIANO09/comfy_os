import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import { getInventory } from "../services/inventoryService";
import InventoryTable from "../components/InventoryTable";
import InventoryToolbar from "../components/InventoryToolbar";
import StockModal from "../components/StockModal";

function Inventory() {
  const [inventory, setInventory] = useState([]);

  const [search, setSearch] = useState("");

  const [openStockModal, setOpenStockModal] = useState(false);

  const [selectedInventory, setSelectedInventory] = useState(null);

  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddStock = (item) => {
  setSelectedInventory(item);
  setOpenStockModal(true);
};

const handleRemoveStock = (item) => {
  setSelectedInventory(item);
  setOpenRemoveModal(true);
};

  const filteredInventory = inventory.filter((item) =>
  item.product_name
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Inventory
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your stock levels.
        </p>

        <InventoryToolbar
            search={search}
            setSearch={setSearch}
            />


      </div>

            <InventoryTable
                inventory={filteredInventory}
                onAddStock={handleAddStock}
                onRemoveStock={handleRemoveStock}
            />

              <StockModal
                open={openStockModal}
                mode="add"
                onClose={() => {
                  setOpenStockModal(false);
                  setSelectedInventory(null);
                }}
                inventory={selectedInventory}
                onSuccess={fetchInventory}
              />

              <StockModal
                open={openRemoveModal}
                mode="remove"
                onClose={() => {
                  setOpenRemoveModal(false);
                  setSelectedInventory(null);
                }}
                inventory={selectedInventory}
                onSuccess={fetchInventory}
              />


    </DashboardLayout>
  );
}

export default Inventory;