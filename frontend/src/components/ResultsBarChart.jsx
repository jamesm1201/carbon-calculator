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


export default function ResultsBarChart({ userResult, comparisons }) {
  const chartData = [
    { name: "You", value: userResult },
    ...comparisons
  ];

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 15, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
          <XAxis dataKey="name" tick={{ fill: "white", fontSize: 12 }} />
          <YAxis tick={{ fill: "white", fontSize: 12 }} unit=" kg" />
          <Tooltip
            contentStyle={{
              background: "#33da94",
              border: "none",
              borderRadius: "8px",
              color: "white",
            }}
            formatter={(value) => [`${value.toFixed(2)}kg CO₂e`, "Emissions"]}
          />
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
