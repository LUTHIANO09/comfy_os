import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import StockMovements from "./pages/StockMovements";
import Sales from "./pages/Sales";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/products" element={<Products />} />

        <Route path="/inventory" element={<Inventory />} />

        <Route path="/stock-movements" element={<StockMovements />} />

        <Route path="/sales" element={<Sales />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;