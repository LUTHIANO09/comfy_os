import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function MonthlySalesChart({ data }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-semibold">
        Monthly Sales vs Expenses
      </h2>

      <ResponsiveContainer
        width="100%"
        height={420}
      >
        <BarChart data={data}>

          <CartesianGrid
            stroke="#e2e8f0"
            strokeDasharray="4 4"
            />

          <XAxis dataKey="month" />

          <YAxis
            tickFormatter={(value) =>
                `₦${Number(value).toLocaleString()}`
            }
            />

          <Tooltip
            formatter={(value) => [
                `₦${Number(value).toLocaleString()}`,
            ]}
            />

          <Legend />

          <Bar
            dataKey="sales"
            name="Sales"
            fill="#2563eb"
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="expenses"
            name="Expenses"
            fill="#ef4444"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default MonthlySalesChart;