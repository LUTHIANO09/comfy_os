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
        Monthly Revenue vs Expenses
      </h2>

      <ResponsiveContainer
        width="100%"
        height={420}
      >
        <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 20,
                }}
            >

          <CartesianGrid
            stroke="#e2e8f0"
            strokeDasharray="4 4"
            />

          <XAxis dataKey="month" />

          <YAxis
             width={90}
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
            dataKey="revenue"
            name="Revenue"
            fill="#2563eb"
            radius={[6, 6, 0, 0]}
            />

          <Bar
            dataKey="expenses"
            name="Expenses"
            fill="#ef4444"
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="gross_profit"
            name="Gross Profit"
            fill="#16a34a"
            radius={[6, 6, 0, 0]}
            />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default MonthlySalesChart;