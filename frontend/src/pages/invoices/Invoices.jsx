import { useState, useEffect } from "react";

import MainLayout from "../../components/layout/MainLayout";
import InvoiceTable from "./InvoiceTable";
import InvoiceViewModal from "./InvoiceViewModal";

import {
  getInvoicesFromStorage,
  deleteInvoiceFromStorage,
} from "../../utils/invoiceStorage";

import {
  getProductsFromStorage,
  saveProductsToStorage,
} from "../../utils/productStorage";

import { useNavigate } from "react-router-dom";

function Invoices() {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [invoices, setInvoices] =
    useState([]);

  const [selectedInvoice, setSelectedInvoice] =
    useState(null);

  const [openViewModal, setOpenViewModal] =
    useState(false);

  const navigate =
    useNavigate();

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    const storedInvoices =
      getInvoicesFromStorage();

    setInvoices(storedInvoices);

    if (selectedInvoice) {
      const refreshedInvoice =
        storedInvoices.find(
          (invoice) =>
            invoice.invoiceNo ===
            selectedInvoice.invoiceNo
        );

      if (refreshedInvoice) {
        setSelectedInvoice(
          refreshedInvoice
        );
      }
    }
  };

  const handleDelete = (
    invoiceNo
  ) => {
    const confirmed =
      window.confirm(
        "Delete this invoice?"
      );

    if (!confirmed) return;

    const invoiceToDelete =
      invoices.find(
        (invoice) =>
          invoice.invoiceNo ===
          invoiceNo
      );

    if (invoiceToDelete) {
      const products =
        getProductsFromStorage();

      const updatedProducts =
        products.map((product) => {
          const soldItem =
            invoiceToDelete.items?.find(
              (item) =>
                item.id ===
                product.id
            );

          if (!soldItem)
            return product;

          return {
            ...product,
            stock:
              product.stock +
              soldItem.quantity,
          };
        });

      saveProductsToStorage(
        updatedProducts
      );
    }

    deleteInvoiceFromStorage(
      invoiceNo
    );

    loadInvoices();

    alert(
      "Invoice deleted and stock restored successfully."
    );
  };

  const handleView = (
    invoice
  ) => {
    setSelectedInvoice(invoice);
    setOpenViewModal(true);
  };

  const handleModalClose =
    () => {
      setOpenViewModal(false);

      loadInvoices();
    };

  const filteredInvoices =
    invoices.filter(
      (invoice) =>
        invoice.customer?.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        invoice.invoiceNo
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  const totalRevenue =
    invoices.reduce(
      (sum, invoice) =>
        sum +
        (invoice.grandTotal || 0),
      0
    );

  const paidInvoices =
    invoices.filter(
      (invoice) =>
        invoice.status === "Paid"
    ).length;

  const partialInvoices =
    invoices.filter(
      (invoice) =>
        invoice.status ===
        "Partial"
    ).length;

  const pendingInvoices =
    invoices.filter(
      (invoice) =>
        invoice.status ===
        "Pending"
    ).length;

  return (
    <MainLayout>
      <div className="space-y-6">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold">
              Invoices
            </h1>

            <p className="text-gray-500">
              Manage all invoices
            </p>
          </div>

          <button
            onClick={() =>
              navigate(
                "/create-invoice"
              )
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Create Invoice
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          <div className="bg-white border rounded-xl p-5">
            <h3 className="text-gray-500">
              Total Invoices
            </h3>

            <p className="text-3xl font-bold">
              {invoices.length}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h3 className="text-gray-500">
              Revenue
            </h3>

            <p className="text-3xl font-bold text-green-600">
              ₹ {totalRevenue.toFixed(2)}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h3 className="text-gray-500">
              Paid
            </h3>

            <p className="text-3xl font-bold text-green-600">
              {paidInvoices}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h3 className="text-gray-500">
              Partial
            </h3>

            <p className="text-3xl font-bold text-blue-600">
              {partialInvoices}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h3 className="text-gray-500">
              Pending
            </h3>

            <p className="text-3xl font-bold text-yellow-600">
              {pendingInvoices}
            </p>
          </div>

        </div>

        <div className="bg-white p-4 rounded-xl border">

          <input
            type="text"
            placeholder="Search invoice..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

        <InvoiceTable
          invoices={filteredInvoices}
          onDelete={handleDelete}
          onView={handleView}
        />

        <InvoiceViewModal
          invoice={selectedInvoice}
          isOpen={openViewModal}
          onClose={
            handleModalClose
          }
          refreshInvoices={
            loadInvoices
          }
        />

      </div>
    </MainLayout>
  );
}

export default Invoices;