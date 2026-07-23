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
  ClipboardList
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
        name: "Returns",
        icon: History,
        path: "/returns",
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
        name: "Payroll",
        icon: Receipt,
        path: "/payroll",
      },
      {
        name: "Users",
        icon: Users,
        path: "/users",
      },
      {
        name: "Staff",
        icon: Users,
        path: "/staff",
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
        name: "Audit Logs",
        icon: ClipboardList,
        path: "/audit",
      },
      {
        name: "Settings",
        icon: Settings,
        path: "/settings",
      },
    ],
  },
];

function Sidebar({
    sidebarOpen,
    setSidebarOpen,
}) {
  const location = useLocation();
  
  const getActiveMenu = () => {
  if (
    ["/products", "/inventory", "/stock-movements", "/suppliers"].includes(
      location.pathname
    )
  )
    return "Inventory";

  if (
    ["/sales", "/sales-history", "/returns", "/customers"].includes(location.pathname)
  )
    return "Sales";

  if (
    ["/employees", "/payroll", "/users", "/staff"].includes(location.pathname)
  )
      return "Staff";

  if (["/expenses", "/reports"].includes(location.pathname))
    return "Finance";

  if (["/settings", "/audit"].includes(location.pathname))
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
    <>

    {sidebarOpen && (

    <div
        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        onClick={() => setSidebarOpen(false)}
    />

    )}

    <aside
    className={`
    fixed
    left-0
    top-0
    z-50
    flex
    h-screen
    w-72
    flex-col
    bg-slate-950
    text-white
    transition-transform
    duration-300
    lg:relative
    lg:translate-x-0
    ${
    sidebarOpen
    ? "translate-x-0"
    : "-translate-x-full"
    }
    `}
    >

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">

          <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-2xl font-bold text-white shadow-lg">

                  C

              </div>

              <div>

                  <h1 className="text-xl font-bold tracking-wide">

                      COMFY OS

                  </h1>

                  <p className="text-sm text-slate-400">

                      Retail Management Suite

                  </p>

              </div>

          </div>

      </div>

      {/* Dashboard */}
      <div className="px-4 pt-5">

        <NavLink
          to="/dashboard"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
              isActive
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={20} />

          Dashboard

        </NavLink>

      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-3 overflow-y-auto px-4 py-5">

        {menuGroups.map((group) => (

          <div
            key={group.title}
            className="mb-2"
          >

            <button
              onClick={() => toggleMenu(group.title)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-medium text-slate-300 hover:bg-slate-800"
            >

              <span className="font-semibold tracking-wide">
                  {group.title}
              </span>

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
                      onClick={() => setSidebarOpen(false)}
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
          className="flex w-full items-center gap-3 rounded-xl border border-slate-700 px-4 py-3 text-slate-300 transition hover:border-red-500 hover:bg-red-600 hover:text-white"        >
          <LogOut size={20} />

          Logout

        </button>

        <p className="mt-5 text-center text-xs text-slate-500">
          Version 1.0 • Enterprise
        </p>

      </div>

    </aside>

    </>
  );
}

export default Sidebar;