import { Search, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";

function ProductToolbar({
  search,
  setSearch,
  category,
  setCategory,
  onAddProduct,
}) {

const [categories, setCategories] = useState([]);

useEffect(() => {
  fetchCategories();
}, []);

const fetchCategories = async () => {
  try {
    const data = await getCategories();
    setCategories(data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">

      <div className="flex flex-col lg:flex-row gap-4 justify-between">

        {/* Search */}

        <div className="relative w-full lg:max-w-md">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
                <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

        </div>

        {/* Right Side */}

        <div className="flex flex-col sm:flex-row gap-3">

            <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3"
            >
            <option value="">All Categories</option>

            {categories.map((item) => (
                <option
                key={item.id}
                value={item.id}
                >
                {item.name}
                </option>
            ))}
            </select>

          <button
                onClick={onAddProduct}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition"
                >
                <Plus size={18} />
                Add Product
                </button>

        </div>

      </div>

    </div>
  );
}

export default ProductToolbar;