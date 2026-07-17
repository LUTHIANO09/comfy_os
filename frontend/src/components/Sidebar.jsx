import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  Boxes,
  History,
  ShoppingCart,
  Users,
  UserCog,
  Receipt,
  BarChart3,
  Settings,
  Truck,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { logout } from "../utils/auth";

const menuGroups = [
  {
    title: "Inventory",
    items: [
      {
        name: "Products",
        icon: Package,
        path: "/products",
      },
      {
        name: "Inventory",
        icon: Boxes,
        path: "/inventory",
      },
      {
        name: "Stock Movements",
        icon: History,
        path: "/stock-movements",
      },
      {
        name: "Suppliers",
        icon: Truck,
        path: "/suppliers",
      },
    ],
  },

  {
    title: "Sales",
    items: [
      {
        name: "Sales",
        icon: ShoppingCart,
        path: "/sales",
      },
      {
        name: "Sales History",
        icon: Receipt,
        path: "/sales-history",
      },
      {
        name: "Customers",
        icon: Users,
        path: "/customers",
      },
    ],
  },

  {
    title: "Staff",
    items: [
      {
        name: "Employees",
        icon: UserCog,
        path: "/employees",
      },
      {
        name: "Users",
        icon: Users,
        path: "/users",
      },
    ],
  },

  {
    title: "Finance",
    items: [
      {
        name: "Expenses",
        icon: Receipt,
        path: "/expenses",
      },
      {
        name: "Reports",
        icon: BarChart3,
        path: "/reports",
      },
    ],
  },

  {
    title: "System",
    items: [
      {
        name: "Settings",
        icon: Settings,
        path: "/settings",
      },
    ],
  },
];

function Sidebar() {
  const location = useLocation();
  
  const getActiveMenu = () => {
  if (
    ["/products", "/inventory", "/stock-movements", "/suppliers"].includes(
      location.pathname
    )
  )
    return "Inventory";

  if (
    ["/sales", "/sales-history", "/customers"].includes(location.pathname)
  )
    return "Sales";

  if (["/employees", "/users"].includes(location.pathname))
    return "Staff";

  if (["/expenses", "/reports"].includes(location.pathname))
    return "Finance";

  if (["/settings"].includes(location.pathname))
    return "System";

  return "";
};

const [openMenus, setOpenMenus] = useState({
  Inventory: false,
  Sales: false,
  Staff: false,
  Finance: false,
  System: false,

  [getActiveMenu()]: true,
});

  const toggleMenu = (title) => {
  setOpenMenus({
    Inventory: false,
    Sales: false,
    Staff: false,
    Finance: false,
    System: false,

    [title]: !openMenus[title],
  });
};

  return (
    <aside className="flex h-screen w-72 flex-col bg-slate-950 text-white">

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold">
          COMFY OS
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Retail Management
        </p>
      </div>

      {/* Dashboard */}
      <div className="px-4 pt-5">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={20} />

          Dashboard

        </NavLink>

      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-3">

        {menuGroups.map((group) => (

          <div
            key={group.title}
            className="mb-2"
          >

            <button
              onClick={() => toggleMenu(group.title)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-medium text-slate-300 hover:bg-slate-800"
            >

              <span>{group.title}</span>

              {openMenus[group.title] ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}

            </button>

            {openMenus[group.title] && (

              <div className="ml-4 mt-2 space-y-1">

                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-4 py-2 transition ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`
                      }
                    >
                      <Icon size={18} />

                      {item.name}

                    </NavLink>
                  );
                })}

              </div>

            )}

          </div>

        ))}

      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-red-600 hover:text-white"
        >
          <LogOut size={20} />

          Logout

        </button>

        <p className="mt-5 text-center text-xs text-slate-500">
          COMFY OS v1.0
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;