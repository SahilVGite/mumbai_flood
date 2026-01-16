import RainfallChart from "../components/RainfallChart";

const FloodModel = () => {
  const floodHourlyData = [
    { time: "04:00", observed: 40, forecast: 42 },
    { time: "06:00", observed: 12, forecast: 15 },
    { time: "08:00", observed: 55, forecast: 58 },
    { time: "10:00", observed: 70, forecast: 65 },
    { time: "12:00", observed: 50, forecast: 50 },
    { time: "13:00", observed: null, forecast: 50 },
  ];

  return (
    <>
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-4">Flood Model</h2>

      {/* Alert */}
      <div className="bg-red-900/80 text-white px-5 py-4 rounded-lg mb-6">
        Moderate rainfall expected over the next 3 hrs. Water logging might happen in some areas.
      </div>

      {/* Severity */}
      <div className="mb-6">
        <p className="mb-2">Flood Severity</p>
        <div className="w-full h-3 rounded-full overflow-hidden flex items-center">
          <div className="w-full h-full bg-[#54CEFF]" />
          <div className="w-full h-full bg-[#029EFD]" />
          <div className="w-full h-full bg-[#105FCD]" />
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="w-full block text-center">Low</span>
          <span className="w-full block text-center">Moderate</span>
          <span className="w-full block text-center">High</span>
        </div>
      </div>

      {/* Chart */}
      <h3 className="mb-3">Observed Hourly Rainfall (Today)</h3>
      <RainfallChart data={floodHourlyData} />
    </>
  );
};

export default FloodModel;
