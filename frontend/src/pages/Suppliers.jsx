import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import {
  getSuppliers,
  deleteSupplier,
} from "../services/supplierService";
import SupplierTable from "../components/SupplierTable";
import SupplierToolbar from "../components/SupplierToolbar";
import AddSupplierModal from "../components/AddSupplierModal";
import ConfirmModal from "../components/ui/ConfirmModal";
import { toast } from "react-toastify";


function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
const [supplierToDelete, setSupplierToDelete] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);

    try {
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (supplier) => {
  setSelectedSupplier(supplier);
  setOpenModal(true);
};

const handleDelete = (supplier) => {
  console.log("Deleting supplier:", supplier);

  setSupplierToDelete(supplier);
  setConfirmOpen(true);
};

const confirmDelete = async () => {
  if (!supplierToDelete) return;

  try {
    const response = await deleteSupplier(
      supplierToDelete.id
    );

    toast.success(
      response.message || "Supplier deleted successfully."
    );

    setConfirmOpen(false);
    setSupplierToDelete(null);

    fetchSuppliers();

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to delete supplier."
    );
  }
};

const handleAddSupplier = () => {
  setOpenModal(true);
};

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner text="Loading suppliers..." />
      </DashboardLayout>
    );
  }

  const filteredSuppliers = suppliers.filter((supplier) => {
  const keyword = search.toLowerCase();

  return (
    supplier.name.toLowerCase().includes(keyword) ||
    supplier.company.toLowerCase().includes(keyword) ||
    supplier.phone.toLowerCase().includes(keyword)
  );
});

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Suppliers
        </h1>

        <p className="mt-2 text-slate-500">
          Manage all product suppliers.
        </p>

        <SupplierToolbar
                search={search}
                setSearch={setSearch}
                onAddSupplier={handleAddSupplier}
                />
      </div>
        <div>
      <SupplierTable
                suppliers={filteredSuppliers}
                onEdit={handleEdit}
                onDelete={handleDelete}
                />
                </div>

                <AddSupplierModal
                    open={openModal}
                    supplier={selectedSupplier}
                    onSuccess={fetchSuppliers}
                    onClose={() => {
                        setOpenModal(false);
                        setSelectedSupplier(null);
                    }}
                    />

                    <ConfirmModal
                            open={confirmOpen}
                            title="Delete Supplier"
                            message={
                                supplierToDelete
                                ? `Are you sure you want to delete "${supplierToDelete.name}"?`
                                : ""
                            }
                            confirmText="Delete"
                            cancelText="Cancel"
                            confirmColor="bg-red-600"
                            onConfirm={confirmDelete}
                            onCancel={() => {
                                setConfirmOpen(false);
                                setSupplierToDelete(null);
                            }}
                            />

    </DashboardLayout>
  );
}

export default Suppliers;