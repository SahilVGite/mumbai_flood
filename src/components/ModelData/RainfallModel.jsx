import { useEffect, useState } from "react";
import RainfallChart from "../Charts/RainfallChart";
import { Rainfall as RainfallIcon } from "@/assets/svg";
import { ChevronDown } from "lucide-react";

import { useMapContext } from "@/context/MapContext";
import { rainfallPoints } from "@/components/MapView";
import { useOutletContext } from "react-router-dom";

const floodHourlyData = [
  { time: "04:00", observed: 140, forecast: 142 },
  { time: "06:00", observed: 112, forecast: 105 },
  { time: "08:00", observed: 155, forecast: 158 },
  { time: "10:00", observed: 170, forecast: 155 },
  { time: "12:00", observed: 150, forecast: 130 },
  { time: "13:00", observed: null, forecast: 150 },
];

const dailyFloodData = [
  { date: "Jan 12", observed: 30, forecast: 42 },
  { date: "Jan 13", observed: 12, forecast: 15 },
  { date: "Jan 14", observed: 85, forecast: 98 },
  { date: "Jan 15", observed: 79, forecast: 65 },
  { date: "Jan 16", observed: 50, forecast: 70 },
  { date: "Jan 17", observed: null, forecast: 150 },
];

const RainfallModel = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const { setSelectedStation } = useMapContext();
  const { setIsDataVisible } = useOutletContext();

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

  return (
    <>
      {/* Header */}
      <div className="flex items-center">
        <RainfallIcon
          strokeColor="#ffffff"
          className="max-w-9.5 md:max-w-9.8"
        />
        <h2 className="text-[18px] md:text-[20px] [@media(min-width:1700px)]:text-2xl font-semibold">
          Rainfall
        </h2>
      </div>

      <div className="my-2.5 lg:my-4">
        <form action="">
          <ul className="flex items-center justify-between gap-2">
            <li className="relative md:w-[50%]">
              <label htmlFor="">
                <select
                  onChange={(e) => {
                    setSelectedStation(e.target.value);
                    setIsDataVisible(false);
                  }}
                  className="bg-(--black-75) text-white text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium outline-none border-none py-2 pl-4 pr-8 rounded-[8px] appearance-none w-full truncate"
                >
                  <option value="" selected disabled>
                    Select Area
                  </option>
                  {rainfallPoints.features.map((f) => (
                    <option key={f.properties.id} value={f.properties.id}>
                      {f.properties.name}
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
        Heavy rainfall expected over the next 3 days. Orange alert in effect.
        Stay updated for further information.
      </div>

      <div>
        <p className="mb-2 text-white text-sm md:text-lg [@media(min-width:1700px)]:text-[20px] font-medium">
          Daily rainfall Forecast
        </p>
        <RainfallChart data={dailyFloodData} xKey="date" />
      </div>

      <div className="mt-6">
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

export default RainfallModel;
