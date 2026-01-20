import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";

const RainfallChart = ({ data }) => {
  const yTicks = [0, 15.5, 64.4, 115.5, 204.4, 250];

  return (
    <div className="w-full h-60 [@media(min-width:1700px)]:h-70 bg-black rounded-xl p-4 pb-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="28%" stopColor="#13CCE1" stopOpacity="1" />
              <stop offset="100%" stopColor="#13CCE1" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* X Axis */}
          <XAxis dataKey="time" stroke="#777" tick={{ fill: "#aaa" }} label={{fontSize: 12}} />

          {/* Y Axis with exact labels */}
          <YAxis
            stroke="#777"
            tick={{ fill: "#aaa", fontSize: 12 }}
            domain={[0, 250]}
            ticks={yTicks}
            tickFormatter={(value) => (value === 250 ? ">204.5" : value)}
            label={{
              value: "Rainfall in mm",
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
              fontSize: 13,
            }}
          />

          {/* Solid severity lines (no dash) */}
          <ReferenceLine y={204.5} stroke="#F70008" strokeWidth={1.5} />
          <ReferenceLine y={204.4} stroke="#FFA00B" strokeWidth={1.5} />
          <ReferenceLine y={115.5} stroke="#F9FD06" strokeWidth={1.5} />
          <ReferenceLine y={64.4} stroke="#82CCE5" strokeWidth={1.5} />
          <ReferenceLine y={15.5} stroke="#90F18F" strokeWidth={1.5} />
          <ReferenceLine y={0} stroke="#828083" strokeWidth={1.5} />

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
      <div className="flex items-center justify-between gap-4 whitespace-nowrap overflow-x-auto">
        <div className="flex items-center gap-2">
          <span>
            <svg
              width="21"
              height="4"
              viewBox="0 0 21 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 2H19" stroke="white" />
              <circle cx="2" cy="2" r="2" fill="white" />
              <circle cx="19" cy="2" r="2" fill="white" />
            </svg>
          </span>
          <span className="text-xs text-[#8C8C8C] font-medium">
            Observed Rainfall
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="10"
                height="10"
                rx="2"
                fill="url(#paint0_linear_1_19540)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_19540"
                  x1="5"
                  y1="0"
                  x2="5"
                  y2="10"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#13CCE1" />
                  <stop offset="1" stop-color="#13CCE1" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="text-xs text-[#8C8C8C] font-medium">
            Forecasted Rainfall
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4" cy="4" r="4" fill="white" />
              <circle cx="4" cy="4" r="2" fill="#13CCE1" />
            </svg>
          </span>
          <span className="text-xs text-[#8C8C8C] font-medium">
            Current Hour
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4" cy="4" r="4" fill="#13CCE1" />
              <circle cx="4" cy="4" r="2" fill="white" />
            </svg>
          </span>
          <span className="text-xs text-[#8C8C8C] font-medium">
            Next 3 hours Rainfall forecast
          </span>
        </div>
      </div>
    </div>
  );
};

export default RainfallChart;
