import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const WaterLevelChart = ({ data }) => {
  return (
    <div className="w-full h-[280px] bg-black rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#222" vertical={false} />

          {/* X Axis */}
          <XAxis
            dataKey="time"
            stroke="#777"
            tick={{ fill: "#aaa", fontSize: 12 }}
            label={{
              value: "Time",
              position: "insideBottom",
              offset: -5,
              fill: "#aaa",
              fontSize: 12,
            }}
          />

          {/* Y Axis */}
          <YAxis
            stroke="#777"
            tick={{ fill: "#aaa", fontSize: 12 }}
            domain={[0, 250]}
            label={{
              value: "Water Level",
              angle: -90,
              position: "insideLeft",
              dy: 40,
              fill: "#aaa",
              fontSize: 12,
            }}
          />

          <Tooltip
            contentStyle={{
              background: "#111",
              border: "1px solid #333",
              color: "#fff",
            }}
          />

          <Line
            type="monotone"
            dataKey="level"
            stroke="#35e4ff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WaterLevelChart;
