import { useEffect, useState } from "react";
import RainfallChart from "../Charts/RainfallChart";
import { FloodModel as FloodModelIcon, RoundLocation } from "@/assets/svg";
import { ChevronDown } from "lucide-react";

const FloodModel = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

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
        <FloodModelIcon strokeColor="#ffffff" className="max-w-9.5 md:max-w-9.8" />
        <h2 className="text-[18px] md:text-[20px] [@media(min-width:1700px)]:text-2xl font-semibold">Flood Model</h2>
      </div>

      <div className="my-2.5 lg:my-4">
        <form action="">
          <ul className="flex items-center justify-between gap-2">
            <li className="relative md:w-[50%]">
              <label htmlFor="">
                <select
                  name=""
                  id=""
                  className="bg-(--black-75) text-white text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium outline-none border-none py-2 pl-4 pr-8 rounded-[8px] appearance-none w-full truncate"
                >
                  <option value="current location" selected disabled>
                    Your current location
                  </option>
                  <option value="nearest station">
                    Choose the nearest station to your location
                  </option>
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
        Moderate rainfall expected over the next 3 hrs. Water logging might
        happen in some areas.
      </div>

      {/* Severity */}
      <div className="mb-4 [@media(min-width:1700px)]:mb-8">
        <p className="mb-2 text-white text-sm md:text-lg [@media(min-width:1700px)]:text-[20px] font-medium">
          Flood Severity
        </p>
        <div className="w-full h-3 rounded-full overflow-hidden flex items-center">
          <div className="w-full h-full bg-[#54CEFF]" />
          <div className="w-full h-full bg-[#029EFD]" />
          <div className="w-full h-full bg-[#105FCD]" />
        </div>
        <div className="flex justify-between text-xs md:text-sm mt-1 font-medium text-white">
          <span className="w-full block text-center">Low</span>
          <span className="w-full block text-center">Moderate</span>
          <span className="w-full block text-center">High</span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-center flex-wrap md:flex-nowrap gap-2 mb-2">
        <h3 className="text-white text-sm md:text-lg [@media(min-width:1700px)]:text-[20px] font-medium flex items-center gap-2 flex-wrap md:flex-nowrap">
          Observed Hourly Rainfall (Today) -{" "}
          <span className="font-medium text-xs md:text-sm">1 hr interval</span>
        </h3>
        <div className="text-[#8C8C8C] text-xs md:text-sm font-medium">
          (data from MCGM)
        </div>
      </div>
      <RainfallChart data={floodHourlyData} xKey="time" />
    </>
  );
};

export default FloodModel;
