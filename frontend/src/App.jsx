import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import StockMovements from "./pages/StockMovements";
import Sales from "./pages/Sales";
import SalesHistory from "./pages/SalesHistory";
import { ToastContainer } from "react-toastify";
import Suppliers from "./pages/Suppliers";
import Customers from "./pages/Customers";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/products" element={<Products />} />

        <Route path="/inventory" element={<Inventory />} />

        <Route path="/stock-movements" element={<StockMovements />} />

        <Route path="/sales" element={<Sales />} />

        <Route path="/sales-history" element={<SalesHistory />} />

        <Route path="/suppliers" element={<Suppliers />} />

        <Route path="/customers"  element={<Customers />} />

      </Routes>

       <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
              theme="light"
            />

    </BrowserRouter>
  );
}

export default App;