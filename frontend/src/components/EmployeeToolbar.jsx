import { Search, Plus } from "lucide-react";
import Button from "./ui/Button";

function EmployeeToolbar({
  search,
  setSearch,
  onAddEmployee,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      {/* Search */}
      <div className="relative w-full md:max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <Button onClick={onAddEmployee}>
        <Plus size={18} />
        Add Employee
      </Button>

    </div>
  );
}

export default EmployeeToolbar;