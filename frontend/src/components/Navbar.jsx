import { Bell, Search, ChevronDown } from "lucide-react";

function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      {/* Search */}
      <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-4 py-3 w-96">
        <Search size={18} className="text-slate-500" />

        <input
          type="text"
          placeholder="Search products, sales..."
          className="ml-3 w-full bg-transparent outline-none text-sm"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        <button className="relative p-2 rounded-xl hover:bg-slate-100 transition">
          <Bell size={22} />

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer">

          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            I
          </div>

          <div className="hidden md:block">
            <h4 className="font-semibold text-slate-800">
              Ibrahim
            </h4>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>

          <ChevronDown size={18} className="text-slate-500" />

        </div>

      </div>

    </header>
  );
}

export default Navbar;