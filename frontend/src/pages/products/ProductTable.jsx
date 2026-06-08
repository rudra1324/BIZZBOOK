function ProductTable({
  products = [],
  onDelete,
  onEdit,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">

      <div className="px-8 py-6 border-b bg-slate-50">

        <h2 className="text-2xl font-bold text-slate-800">
          Inventory Items
        </h2>

        <p className="text-slate-500 mt-1">
          Manage products, stock and pricing
        </p>

      </div>

      <div className="p-6">

        <div className="overflow-x-auto rounded-2xl border border-slate-200">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-6 py-5 text-left">
                  Product
                </th>

                <th className="px-6 py-5 text-left">
                  HSN
                </th>

                <th className="px-6 py-5 text-left">
                  GST
                </th>

                <th className="px-6 py-5 text-left">
                  Stock
                </th>

                <th className="px-6 py-5 text-left">
                  Price
                </th>

                <th className="px-6 py-5 text-left">
                  Status
                </th>

                <th className="px-6 py-5 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {products.length === 0 ? (
                <tr>

                  <td
                    colSpan="7"
                    className="py-20 text-center text-slate-400"
                  >
                    No Products Found
                  </td>

                </tr>
              ) : (
                products.map(
                  (product) => (
                    <tr
                      key={product.id}
                      className="border-t hover:bg-slate-50 transition-all"
                    >

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-4">

                          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
                            {product.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <div>

                            <p className="font-semibold text-slate-800">
                              {product.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              Product Item
                            </p>

                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {product.hsn || "-"}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {product.gst || 18}%
                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`font-semibold ${
                            product.stock <= 5
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {product.stock}
                        </span>

                      </td>

                      <td className="px-6 py-5 font-semibold text-slate-800">
                        ₹ {product.price}
                      </td>

                      <td className="px-6 py-5">

                        {product.stock <= 5 ? (
                          <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                            Low Stock
                          </span>
                        ) : (
                          <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                            In Stock
                          </span>
                        )}

                      </td>

                      <td className="px-6 py-5">

                        <div className="flex justify-center gap-3">

                          <button
                            onClick={() =>
                              onEdit?.(
                                product
                              )
                            }
                            className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700 font-medium hover:bg-blue-200"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              onDelete?.(
                                product.id
                              )
                            }
                            className="px-4 py-2 rounded-xl bg-red-100 text-red-700 font-medium hover:bg-red-200"
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

    </div>
  );
}

export default ProductTable;