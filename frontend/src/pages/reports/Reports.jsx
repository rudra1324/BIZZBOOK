import { useState } from "react";

import MainLayout from "../../components/layout/MainLayout";

import {
  getInvoicesFromStorage,
} from "../../utils/invoiceStorage";

import {
  getExpensesFromStorage,
  saveExpenseToStorage,
} from "../../utils/expenseStorage";

import ExpenseModal from "../../components/reports/ExpenseModal";

function Reports() {
  const invoices =
    getInvoicesFromStorage();

  const expenses =
    getExpensesFromStorage();

  const [openExpenseModal, setOpenExpenseModal] =
    useState(false);

  const totalRevenue =
    invoices.reduce(
      (sum, invoice) =>
        sum +
        (invoice.grandTotal || 0),
      0
    );

  const paidRevenue =
  invoices.reduce(
    (sum, invoice) => {
      if (
        invoice.status === "Paid" &&
        !invoice.paidAmount
      ) {
        return (
          sum +
          invoice.grandTotal
        );
      }

      return (
        sum +
        (invoice.paidAmount || 0)
      );
    },
    0
  );

  const outstandingRevenue =
    invoices.reduce(
      (sum, invoice) =>
        sum +
        (invoice.dueAmount || 0),
      0
    );

  const totalExpenses =
    expenses.reduce(
      (sum, expense) =>
        sum +
        expense.amount,
      0
    );

  const netProfit =
    paidRevenue -
    totalExpenses;

  const totalInvoices =
    invoices.length;

  const paidInvoices =
    invoices.filter(
      (invoice) =>
        invoice.status === "Paid"
    ).length;

  const pendingInvoices =
    invoices.filter(
      (invoice) =>
        invoice.status === "Pending"
    ).length;

  const partialInvoices =
    invoices.filter(
      (invoice) =>
        invoice.status === "Partial"
    ).length;

  const productSales = {};

  invoices.forEach((invoice) => {
    invoice.items?.forEach((item) => {
      if (!productSales[item.name]) {
        productSales[item.name] = 0;
      }

      productSales[item.name] +=
        item.quantity;
    });
  });

  const topProducts =
    Object.entries(productSales)
      .sort(
        (a, b) =>
          b[1] - a[1]
      )
      .slice(0, 5);

  const getStatusBadge = (
    status
  ) => {
    switch (status) {
      case "Paid":
        return (
          <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
            Paid
          </span>
        );

      case "Partial":
        return (
          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
            Partial
          </span>
        );

      default:
        return (
          <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">
            Pending
          </span>
        );
    }
  };

  const handleSaveExpense = (
    expense
  ) => {
    saveExpenseToStorage(
      expense
    );

    window.location.reload();
  };

  return (
    <MainLayout>

      <div className="space-y-6">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold">
              Reports
            </h1>

            <p className="text-gray-500">
              Business performance overview
            </p>

          </div>

          <button
            onClick={() =>
              setOpenExpenseModal(
                true
              )
            }
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Expense
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">

          <div className="bg-white border rounded-xl p-5">

            <h3 className="text-gray-500">
              Total Revenue
            </h3>

            <p className="text-3xl font-bold text-green-600">
              ₹ {totalRevenue.toFixed(2)}
            </p>

          </div>

          <div className="bg-white border rounded-xl p-5">

            <h3 className="text-gray-500">
              Collected Revenue
            </h3>

            <p className="text-3xl font-bold text-green-600">
              ₹ {paidRevenue.toFixed(2)}
            </p>

          </div>

          <div className="bg-white border rounded-xl p-5">

            <h3 className="text-gray-500">
              Outstanding
            </h3>

            <p className="text-3xl font-bold text-yellow-600">
              ₹ {outstandingRevenue.toFixed(2)}
            </p>

          </div>

          <div className="bg-white border rounded-xl p-5">

            <h3 className="text-gray-500">
              Expenses
            </h3>

            <p className="text-3xl font-bold text-red-600">
              ₹ {totalExpenses.toFixed(2)}
            </p>

          </div>

          <div className="bg-white border rounded-xl p-5">

            <h3 className="text-gray-500">
              Net Profit
            </h3>

            <p className="text-3xl font-bold text-blue-600">
              ₹ {netProfit.toFixed(2)}
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

          <div className="bg-white border rounded-xl p-5">
            <h3>Total Invoices</h3>

            <p className="text-3xl font-bold">
              {totalInvoices}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h3>Paid</h3>

            <p className="text-3xl font-bold text-green-600">
              {paidInvoices}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h3>Pending</h3>

            <p className="text-3xl font-bold text-yellow-600">
              {pendingInvoices}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h3>Partial</h3>

            <p className="text-3xl font-bold text-blue-600">
              {partialInvoices}
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white border rounded-xl p-5">

            <h2 className="text-xl font-semibold mb-5">
              Top Selling Products
            </h2>

            {topProducts.length === 0 ? (
              <p>No sales yet</p>
            ) : (
              <div className="space-y-4">

                {topProducts.map(
                  ([name, quantity], index) => (
                    <div
                      key={name}
                      className="flex justify-between border-b pb-3"
                    >
                      <p>
                        #{index + 1} {name}
                      </p>

                      <span className="text-green-600 font-semibold">
                        {quantity} Sold
                      </span>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

          <div className="bg-white border rounded-xl overflow-hidden">

            <div className="p-5 border-b">

              <h2 className="text-xl font-semibold">
                Recent Invoices
              </h2>

            </div>

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-4 text-left">
                    Invoice
                  </th>

                  <th className="p-4 text-left">
                    Customer
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Amount
                  </th>

                </tr>

              </thead>

              <tbody>

                {invoices
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((invoice) => (
                    <tr
                      key={
                        invoice.invoiceNo
                      }
                      className="border-t"
                    >

                      <td className="p-4">
                        {invoice.invoiceNo}
                      </td>

                      <td className="p-4">
                        {invoice.customer?.name}
                      </td>

                      <td className="p-4">
                        {getStatusBadge(
                          invoice.status
                        )}
                      </td>

                      <td className="p-4">
                        ₹{" "}
                        {invoice.grandTotal}
                      </td>

                    </tr>
                  ))}

              </tbody>

            </table>

          </div>

        </div>

        <div className="bg-white border rounded-xl overflow-hidden">

          <div className="p-5 border-b">

            <h2 className="text-xl font-semibold">
              Expenses
            </h2>

          </div>

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

                <th className="p-4 text-left">
                  Amount
                </th>

                <th className="p-4 text-left">
                  Notes
                </th>

              </tr>

            </thead>

            <tbody>

              {expenses.map(
                (expense) => (
                  <tr
                    key={expense.id}
                    className="border-t"
                  >

                    <td className="p-4">
                      {expense.category}
                    </td>

                    <td className="p-4">
                      {expense.date}
                    </td>

                    <td className="p-4 text-red-600 font-semibold">
                      ₹ {expense.amount}
                    </td>

                    <td className="p-4">
                      {expense.notes}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      <ExpenseModal
        isOpen={openExpenseModal}
        onClose={() =>
          setOpenExpenseModal(
            false
          )
        }
        onSave={
          handleSaveExpense
        }
      />

    </MainLayout>
  );
}

export default Reports;