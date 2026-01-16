import React from 'react'
import RainfallChart from "../components/RainfallChart";

  const floodHourlyData = [
    { time: "04:00", observed: 40, forecast: 42 },
    { time: "06:00", observed: 12, forecast: 15 },
    { time: "08:00", observed: 55, forecast: 58 },
    { time: "10:00", observed: 70, forecast: 65 },
    { time: "12:00", observed: 50, forecast: 50 },
    { time: "13:00", observed: null, forecast: 50 },
  ];

const WaterLevelModel = () => {
  return (
    <>
      <h2 className="text-2xl mb-4">Water Level</h2>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Last 5 mins", value: "25 cm" },
          { label: "Last 15 mins", value: "27 cm" },
          { label: "Last 12 hrs", value: "36 cm" },
          { label: "Last 24 hrs", value: "35 cm" },
        ].map((i, idx) => (
          <div key={idx} className="bg-black p-4 rounded-lg text-center">
            <p className="text-xl">{i.value}</p>
            <p className="text-sm text-gray-400">{i.label}</p>
          </div>
        ))}
      </div>

      <RainfallChart data={floodHourlyData} />
    </>
  )
}

export default WaterLevelModel
