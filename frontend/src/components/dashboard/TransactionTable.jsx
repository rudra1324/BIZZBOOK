import { getInvoicesFromStorage } from "../../utils/invoiceStorage";

const TransactionTable = () => {
  const invoices =
    getInvoicesFromStorage()
      .slice()
      .reverse()
      .slice(0, 8);

  const getStatusColor = (
    status
  ) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";

      case "Partial":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 mt3">

      {/* Header */}

      <div className="mb-8">

        <h3 className="text-2xl font-bold text-slate-800">
          Recent Transactions
        </h3>

        <p className="text-slate-500 mt-1">
          Latest invoice activity
        </p>

      </div>

      {invoices.length === 0 ? (

        <div className="py-16 text-center text-slate-400">
          No invoices available
        </div>

      ) : (

        <div className="space-y-4">

          {invoices.map(
            (invoice) => (
              <div
                key={
                  invoice.invoiceNo
                }
                className="bg-slate-50 rounded-2xl p-5 hover:bg-slate-100 transition"
              >

                <div className="flex items-center justify-between">

                  {/* Left */}

                  <div>

                    <h4 className="font-bold text-indigo-600">
                      {
                        invoice.invoiceNo
                      }
                    </h4>

                    <p className="text-sm text-slate-500 mt-1">
                      {
                        invoice.customer
                          ?.name
                      }
                    </p>

                  </div>

                  {/* Middle */}

                  <div className="text-center">

                    <p className="text-sm text-slate-500">
                      Date
                    </p>

                    <p className="font-medium">
                      {new Date(
                        invoice.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  {/* Status */}

                  <div>

                    <span
                      className={`px-4 py-2 rounded-full text-xs font-semibold ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {
                        invoice.status
                      }
                    </span>

                  </div>

                  {/* Amount */}

                  <div className="text-right">

                    <p className="text-sm text-slate-500">
                      Amount
                    </p>

                    <p className="text-lg font-bold text-green-600">
                      ₹
                      {invoice.grandTotal?.toLocaleString()}
                    </p>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      )}

    </div>
  );
};

export default TransactionTable;