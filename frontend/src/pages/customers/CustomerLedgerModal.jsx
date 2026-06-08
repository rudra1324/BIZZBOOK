import {
  FaTimes,
  FaUser,
  FaFileInvoiceDollar,
  FaRupeeSign,
} from "react-icons/fa";

import { getInvoicesFromStorage }
  from "../../utils/invoiceStorage";

function CustomerLedgerModal({
  isOpen,
  onClose,
  customer,
}) {
  if (!isOpen || !customer)
    return null;

  const invoices =
    getInvoicesFromStorage();

  const customerInvoices =
    invoices.filter(
      (invoice) =>
        invoice.customer?.id ===
        customer.id
    );

  const totalBusiness =
    customerInvoices.reduce(
      (sum, invoice) =>
        sum +
        (invoice.grandTotal || 0),
      0
    );

  const paidInvoices =
    customerInvoices.filter(
      (invoice) =>
        invoice.status === "Paid"
    ).length;

  const pendingInvoices =
    customerInvoices.filter(
      (invoice) =>
        invoice.status !== "Paid"
    ).length;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="px-8 py-6 border-b flex justify-between items-center">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">

              <FaUser
                className="text-indigo-600 text-xl"
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-800">
                Customer Ledger
              </h2>

              <p className="text-slate-500">
                Complete transaction history
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
          >
            <FaTimes />
          </button>

        </div>

        <div className="p-8">

          {/* Customer Card */}

          <div className="bg-slate-50 rounded-2xl p-6 mb-6">

            <h3 className="text-xl font-bold text-slate-800">
              {customer.name}
            </h3>

            <p className="text-slate-500 mt-2">
              {customer.phone}
            </p>

            {customer.email && (
              <p className="text-slate-500">
                {customer.email}
              </p>
            )}

          </div>

          {/* Stats */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

            <div className="bg-blue-50 rounded-2xl p-5">

              <div className="flex items-center gap-3 mb-3">

                <FaFileInvoiceDollar className="text-blue-600" />

                <span className="text-sm text-slate-600">
                  Invoices
                </span>

              </div>

              <h3 className="text-3xl font-bold">
                {customerInvoices.length}
              </h3>

            </div>

            <div className="bg-green-50 rounded-2xl p-5">

              <div className="flex items-center gap-3 mb-3">

                <FaRupeeSign className="text-green-600" />

                <span className="text-sm text-slate-600">
                  Revenue
                </span>

              </div>

              <h3 className="text-2xl font-bold">
                ₹ {totalBusiness.toFixed(0)}
              </h3>

            </div>

            <div className="bg-emerald-50 rounded-2xl p-5">

              <p className="text-sm text-slate-600 mb-2">
                Paid
              </p>

              <h3 className="text-3xl font-bold text-green-600">
                {paidInvoices}
              </h3>

            </div>

            <div className="bg-yellow-50 rounded-2xl p-5">

              <p className="text-sm text-slate-600 mb-2">
                Pending
              </p>

              <h3 className="text-3xl font-bold text-yellow-600">
                {pendingInvoices}
              </h3>

            </div>

          </div>

          {/* Invoice Table */}

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

            <div className="px-6 py-4 border-b">

              <h3 className="font-semibold text-lg">
                Invoice History
              </h3>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="px-6 py-4 text-left">
                      Invoice
                    </th>

                    <th className="px-6 py-4 text-left">
                      Date
                    </th>

                    <th className="px-6 py-4 text-left">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right">
                      Amount
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {customerInvoices.length === 0 ? (

                    <tr>

                      <td
                        colSpan="4"
                        className="text-center py-12 text-slate-400"
                      >
                        No invoice history found
                      </td>

                    </tr>

                  ) : (

                    customerInvoices.map(
                      (invoice) => (
                        <tr
                          key={invoice.invoiceNo}
                          className="border-t hover:bg-slate-50"
                        >

                          <td className="px-6 py-4 font-semibold text-indigo-600">
                            {invoice.invoiceNo}
                          </td>

                          <td className="px-6 py-4">
                            {new Date(
                              invoice.createdAt
                            ).toLocaleDateString()}
                          </td>

                          <td className="px-6 py-4">

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                invoice.status ===
                                "Paid"
                                  ? "bg-green-100 text-green-700"
                                  : invoice.status ===
                                    "Partial"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {invoice.status}
                            </span>

                          </td>

                          <td className="px-6 py-4 text-right font-semibold text-green-600">
                            ₹
                            {invoice.grandTotal?.toFixed(
                              2
                            )}
                          </td>

                        </tr>
                      )
                    )

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CustomerLedgerModal;