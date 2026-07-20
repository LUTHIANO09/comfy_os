import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import Card from "./Card";


function SalesChart({ sales }) {

  const data = sales.map((sale) => ({
  date: sale.date,
  sales: Number(sale.amount),
}));


  return (
    <Card title="Sales Analytics">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
                    strokeDasharray="5 5"
                    vertical={false}
                  />

            <XAxis dataKey="date" />

            <YAxis width={90} tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k` } />

            <Tooltip formatter={(value) => [ `₦${Number(value).toLocaleString()}`, "Sales", ]} />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={4}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default SalesChart;