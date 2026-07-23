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
import Employees from "./pages/Employees";
import Users from "./pages/Users";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";
import Staff from "./pages/Staff";
import Settings from "./pages/Settings";
import "react-toastify/dist/ReactToastify.css";
import ReturnsHistory from "./pages/ReturnsHistory";
import Payroll from "./pages/Payroll";
import AuditLogs from "./pages/AuditLogs";
import Landing from "./pages/Landing";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

                    <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />

            <Route
              path="/inventory"
              element={
                <ProtectedRoute>
                  <Inventory />
                </ProtectedRoute>
              }
            />

            <Route
              path="/stock-movements"
              element={
                <ProtectedRoute>
                  <StockMovements />
                </ProtectedRoute>
              }
            />

            <Route
              path="/sales"
              element={
                <ProtectedRoute>
                  <Sales />
                </ProtectedRoute>
              }
            />

            <Route
              path="/sales-history"
              element={
                <ProtectedRoute>
                  <SalesHistory />
                </ProtectedRoute>
              }
            />

            <Route
              path="/suppliers"
              element={
                <ProtectedRoute>
                  <Suppliers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employees"
              element={
                <ProtectedRoute>
                  <Employees />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />

            <Route
                path="/expenses"
                element={
                  <ProtectedRoute>
                    <Expenses />
                  </ProtectedRoute>
                }
              />

              <Route
                    path="/reports"
                    element={
                      <ProtectedRoute>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/staff"
                    element={
                      <ProtectedRoute>
                        <Staff />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                      path="/settings"
                      element={
                          <ProtectedRoute>
                              <Settings />
                          </ProtectedRoute>
                      }
                  />

                  <Route
                      path="/returns"
                      element={
                          <ProtectedRoute>
                              <ReturnsHistory />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="/payroll"
                      element={
                          <ProtectedRoute>
                              <Payroll />
                          </ProtectedRoute>
                      }
                  />

                  <Route
                      path="/audit"
                      element={
                          <ProtectedRoute>
                              <AuditLogs />
                          </ProtectedRoute>
                      }
                  />
                  


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