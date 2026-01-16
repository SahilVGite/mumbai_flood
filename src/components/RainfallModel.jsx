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

const RainfallModel = () => {
  return (
    <>
      <h2 className="text-2xl mb-4">Rainfall</h2>

      <div className="bg-orange-900/80 px-5 py-4 rounded-lg mb-6">
        Heavy rainfall expected over the next 3 days. Orange alert in effect. Stay updated for further information.
      </div>

      <RainfallChart data={floodHourlyData} />
    </>
  )
}

export default RainfallModel
