import DashboardLayout from "../layouts/DashboardLayout";
import SalesChart from "../components/SalesChart";
import StatCard from "../components/StatCard";
import LowStock from "../components/LowStock";
import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import CategoryChart from "../components/CategoryChart";
import RecentSales from "../components/RecentSales";

import {
  DollarSign,
  Package,
  Boxes,
  AlertTriangle,
  Users,
} from "lucide-react";

function Dashboard() {
const [dashboard, setDashboard] = useState({
  products: 0,
  sales: 0,
  revenue: 0,
  customers: 0,

  total_stock: 0,
  low_stock_items: 0,
  inventory_value: 0,

  low_stock: [],
  recent_sales: [],
  category_sales: [],
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
            value={`₦${Number(dashboard.revenue).toLocaleString()}`}
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
            icon={<Boxes size={28} />}
            color="bg-orange-500"
          />

          <StatCard
                title="Total Stock"
                value={dashboard.total_stock}
                icon={<Boxes size={28} />}
                color="bg-indigo-500"
              />

          <StatCard
            title="Low Stock"
            value={dashboard.low_stock_items}
            icon={<AlertTriangle size={28} />}
            color="bg-red-500"
          />

        </div>

      {/* Chart + Low Stock */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

            <SalesChart
              sales={dashboard.recent_sales}
            />

            <CategoryChart
              categories={dashboard.category_sales}
            />

          </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                <LowStock
                  items={dashboard.low_stock}
                />

                <RecentSales
                  sales={dashboard.recent_sales}
                />

              </div>
              
    </DashboardLayout>
  );
}

export default Dashboard;