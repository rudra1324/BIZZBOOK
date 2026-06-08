function InvoiceTable({
  invoices = [],
  onDelete,
  onView,
  onEdit,
}) {
  const getStatusBadge = (
    status
  ) => {
    switch (status) {
      case "Paid":
        return (
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
            Paid
          </span>
        );

      case "Partial":
        return (
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
            Partial
          </span>
        );

      default:
        return (
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

      <div className="px-8 py-6 border-b">

        <h2 className="text-xl font-bold text-slate-800">
          Invoice Records
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          View and manage all invoices
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-50">

              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-600">
                Invoice No
              </th>

              <th className="px-8 py-5 text-left text-sm font-semibold text-slate-600">
                Customer
              </th>

              <th className="px-8 py-5 text-center text-sm font-semibold text-slate-600">
                Items
              </th>

              <th className="px-8 py-5 text-center text-sm font-semibold text-slate-600">
                Date
              </th>

              <th className="px-8 py-5 text-right text-sm font-semibold text-slate-600">
                Amount
              </th>

              <th className="px-8 py-5 text-center text-sm font-semibold text-slate-600">
                Status
              </th>

              <th className="px-8 py-5 text-center text-sm font-semibold text-slate-600">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {invoices.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="py-20 text-center"
                >

                  <h3 className="text-lg font-semibold text-slate-700">
                    No Invoices Found
                  </h3>

                  <p className="text-slate-500 mt-2">
                    Create your first invoice to start billing.
                  </p>

                </td>

              </tr>

            ) : (

              invoices.map((invoice) => (

                <tr
                  key={invoice.invoiceNo}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="px-8 py-5 font-semibold text-indigo-600">
                    {invoice.invoiceNo}
                  </td>

                  <td className="px-8 py-5">
                    {invoice.customer?.name}
                  </td>

                  <td className="px-8 py-5 text-center">
                    {invoice.items?.length || 0}
                  </td>

                  <td className="px-8 py-5 text-center text-slate-500">
                    {new Date(
                      invoice.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-8 py-5 text-right font-bold text-green-600">
                    ₹{" "}
                    {invoice.grandTotal?.toFixed(
                      2
                    )}
                  </td>

                  <td className="px-8 py-5 text-center">
                    {getStatusBadge(
                      invoice.status
                    )}
                  </td>

                  <td className="px-8 py-5">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          onView?.(
                            invoice
                          )
                        }
                        className="px-3 py-2 rounded-xl bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          onEdit?.(
                            invoice.invoiceNo
                          )
                        }
                        className="px-3 py-2 rounded-xl bg-indigo-50 text-indigo-600 text-sm font-medium hover:bg-indigo-100 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          onDelete?.(
                            invoice.invoiceNo
                          )
                        }
                        className="px-3 py-2 rounded-xl bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default InvoiceTable;