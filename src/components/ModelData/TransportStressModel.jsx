import React from 'react'
import RainfallChart from "../Charts/RainfallChart";

  const floodHourlyData = [
    { time: "04:00", observed: 40, forecast: 42 },
    { time: "06:00", observed: 12, forecast: 15 },
    { time: "08:00", observed: 55, forecast: 58 },
    { time: "10:00", observed: 70, forecast: 65 },
    { time: "12:00", observed: 50, forecast: 50 },
    { time: "13:00", observed: null, forecast: 50 },
  ];

const TransportStressModel = () => {
  return (
    <>
      <h2 className="text-2xl mb-4">Transport Stress (Railways)</h2>

      <div className="bg-red-900/80 px-5 py-4 rounded-lg mb-6">
        Heavy rainfall expected over the next 1 hr. Trains delayed due to water-logging at Sion station affecting both Fast & Slow trains on the Central Railway Line.
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-black p-4 rounded-lg text-center">
          Recovery Time <br />
          <span className="text-pink-500 text-xl">~35 min</span>
        </div>
        <div className="bg-black p-4 rounded-lg text-center">
          System Delay <br />
          <span className="text-blue-400 text-xl">4 min</span>
        </div>
        <div className="bg-black p-4 rounded-lg text-center">
          Rain Delay <br />
          <span className="text-pink-500 text-xl">~45 min</span>
        </div>
      </div>

      <RainfallChart data={floodHourlyData} />
    </>
  )
}

export default TransportStressModel
