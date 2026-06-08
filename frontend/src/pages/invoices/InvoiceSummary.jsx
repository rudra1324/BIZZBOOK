function InvoiceSummary({
  invoiceItems,
}) {
  const subtotal =
    invoiceItems.reduce(
      (total, item) =>
        total +
        item.quantity *
          item.price,
      0
    );

  const gstTotal =
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

  const totalQty =
    invoiceItems.reduce(
      (total, item) =>
        total +
        item.quantity,
      0
    );

  const discount = 0;

  const roundOff = 0;

  const grandTotal =
    subtotal +
    gstTotal -
    discount +
    roundOff;

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <h2 className="text-2xl font-bold text-slate-800">
          Invoice Summary
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Billing calculation
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-slate-50 rounded-2xl p-4">

          <p className="text-sm text-slate-500">
            Total Items
          </p>

          <h3 className="text-2xl font-bold text-slate-800 mt-1">
            {invoiceItems.length}
          </h3>

        </div>

        <div className="bg-slate-50 rounded-2xl p-4">

          <p className="text-sm text-slate-500">
            Total Qty
          </p>

          <h3 className="text-2xl font-bold text-slate-800 mt-1">
            {totalQty}
          </h3>

        </div>

      </div>

      {/* Calculation Card */}

      <div className="bg-slate-50 rounded-3xl p-6 space-y-5">

        <div className="flex justify-between items-center">

          <span className="text-slate-600">
            Taxable Amount
          </span>

          <span className="font-semibold">
            ₹
            {subtotal.toLocaleString(
              "en-IN",
              {
                minimumFractionDigits: 2,
              }
            )}
          </span>

        </div>

        <div className="flex justify-between items-center">

          <span className="text-slate-600">
            GST Amount
          </span>

          <span className="font-semibold">
            ₹
            {gstTotal.toLocaleString(
              "en-IN",
              {
                minimumFractionDigits: 2,
              }
            )}
          </span>

        </div>

        <div className="flex justify-between items-center">

          <span className="text-slate-600">
            Discount
          </span>

          <span className="font-semibold">
            ₹
            {discount.toFixed(2)}
          </span>

        </div>

        <div className="flex justify-between items-center">

          <span className="text-slate-600">
            Round Off
          </span>

          <span className="font-semibold">
            ₹
            {roundOff.toFixed(2)}
          </span>

        </div>

        <div className="border-t pt-5">

          <div className="flex justify-between items-center">

            <span className="text-xl font-bold text-slate-800">
              Grand Total
            </span>

            <span className="text-3xl font-bold text-green-600">
              ₹
              {grandTotal.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </span>

          </div>

        </div>

      </div>

      {/* Amount in Words */}

      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

        <p className="text-xs uppercase tracking-wide text-indigo-600 font-semibold mb-2">
          Amount In Words
        </p>

        <p className="text-slate-700 font-medium">
          Rupees{" "}
          {Math.round(
            grandTotal
          ).toLocaleString(
            "en-IN"
          )}{" "}
          Only
        </p>

      </div>

    </div>
  );
}

export default InvoiceSummary;