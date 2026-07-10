import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingCart,
  Users,
  UserCog,
  Receipt,
  BarChart3,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Products", icon: Package },
  { name: "Inventory", icon: Boxes },
  { name: "Sales", icon: ShoppingCart },
  { name: "Customers", icon: Users },
  { name: "Employees", icon: UserCog },
  { name: "Expenses", icon: Receipt },
  { name: "Reports", icon: BarChart3 },
  { name: "Settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-slate-950 text-white flex flex-col">

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold tracking-wide">
          COMFY OS
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Retail Management
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
              ${
                item.active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.name}
              </span>
            </button>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-6">
        <p className="text-xs text-slate-500">
          COMFY OS v1.0
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;