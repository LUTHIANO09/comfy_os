import DashboardLayout from "../layouts/DashboardLayout";
import SalesChart from "../components/SalesChart";
import StatCard from "../components/StatCard";
import LowStock from "../components/LowStock";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
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

const [user, setUser] = useState(null);

useEffect(() => {
  fetchDashboard();
  fetchUser();
}, []);

const fetchUser = async () => {
  try {
    const data = await getCurrentUser();
    setUser(data);
  } catch (error) {
    console.error(error);
  }
};

const fetchDashboard = async () => {
  try {
    const data = await getDashboard();
    setDashboard(data);
  } catch (error) {
    console.error(error);
  }
};

const getGreeting = () => {
      const hour = new Date().getHours();

      if (hour < 12) return "Good Morning";
      if (hour < 17) return "Good Afternoon";
      return "Good Evening";
    };

    const fullName =
      user
        ? `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
          user.username
        : "User";
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

            <div>

                <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">

                    Dashboard

                </span>

                <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-900">

                    {getGreeting()},

                    <span className="text-blue-600">
                        {" "}
                        {fullName}
                    </span>

                </h1>

                <p className="mt-3 text-lg text-slate-500">

                    Welcome back. Here's a quick overview of your business today.

                </p>

              <p className="mt-3 text-slate-500">

                  {new Date().toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                  })}

              </p>

          </div>

          <div className="rounded-2xl border bg-white px-6 py-5 shadow-sm">

              <p className="text-sm text-slate-500">
                  Logged In As
              </p>

              <p className="mt-2 font-semibold capitalize text-blue-600">
                  {user?.role || "Administrator"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                  System Online
              </p>

          </div>

      </div>

      {/*   Quick Actions */}

              <div className="mb-10 grid gap-5 md:grid-cols-4">

            <button
                className="
                    rounded-2xl
                    bg-blue-600
                    p-5
                    text-left
                    text-white
                    shadow-lg
                    transition
                    hover:-translate-y-1
                    hover:bg-blue-700
                "
            >
                <p className="text-sm opacity-80">
                    Quick Action
                </p>

                <h3 className="mt-2 text-xl font-bold">
                    New Sale
                </h3>
            </button>

            <button
                className="
                    rounded-2xl
                    border
                    bg-white
                    p-5
                    text-left
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-lg
                "
            >
                <p className="text-sm text-slate-500">
                    Inventory
                </p>

                <h3 className="mt-2 text-xl font-bold">
                    Add Product
                </h3>
            </button>

            <button
                className="
                    rounded-2xl
                    border
                    bg-white
                    p-5
                    text-left
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-lg
                "
            >
                <p className="text-sm text-slate-500">
                    Finance
                </p>

                <h3 className="mt-2 text-xl font-bold">
                    Add Expense
                </h3>
            </button>

            <button
                className="
                    rounded-2xl
                    border
                    bg-white
                    p-5
                    text-left
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-lg
                "
            >
                <p className="text-sm text-slate-500">
                    Reports
                </p>

                <h3 className="mt-2 text-xl font-bold">
                    View Report
                </h3>
            </button>

        </div>

      {/* Statistics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 mb-10">          <StatCard
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
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mb-8">

              <div className="rounded-3xl border bg-white p-6 shadow-sm">

                  <div className="mb-6 flex items-center justify-between">

                      <h2 className="text-xl font-bold">
                          Sales Overview
                      </h2>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                          Live
                      </span>

                  </div>

                  <SalesChart sales={dashboard.recent_sales} />

              </div>

              <div className="rounded-3xl border bg-white p-6 shadow-sm">

                  <div className="mb-6 flex items-center justify-between">

                      <h2 className="text-xl font-bold">
                          Category Performance
                      </h2>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                          Live
                      </span>

                  </div>

                  <CategoryChart
                      categories={dashboard.category_sales}
                  />

              </div>

          </div>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                    <div className="rounded-3xl border bg-white p-6 shadow-sm">

                        <div className="mb-5 flex items-center justify-between">

                            <h2 className="text-xl font-bold">
                                Low Stock Alerts
                            </h2>

                            <span className="text-sm text-red-500">
                                Needs Attention
                            </span>

                        </div>

                        <LowStock
                            items={dashboard.low_stock}
                        />

                    </div>

                    <div className="rounded-3xl border bg-white p-6 shadow-sm">

                        <div className="mb-5 flex items-center justify-between">

                            <h2 className="text-xl font-bold">
                                Recent Sales
                            </h2>

                            <span className="text-sm text-slate-500">
                                Latest Transactions
                            </span>

                        </div>

                        <RecentSales
                            sales={dashboard.recent_sales}
                        />

                    </div>

                </div>
              
    </DashboardLayout>
  );
}

export default Dashboard;