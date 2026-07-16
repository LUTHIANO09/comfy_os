import { Plus, Search } from "lucide-react";
import Button from "./ui/Button";

function SupplierToolbar({
  search,
  setSearch,
  onAddSupplier,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div className="relative w-full md:w-96">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search suppliers..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <Button
        onClick={onAddSupplier}
      >
        <Plus size={18} />
        Add Supplier
      </Button>

    </div>
  );
}

export default SupplierToolbar;