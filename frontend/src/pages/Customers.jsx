import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../layouts/DashboardLayout";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ConfirmModal from "../components/ui/ConfirmModal";

import CustomerTable from "../components/CustomerTable";
import CustomerToolbar from "../components/CustomerToolbar";
import AddCustomerModal from "../components/AddCustomerModal";

import {
  getCustomers,
  deleteCustomer,
} from "../services/customerService";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);

    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setOpenModal(true);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setOpenModal(true);
  };

  const handleDelete = (customer) => {
    setCustomerToDelete(customer);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!customerToDelete) return;

    try {
      const response = await deleteCustomer(
        customerToDelete.id
      );

      toast.success(
        response.message || "Customer deleted successfully."
      );

      setConfirmOpen(false);
      setCustomerToDelete(null);

      fetchCustomers();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete customer."
      );
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase();

    return (
      customer.first_name.toLowerCase().includes(keyword) ||
      customer.last_name.toLowerCase().includes(keyword) ||
      customer.phone.toLowerCase().includes(keyword) ||
      customer.email.toLowerCase().includes(keyword)
    );
  });

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner text="Loading customers..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <p className="mt-2 text-slate-500">
          Manage all customers.
        </p>
      </div>

      <CustomerToolbar
        search={search}
        setSearch={setSearch}
        onAddCustomer={handleAddCustomer}
      />

      <CustomerTable
        customers={filteredCustomers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddCustomerModal
        open={openModal}
        customer={selectedCustomer}
        onClose={() => {
          setOpenModal(false);
          setSelectedCustomer(null);
        }}
        onSuccess={fetchCustomers}
      />

      <ConfirmModal
        open={confirmOpen}
        title="Delete Customer"
        message={
          customerToDelete
            ? `Are you sure you want to delete "${customerToDelete.first_name} ${customerToDelete.last_name}"?`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="bg-red-600"
        onConfirm={confirmDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setCustomerToDelete(null);
        }}
      />

    </DashboardLayout>
  );
}

export default Customers;