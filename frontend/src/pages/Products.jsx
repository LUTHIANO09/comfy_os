import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../layouts/DashboardLayout";
import ProductToolbar from "../components/ProductToolbar";
import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ConfirmModal from "../components/ui/ConfirmModal";


import {
  getProducts,
  deleteProduct,
} from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

const [confirmOpen, setConfirmOpen] = useState(false);
const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

const handleDelete = (product) => {
  setProductToDelete(product);
  setConfirmOpen(true);
};

const confirmDelete = async () => {
  if (!productToDelete) return;

  try {
    const response = await deleteProduct(productToDelete.id);

    await fetchProducts();

    toast.success(response.message);

    setConfirmOpen(false);
    setProductToDelete(null);

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to delete product."
    );
  }
};

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "" ||
      product.category === Number(category);

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner text="Loading products..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

          <div>

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
                  Inventory
              </p>

              <h1 className="mt-2 text-4xl font-bold text-slate-900">
                  Product Management
              </h1>

              <p className="mt-3 text-slate-500">
                  Manage your inventory, pricing, stock and product catalogue.
              </p>

          </div>

          <div className="rounded-2xl border bg-white px-6 py-5 shadow-sm">

              <p className="text-sm text-slate-500">
                  Total Products
              </p>

              <h2 className="mt-2 text-4xl font-bold text-blue-600">
                  {products.length}
              </h2>

          </div>

      </div>

      <ProductToolbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        onAddProduct={() => setOpenModal(true)}
      />

      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddProductModal
        open={openModal}
        product={selectedProduct}
        onSuccess={fetchProducts}
        onClose={() => {
          setOpenModal(false);
          setSelectedProduct(null);
        }}
      />

        <ConfirmModal
              open={confirmOpen}
              title="Delete Product"
              message="Are you sure you want to delete this product? If it has sales history, it will be archived instead."
              confirmText="Delete"
              cancelText="Cancel"
              onConfirm={confirmDelete}
              onCancel={() => {
                setConfirmOpen(false);
                setProductToDelete(null);
              }}
            />

    </DashboardLayout>
  );
}

export default Products;