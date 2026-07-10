import DashboardLayout from "../layouts/DashboardLayout";
import SalesChart from "../components/SalesChart";
import StatCard from "../components/StatCard";
import LowStock from "../components/LowStock";
import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";

import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

function Dashboard() {
    const [dashboard, setDashboard] = useState({
  products: 0,
  sales: 0,
  revenue: 0,
  customers: 0,
});

useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    const data = await getDashboard();
    setDashboard(data);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, Ibrahim 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Here's what's happening in your business today.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Revenue"
          value={`₦${dashboard.revenue.toLocaleString()}`}
          icon={<DollarSign size={28} />}
          color="bg-emerald-500"
        />

        <StatCard
          title="Products"
          value={dashboard.products}
          icon={<Package size={28} />}
          color="bg-blue-500"
        />

        <StatCard
          title="Sales"
          value={dashboard.sales}
          icon={<ShoppingCart size={28} />}
          color="bg-orange-500"
        />

        <StatCard
          title="Customers"
          value={dashboard.customers}
          icon={<Users size={28} />}
          color="bg-purple-500"
        />
      </div>

      {/* Chart + Low Stock */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">
          <SalesChart />
        </div>

        <div>
          <LowStock />
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;