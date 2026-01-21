import { useEffect, useState } from "react";
import RainfallChart from "../Charts/RainfallChart";
import { RailwayIcon } from "@/assets/svg";
import { ChevronDown } from "lucide-react";
import { useMapContext } from "@/context/MapContext";
import { railwayStations } from "@/data/railwayData";

const floodHourlyData = [
  { time: "04:00", observed: 40, forecast: 42 },
  { time: "06:00", observed: 12, forecast: 15 },
  { time: "08:00", observed: 55, forecast: 58 },
  { time: "10:00", observed: 70, forecast: 65 },
  { time: "12:00", observed: 50, forecast: 50 },
  { time: "13:00", observed: null, forecast: 50 },
];

const TransportStressModel = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { selectedStation, setSelectedStation } = useMapContext();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Jun 15, 2025
      const formattedDate = now.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

      // 10:04
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      setDate(formattedDate);
      setTime(formattedTime);
    };

    updateDateTime(); // initial call
    const interval = setInterval(updateDateTime, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);

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
      <div className="flex items-center">
        <RailwayIcon strokeColor="#ffffff" className="max-w-9.5 md:max-w-9.8" />
        <h2 className="text-[18px] md:text-[20px] [@media(min-width:1700px)]:text-2xl font-semibold">
          Transport Stress (Railways)
        </h2>
      </div>

      <div className="my-2.5 lg:my-4">
        <form action="">
          <ul className="flex items-center justify-between gap-2">
            <li className="relative md:w-[50%]">
              <label htmlFor="">
                <select
                  onChange={(e) => setSelectedStation(e.target.value)}
                  className="bg-(--black-75) text-white text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium outline-none border-none py-2 pl-4 pr-8 rounded-[8px] appearance-none w-full truncate"
                >
                  <option value="" disabled selected>
                    Select Railway Station
                  </option>

                  {railwayStations.features.map((s) => (
                    <option key={s.properties.id} value={s.properties.id}>
                      {s.properties.name}
                    </option>
                  ))}
                </select>

                <ChevronDown className="absolute w-4 h-4 right-2 top-1/2 transform -translate-y-1/2 pointer-events-auto text-[#8C8C8C]" />
              </label>
            </li>
            <li>
              <div className="bg-(--black-75) text-white font-medium text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] py-2 px-5 lg:px-7 rounded-[8px] flex gap-3 md:gap-6 items-center whitespace-nowrap">
                <span className="Date">{date}</span>
                <span className="Time">{time}</span>
              </div>
            </li>
          </ul>
        </form>
      </div>

      {/* Alert */}
      <div className="bg-(--red-30) text-white text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] px-5 py-4 rounded-lg mb-4 [@media(min-width:1700px)]:mb-8">
        Heavy rainfall expected over the next 1 hr. Trains delayed due to
        water-logging at Sion station affecting both Fast & Slow trains on the
        Central Railway Line.
      </div>

      <div className="mb-8 flex items-stretch justify-between gap-6 *:w-full">
        <div className="text-center font-medium bg-black p-4 rounded-[8px]">
          <p className="text-[#FF5F8D] text-[16px] [@media(min-width:1700px)]:text-[18px]">Central Railway Line</p>
          <p className="text-[#A2A2AA] text-xs md:text-sm">Affected</p>
        </div>
        <div className="text-center font-medium bg-black p-4 rounded-[8px]">
          <p className="text-[#FF5F8D] text-[16px] [@media(min-width:1700px)]:text-[18px]">Fast & Slow</p>
          <p className="text-[#A2A2AA] text-xs md:text-sm">Trains Affected</p>
        </div>
      </div>

      <div>
        <p className="mb-2 text-white text-sm md:text-lg [@media(min-width:1700px)]:text-[20px] font-medium">
          Service Delays
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-black py-2 md:py-4 px-1 md:px-2 rounded-lg text-center flex md:flex-col justify-between md:justify-center items-center [@media(max-width:767px)]:*:w-[33%]">
            <p className="font-medium text-[10px] md:text-[14px] [@media(min-width:1700px)]:text-[18px] text-[#A2A2AA]">
              Recovery Time
            </p>
            <p className="text-white font-medium text-sm md:text-[20px] [@media(min-width:1700px)]:text-2xl my-1">~35 min</p>
            <p className="text-[10px] md:text-sm font-medium text-[#A2A2AA]">
              Updated last 5 mins
            </p>
          </div>
          <div className="bg-black py-2 md:py-4 px-1 md:px-2 rounded-lg text-center flex md:flex-col justify-between md:justify-center items-center [@media(max-width:767px)]:*:w-[33%]">
            <p className="font-medium text-[10px] md:text-[14px] [@media(min-width:1700px)]:text-[18px] text-[#A2A2AA]">
              System Delay
            </p>
            <p className="text-white font-medium text-sm md:text-[20px] [@media(min-width:1700px)]:text-2xl my-1">4 min</p>
            <p className="text-[10px] md:text-sm font-medium text-[#A2A2AA]">
              Updated last 5 mins
            </p>
          </div>
          <div className="bg-black py-2 md:py-4 px-1 md:px-2 rounded-lg text-center flex md:flex-col justify-between md:justify-center items-center [@media(max-width:767px)]:*:w-[33%]">
            <p className="font-medium text-[10px] md:text-[14px] [@media(min-width:1700px)]:text-[18px] text-[#A2A2AA]">
              Rainfall Induced Delay
            </p>
            <p className="text-[#FF5F8D] font-medium text-sm md:text-[20px] [@media(min-width:1700px)]:text-2xl my-1">~45 min</p>
            <p className="text-[10px] md:text-sm font-medium text-[#A2A2AA]">
              Updated last 5 mins
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center flex-wrap md:flex-nowrap gap-2 mb-2">
          <h3 className="text-white text-sm md:text-lg [@media(min-width:1700px)]:text-[20px] font-medium flex items-center gap-2 flex-wrap md:flex-nowrap">
            Observed Hourly Rainfall (Today) -{" "}
            <span className="font-medium text-xs md:text-sm">
              1 hr interval
            </span>
          </h3>
          <div className="text-[#8C8C8C] text-xs md:text-sm font-medium">
            (data from MCGM)
          </div>
        </div>
        <RainfallChart data={floodHourlyData} xKey="time" />
      </div>
    </>
  );
};

export default TransportStressModel;
