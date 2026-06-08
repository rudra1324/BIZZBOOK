import {
  generateInvoicePDF,
} from "../../utils/pdfGenerator";

import {
  useNavigate,
} from "react-router-dom";

import {
  updateInvoiceInStorage,
} from "../../utils/invoiceStorage";

function InvoiceViewModal({
  invoice,
  isOpen,
  onClose,
}) {
  const navigate =
    useNavigate();

  if (!isOpen || !invoice)
    return null;

  const paidAmount =
    invoice.paidAmount || 0;

  const dueAmount =
    invoice.dueAmount ??
    invoice.grandTotal -
      paidAmount;

  const collectPayment =
    () => {
      const amount =
        Number(
          prompt(
            "Enter Payment Amount"
          )
        );

      if (
        !amount ||
        amount <= 0
      )
        return;

      if (
        amount > dueAmount
      ) {
        alert(
          "Amount exceeds due balance"
        );
        return;
      }

      const updatedInvoice =
        {
          ...invoice,

          paidAmount:
            paidAmount +
            amount,

          dueAmount:
            dueAmount -
            amount,

          payments: [
            ...(invoice.payments ||
              []),

            {
              amount,

              date:
                new Date().toLocaleString(),
            },
          ],
        };

      if (
        updatedInvoice.dueAmount ===
        0
      ) {
        updatedInvoice.status =
          "Paid";
      } else if (
        updatedInvoice
          .paidAmount > 0
      ) {
        updatedInvoice.status =
          "Partial";
      } else {
        updatedInvoice.status =
          "Pending";
      }

      updateInvoiceInStorage(
        updatedInvoice
      );

      alert(
        "Payment Added Successfully"
      );

      window.location.reload();
    };

  const getStatusBadge =
    (status) => {
      switch (status) {
        case "Paid":
          return (
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              Paid
            </span>
          );

        case "Partial":
          return (
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              Partial
            </span>
          );

        default:
          return (
            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
              Pending
            </span>
          );
      }
    };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-[950px] max-h-[90vh] overflow-y-auto p-6 shadow-lg">

        <div className="flex justify-between items-center flex-wrap gap-4 mb-6 border-b pb-4">

          <div>
            <h2 className="text-2xl font-bold">
              {invoice.invoiceNo}
            </h2>

            <p className="text-gray-500">
              {new Date(
                invoice.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

          <div>
            {getStatusBadge(
              invoice.status
            )}
          </div>

        </div>

        <div className="flex gap-3 mb-6 flex-wrap">

          <button
            onClick={() =>
              generateInvoicePDF(
                invoice
              )
            }
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Download PDF
          </button>

          <button
            onClick={() =>
              window.print()
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Print
          </button>

          <button
            onClick={() =>
              navigate(
                `/edit-invoice/${invoice.invoiceNo}`
              )
            }
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Edit Invoice
          </button>

          <button
            onClick={() =>
              navigate(
                `/create-invoice?duplicate=${invoice.invoiceNo}`
              )
            }
            className="bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            Duplicate Invoice
          </button>

          {dueAmount > 0 && (
            <button
              onClick={
                collectPayment
              }
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
            >
              Collect Payment
            </button>
          )}

          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

        <div className="bg-gray-50 border rounded-xl p-4 mb-6">

          <h3 className="font-semibold text-lg mb-2">
            Customer Details
          </h3>

          <p>
            <strong>Name:</strong>{" "}
            {invoice.customer?.name}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {invoice.customer?.phone}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {invoice.customer?.email ||
              "-"}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {invoice.customer?.address ||
              "-"}
          </p>

        </div>

        <table className="w-full border rounded-xl overflow-hidden">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">
                Product
              </th>

              <th className="p-3 text-left">
                Qty
              </th>

              <th className="p-3 text-left">
                Price
              </th>

              <th className="p-3 text-left">
                GST
              </th>

              <th className="p-3 text-left">
                Total
              </th>
            </tr>
          </thead>

          <tbody>

            {invoice.items?.map(
              (item) => {
                const taxable =
                  item.quantity *
                  item.price;

                const gstAmount =
                  taxable *
                  ((item.gst || 18) /
                    100);

                return (
                  <tr
                    key={item.id}
                    className="border-t"
                  >
                    <td className="p-3">
                      {item.name}
                    </td>

                    <td className="p-3">
                      {item.quantity}
                    </td>

                    <td className="p-3">
                      ₹ {item.price}
                    </td>

                    <td className="p-3">
                      ₹{" "}
                      {gstAmount.toFixed(
                        2
                      )}
                    </td>

                    <td className="p-3 font-medium">
                      ₹{" "}
                      {(
                        taxable +
                        gstAmount
                      ).toFixed(2)}
                    </td>
                  </tr>
                );
              }
            )}

          </tbody>

        </table>

        {invoice.notes && (
          <div className="mt-6 bg-yellow-50 border rounded-xl p-4">

            <h3 className="font-semibold mb-2">
              Notes
            </h3>

            <p>
              {invoice.notes}
            </p>

          </div>
        )}

        {invoice.payments?.length >
          0 && (
          <div className="mt-6">

            <h3 className="text-lg font-semibold mb-3">
              Payment History
            </h3>

            <div className="border rounded-xl overflow-hidden">

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="p-3 text-left">
                      Date
                    </th>

                    <th className="p-3 text-left">
                      Amount
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {invoice.payments.map(
                    (
                      payment,
                      index
                    ) => (
                      <tr
                        key={index}
                        className="border-t"
                      >

                        <td className="p-3">
                          {
                            payment.date
                          }
                        </td>

                        <td className="p-3 text-green-600 font-medium">
                          ₹{" "}
                          {
                            payment.amount
                          }
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>
        )}

        <div className="mt-6 flex justify-end">

          <div className="w-[350px] bg-gray-50 border rounded-xl p-4">

            <div className="flex justify-between mb-2">
              <span>
                Subtotal
              </span>

              <span>
                ₹{" "}
                {invoice.subtotal?.toFixed(
                  2
                )}
              </span>
            </div>

            <div className="flex justify-between mb-2">
              <span>GST</span>

              <span>
                ₹{" "}
                {invoice.gst?.toFixed(
                  2
                )}
              </span>
            </div>

            <div className="flex justify-between mb-2 text-blue-600">
              <span>
                Paid Amount
              </span>

              <span>
                ₹{" "}
                {paidAmount.toFixed(
                  2
                )}
              </span>
            </div>

            <div className="flex justify-between mb-2 text-red-600">
              <span>
                Due Amount
              </span>

              <span>
                ₹{" "}
                {dueAmount.toFixed(
                  2
                )}
              </span>
            </div>

            <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">

              <span>
                Grand Total
              </span>

              <span className="text-green-600">
                ₹{" "}
                {invoice.grandTotal?.toFixed(
                  2
                )}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default InvoiceViewModal;