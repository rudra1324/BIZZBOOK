import { getInvoicesFromStorage } from "../../utils/invoiceStorage";

const SalesChart = () => {
  const invoices =
    getInvoicesFromStorage();

  const monthlySales = {};

  invoices.forEach(
    (invoice) => {
      const month =
        new Date(
          invoice.createdAt
        ).toLocaleString(
          "default",
          {
            month: "short",
          }
        );

      monthlySales[month] =
        (monthlySales[month] || 0) +
        Number(
          invoice.grandTotal || 0
        );
    }
  );

  const salesData =
    Object.entries(
      monthlySales
    );

  const maxValue =
    salesData.length > 0
      ? Math.max(
          ...salesData.map(
            ([, value]) => value
          )
        )
      : 1;

  const totalSales =
    salesData.reduce(
      (sum, [, value]) =>
        sum + value,
      0
    );

  return (
    <div className="bg-white rounded-3xl shadow-sm">

      <div className="p-8">

        {/* Header */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h3 className="text-2xl font-bold text-slate-800">
              Revenue Analytics
            </h3>

            <p className="text-slate-500 mt-1">
              Monthly business performance
            </p>

          </div>

          <div className="text-right bg-slate-50 px-5 py-3 rounded-2xl">

            <p className="text-sm text-slate-500">
              Total Revenue
            </p>

            <p className="text-2xl font-bold text-green-600">
              ₹
              {totalSales.toLocaleString()}
            </p>

          </div>

        </div>

        {/* Chart */}

        {salesData.length === 0 ? (

          <div className="h-[260px] flex items-center justify-center text-slate-400">
            No sales data available
          </div>

        ) : (

          <div className="space-y-8">

            {salesData.map(
              ([month, value]) => (
                <div
                  key={month}
                  className="bg-slate-50 rounded-2xl p-5"
                >

                  <div className="flex justify-between items-center mb-3">

                    <span className="font-semibold text-slate-700">
                      {month}
                    </span>

                    <span className="font-bold text-green-600">
                      ₹
                      {value.toLocaleString()}
                    </span>

                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">

                    <div
                      className="h-4 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-700"
                      style={{
                        width: `${
                          (value /
                            maxValue) *
                          100
                        }%`,
                      }}
                    />

                  </div>

                </div>
              )
            )}

          </div>

        )}

      </div>

    </div>
  );
};

export default SalesChart;