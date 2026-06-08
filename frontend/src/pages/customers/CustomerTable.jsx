function CustomerTable({
  customers = [],
  onDelete,
  onEdit,
  onLedger,
}) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

      <div className="p-5 border-b">

        <h2 className="text-xl font-bold text-slate-800">
          Customer Directory
        </h2>

        <p className="text-sm text-slate-500">
          View and manage all customers
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Address
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {customers.length === 0 ? (
              <tr>

                <td
                  colSpan="5"
                  className="text-center py-16 text-gray-400"
                >
                  No Customers Found
                </td>

              </tr>
            ) : (
              customers.map(
                (customer) => (
                  <tr
                    key={customer.id}
                    className="border-t hover:bg-slate-50 transition"
                  >

                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">

                          {customer.name
                            ?.charAt(0)
                            ?.toUpperCase()}

                        </div>

                        <div>

                          <p className="font-semibold text-slate-800">
                            {customer.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            Customer
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="p-4 text-slate-600">
                      {customer.phone}
                    </td>

                    <td className="p-4 text-slate-600">
                      {customer.email ||
                        "-"}
                    </td>

                    <td className="p-4 text-slate-600 max-w-xs truncate">
                      {customer.address ||
                        "-"}
                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-2 flex-wrap">

                        <button
                          onClick={() =>
                            onEdit?.(
                              customer
                            )
                          }
                          className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            onLedger?.(
                              customer
                            )
                          }
                          className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200"
                        >
                          Ledger
                        </button>

                        <button
                          onClick={() =>
                            onDelete?.(
                              customer.id
                            )
                          }
                          className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CustomerTable;