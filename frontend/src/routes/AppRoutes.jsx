import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import Customers from "../pages/customers/Customers";
import Products from "../pages/products/Products";
import Invoices from "../pages/invoices/Invoices";
import Reports from "../pages/reports/Reports";
import Settings from "../pages/settings/Settings";
import CreateInvoice from "../pages/invoices/CreateInvoice";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Auth Routes */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Main Routes */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/customers"
          element={<Customers />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/invoices"
          element={<Invoices />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/create-invoice"
          element={<CreateInvoice />}
        />

        <Route
          path="/edit-invoice/:invoiceNo"
          element={<CreateInvoice />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;