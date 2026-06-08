import {
  useState,
  useEffect,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";
import InvoiceHeader from "./InvoiceHeader";
import PartySection from "./PartySection";
import ItemTable from "./ItemTable";
import InvoiceSummary from "./InvoiceSummary";

import {
  saveInvoiceToStorage,
  getInvoiceByNumber,
  updateInvoiceInStorage,
} from "../../utils/invoiceStorage";

import {
  getProductsFromStorage,
  saveProductsToStorage,
} from "../../utils/productStorage";

function CreateInvoice() {
  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [invoiceItems, setInvoiceItems] =
    useState([]);

  const [paymentStatus, setPaymentStatus] =
    useState("Pending");

  const [notes, setNotes] =
    useState("");

  const { invoiceNo } =
    useParams();

  const navigate =
    useNavigate();

  const isEditMode =
    Boolean(invoiceNo);

  useEffect(() => {
    if (!invoiceNo) return;

    const invoice =
      getInvoiceByNumber(
        invoiceNo
      );

    if (!invoice) return;

    setSelectedCustomer(
      invoice.customer
    );

    setInvoiceItems(
      invoice.items || []
    );

    setPaymentStatus(
      invoice.status ||
        "Pending"
    );

    setNotes(
      invoice.notes || ""
    );
  }, [invoiceNo]);

  const generateInvoiceNumber =
    () => {
      const number =
        Date.now()
          .toString()
          .slice(-6);

      return `INV-${number}`;
    };

  const saveInvoice = () => {
    if (!selectedCustomer) {
      alert(
        "Please select a customer"
      );
      return;
    }

    if (
      invoiceItems.length === 0
    ) {
      alert(
        "Please add at least one item"
      );
      return;
    }

    const products =
      getProductsFromStorage();

    for (const item of invoiceItems) {
      const product =
        products.find(
          (p) =>
            p.id === item.id
        );

      if (!product) {
        alert(
          `${item.name} not found in inventory`
        );
        return;
      }

      if (
        item.quantity >
        product.stock
      ) {
        alert(
          `Insufficient stock for ${item.name}\nAvailable: ${product.stock}\nRequested: ${item.quantity}`
        );

        return;
      }
    }

    const subtotal =
      invoiceItems.reduce(
        (total, item) =>
          total +
          item.quantity *
            item.price,
        0
      );

    const gst =
      invoiceItems.reduce(
        (total, item) =>
          total +
          (item.quantity *
            item.price *
            (item.gst ||
              18)) /
            100,
        0
      );

    const invoice = {
      invoiceNo:
        isEditMode
          ? invoiceNo
          : generateInvoiceNumber(),

      customer:
        selectedCustomer,

      items: invoiceItems,

      subtotal,

      gst,

      grandTotal:
        subtotal + gst,

      status:
        paymentStatus,

      notes,

      createdAt:
        isEditMode
          ? getInvoiceByNumber(
              invoiceNo
            )?.createdAt
          : new Date(),
    };

    if (isEditMode) {
      updateInvoiceInStorage(
        invoice
      );
    } else {
      saveInvoiceToStorage(
        invoice
      );

      const updatedProducts =
        products.map(
          (product) => {
            const soldItem =
              invoiceItems.find(
                (item) =>
                  item.id ===
                  product.id
              );

            if (!soldItem)
              return product;

            return {
              ...product,
              stock:
                Math.max(
                  0,
                  product.stock -
                    soldItem.quantity
                ),
            };
          }
        );

      saveProductsToStorage(
        updatedProducts
      );
    }

    setInvoiceItems([]);

    setSelectedCustomer(
      null
    );

    setPaymentStatus(
      "Pending"
    );

    setNotes("");

    alert(
      isEditMode
        ? "Invoice Updated Successfully"
        : "Invoice Saved Successfully"
    );

    navigate("/invoices");
  };

  return (
    <MainLayout>

      <div className="space-y-6">

        <div className="bg-white rounded-xl border shadow-sm p-5">

          <InvoiceHeader
            onSave={
              saveInvoice
            }
            isEditMode={
              isEditMode
            }
          />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl border shadow-sm p-5">

            <PartySection
              selectedCustomer={
                selectedCustomer
              }
              setSelectedCustomer={
                setSelectedCustomer
              }
            />

          </div>

          <div className="bg-white rounded-xl border shadow-sm p-5">

            <h2 className="text-xl font-semibold mb-4">
              Invoice Information
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <div>

                <label className="block text-sm text-gray-500 mb-1">
                  Invoice Number
                </label>

                <input
                  className="w-full border rounded-lg p-3"
                  value={
                    isEditMode
                      ? invoiceNo
                      : "Auto Generated"
                  }
                  readOnly
                />

              </div>

              <div>

                <label className="block text-sm text-gray-500 mb-1">
                  Payment Status
                </label>

                <select
                  value={
                    paymentStatus
                  }
                  onChange={(
                    e
                  ) =>
                    setPaymentStatus(
                      e.target
                        .value
                    )
                  }
                  className="w-full border rounded-lg p-3"
                >

                  <option>
                    Pending
                  </option>

                  <option>
                    Paid
                  </option>

                  <option>
                    Partial
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-xl border shadow-sm p-5">

          <ItemTable
            invoiceItems={
              invoiceItems
            }
            setInvoiceItems={
              setInvoiceItems
            }
          />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl border shadow-sm p-5">

            <h2 className="text-xl font-semibold mb-4">
              Notes & Terms
            </h2>

            <textarea
              rows="6"
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target
                    .value
                )
              }
              placeholder="Enter notes or terms..."
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div className="bg-white rounded-xl border shadow-sm p-5">

            <InvoiceSummary
              invoiceItems={
                invoiceItems
              }
            />

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default CreateInvoice;