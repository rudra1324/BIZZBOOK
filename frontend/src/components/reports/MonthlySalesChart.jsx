import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  getInvoicesFromStorage,
} from "../../utils/invoiceStorage";

function MonthlySalesChart() {
  const invoices =
    getInvoicesFromStorage();

  const monthlyData = {};

  invoices.forEach(
    (invoice) => {
      const date =
        new Date(
          invoice.createdAt
        );

      const month =
        date.toLocaleString(
          "default",
          {
            month: "short",
          }
        );

      if (
        !monthlyData[month]
      ) {
        monthlyData[
          month
        ] = 0;
      }

      monthlyData[
        month
      ] +=
        invoice.grandTotal || 0;
    }
  );

  const chartData =
    Object.keys(
      monthlyData
    ).map((month) => ({
      month,
      sales:
        monthlyData[
          month
        ],
    }));

  return (
    <div className="bg-white rounded-xl border p-5">

      <h2 className="text-xl font-semibold mb-5">
        Monthly Sales Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart
          data={chartData}
        >
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="month"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default MonthlySalesChart;