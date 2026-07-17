import { Search, Plus } from "lucide-react";
import Button from "./ui/Button";

function UserToolbar({
  search,
  setSearch,
  onAddUser,
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
          placeholder="Search users..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <Button onClick={onAddUser}>
        <Plus size={18} />
        Add User
      </Button>

    </div>
  );
}

export default UserToolbar;