import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import ProductToolbar from "../components/ProductToolbar";
import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";
import { getProducts, deleteProduct } from "../services/productService";



function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (product) => {
  setSelectedProduct(product);
  setOpenModal(true);
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    await deleteProduct(id);

    // Refresh the table
    fetchProducts();

    alert("Product deleted successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to delete product.");
  }

};

const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    category === "" || product.category === Number(category);

  return matchesSearch && matchesCategory;
});

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your inventory products.
        </p>
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
            onDelete={handleDelete}
            onEdit={handleEdit}
            />

                <AddProductModal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setSelectedProduct(null);
                }}
                onSuccess={fetchProducts}
                product={selectedProduct}
                />
    </DashboardLayout>
  );
}

export default Products;