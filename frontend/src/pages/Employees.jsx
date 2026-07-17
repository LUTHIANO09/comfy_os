import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import EmployeeToolbar from "../components/EmployeeToolbar";
import EmployeeTable from "../components/EmployeeTable";
import AddEmployeeModal from "../components/AddEmployeeModal";
import ConfirmModal from "../components/ui/ConfirmModal";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import {
  getEmployees,
  deleteEmployee,
} from "../services/employeeService";

import { toast } from "react-toastify";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  const [employeeToDelete, setEmployeeToDelete] =
    useState(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const data = await getEmployees();

      setEmployees(data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const keyword = search.toLowerCase();

      return (
        employee.full_name
          ?.toLowerCase()
          .includes(keyword) ||
        employee.phone_number
          ?.toLowerCase()
          .includes(keyword) ||
        employee.email
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [employees, search]);

  const handleAddEmployee = () => {
    setSelectedEmployee(null);

    setOpenModal(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);

    setOpenModal(true);
  };

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);

    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;

    try {
      await deleteEmployee(employeeToDelete.id);

      toast.success("Employee deleted successfully.");

      setConfirmOpen(false);

      setEmployeeToDelete(null);

      fetchEmployees();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete employee."
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Employees
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your employees.
        </p>
      </div>

      <EmployeeToolbar
        search={search}
        setSearch={setSearch}
        onAddEmployee={handleAddEmployee}
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteClick}
        />
      )}

      <AddEmployeeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchEmployees}
        employee={selectedEmployee}
      />

      <ConfirmModal
            open={confirmOpen}
            onCancel={() => {
                setConfirmOpen(false);
                setEmployeeToDelete(null);
            }}
            onConfirm={confirmDelete}
            title="Delete Employee"
            message="Are you sure you want to delete this employee? This action cannot be undone."
            />
    </DashboardLayout>
  );
}

export default Employees;