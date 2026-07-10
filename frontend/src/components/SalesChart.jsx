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

const data = [
  { month: "Jan", sales: 120000 },
  { month: "Feb", sales: 180000 },
  { month: "Mar", sales: 150000 },
  { month: "Apr", sales: 240000 },
  { month: "May", sales: 210000 },
  { month: "Jun", sales: 300000 },
];

function SalesChart() {
  return (
    <Card title="Sales Analytics">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

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
    </Card>
  );
}

export default SalesChart;