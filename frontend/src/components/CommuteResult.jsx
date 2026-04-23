import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { UK_AVERAGES } from "../constants/ukAverages";

export default function CommuteResult({ result }) {
  const chartData = [
    { name: "You", value: result.co2e },
    { name: "UK Petrol Avg", value: UK_AVERAGES.petrol },
    { name: "UK Diesel Avg", value: UK_AVERAGES.diesel },
  ];

  return (
    <div className="result">
      <h2>Your Annual Commute Emissions</h2>
      <p>
        {result.co2e.toFixed(2)} {result.co2e_unit} CO₂e
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 15, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
          <XAxis dataKey="name" tick={{ fill: "white", fontSize: 12 }} />
          <YAxis tick={{ fill: "white", fontSize: 12 }} unit=" kg" />
          <Tooltip formatter={(value) => `${value.toFixed(2)} kg CO₂e`} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            <Cell fill="#3caa64" />
            <Cell fill="#40f080" />
            <Cell fill="#44ec81" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
