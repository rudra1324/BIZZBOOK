import { useEffect, useState } from "react";

import MainLayout from "../../components/layout/MainLayout";
import StatCard from "../../components/dashboard/StatCard";
import TransactionTable from "../../components/dashboard/TransactionTable";
import SalesChart from "../../components/dashboard/SalesChart";

import {
  getInvoicesFromStorage,
} from "../../utils/invoiceStorage";

import {
  getProductsFromStorage,
} from "../../utils/productStorage";

function Dashboard() {
  const [totalInvoices, setTotalInvoices] =
    useState(0);

  const [totalRevenue, setTotalRevenue] =
    useState(0);

  const [totalProducts, setTotalProducts] =
    useState(0);

  const [lowStockCount, setLowStockCount] =
    useState(0);

  const [paidInvoices, setPaidInvoices] =
    useState(0);

  const [pendingInvoices, setPendingInvoices] =
    useState(0);

  useEffect(() => {
    const invoices =
      getInvoicesFromStorage();

    const products =
      getProductsFromStorage();

    const revenue =
      invoices.reduce(
        (sum, invoice) =>
          sum +
          (invoice.grandTotal || 0),
        0
      );

    setTotalInvoices(
      invoices.length
    );

    setTotalRevenue(revenue);

    setTotalProducts(
      products.length
    );

    setLowStockCount(
      products.filter(
        (product) =>
          product.stock <= 5
      ).length
    );

    setPaidInvoices(
      invoices.filter(
        (invoice) =>
          invoice.status === "Paid"
      ).length
    );

    setPendingInvoices(
      invoices.filter(
        (invoice) =>
          invoice.status === "Pending"
      ).length
    );
  }, []);

  return (
    <MainLayout>

      <div className="space-y-8">

        {/* Hero Section */}

        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 rounded-3xl p-10 text-white shadow-lg">

          <h1 className="text-4xl font-bold mb-3">
            Welcome Back 👋
          </h1>

          <p className="text-lg text-indigo-100">
            Track revenue, invoices,
            inventory and customer
            activity from one place.
          </p>

        </div>

        {/* KPI Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <StatCard
            title="Total Revenue"
            amount={totalRevenue.toLocaleString()}
            bgColor="bg-green-50"
          />

          <StatCard
            title="Invoices"
            amount={totalInvoices}
            bgColor="bg-blue-50"
          />

          <StatCard
            title="Products"
            amount={totalProducts}
            bgColor="bg-purple-50"
          />

          <StatCard
            title="Paid"
            amount={paidInvoices}
            bgColor="bg-emerald-50"
          />

          <StatCard
            title="Pending"
            amount={pendingInvoices}
            bgColor="bg-yellow-50"
          />

          <StatCard
            title="Low Stock"
            amount={lowStockCount}
            bgColor="bg-red-50"
          />

        </div>

        {/* Alert */}

        {lowStockCount > 0 && (
          <div className="bg-red-50 rounded-2xl p-5 shadow-sm">

            <h3 className="font-bold text-red-600 mb-1">
              ⚠ Low Stock Alert
            </h3>

            <p className="text-red-500">
              {lowStockCount}
              {" "}
              product(s) need
              restocking.
            </p>

          </div>
        )}

        {/* Transactions + Summary */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="xl:col-span-2">
            <TransactionTable />
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <h3 className="text-xl font-bold mb-6">
              Business Summary
            </h3>

            <div className="space-y-5">

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Revenue
                </span>

                <span className="font-bold">
                  ₹ {totalRevenue.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Invoices
                </span>

                <span className="font-bold">
                  {totalInvoices}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Paid
                </span>

                <span className="font-bold text-green-600">
                  {paidInvoices}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Pending
                </span>

                <span className="font-bold text-yellow-600">
                  {pendingInvoices}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Products
                </span>

                <span className="font-bold">
                  {totalProducts}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Low Stock
                </span>

                <span className="font-bold text-red-600">
                  {lowStockCount}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Chart */}

        <SalesChart />

      </div>

    </MainLayout>
  );
}

export default Dashboard;