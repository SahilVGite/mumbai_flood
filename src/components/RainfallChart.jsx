// components/RainfallChart.jsx
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const RainfallChart = ({ data }) => {
  return (
    <div className="w-full h-[280px] bg-black rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#35e4ff" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#35e4ff" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="time" stroke="#777" />
          <YAxis stroke="#777" />
          <Tooltip
            contentStyle={{
              background: "#111",
              border: "1px solid #333",
              color: "#fff",
            }}
          />

          {/* Forecast Area */}
          <Area
            type="monotone"
            dataKey="forecast"
            stroke="#35e4ff"
            strokeWidth={2}
            fill="url(#rainGradient)"
          />

          {/* Observed Line */}
          <Line
            type="monotone"
            dataKey="observed"
            stroke="#ffffff"
            strokeWidth={2}
            dot={{ r: 4, fill: "#35e4ff" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RainfallChart;
