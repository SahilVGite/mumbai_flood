import { useEffect, useState } from "react";
import WaterLevelChart from "../Charts/WaterLevelChart";
import { WaterLevel as WaterLevelIcon, RoundLocation } from "@/assets/svg";
import { ChevronDown } from "lucide-react";
import { useMapContext } from "@/context/MapContext";
import { waterPoints } from "@/components/MapView";

const floodHourlyData = [
  { time: "04:00", observed: 40, forecast: 42 },
  { time: "06:00", observed: 12, forecast: 15 },
  { time: "08:00", observed: 55, forecast: 58 },
  { time: "10:00", observed: 70, forecast: 65 },
  { time: "12:00", observed: 50, forecast: 50 },
  { time: "13:00", observed: null, forecast: 50 },
];

const waterLevelData = [
  { time: "00:00", level: 25 },
  { time: "02:00", level: 20 },
  { time: "04:00", level: 30 },
  { time: "06:00", level: 18 },
  { time: "08:00", level: 22 },
  { time: "10:00", level: 210 }, // spike
  { time: "12:00", level: 20 },
  { time: "14:00", level: 220 }, // spike
  { time: "16:00", level: 80 },
  { time: "18:00", level: 100 },
  { time: "20:00", level: 110 },
  { time: "22:00", level: 120 },
  { time: "24:00", level: 130 },
];

const WaterLevelModel = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const { setSelectedStation } = useMapContext();

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
        <WaterLevelIcon strokeColor="#ffffff" />
        <h2 className="text-2xl font-semibold">Water Level</h2>
      </div>

      <div className="my-4">
        <form action="">
          <ul className="flex items-center justify-between">
            <li className="relative">
              <label htmlFor="">
                <select
                  onChange={(e) => setSelectedStation(e.target.value)}
                  className="bg-(--black-75) text-white text-[16px] font-medium outline-none border-none py-2 pl-4 pr-8 rounded-[8px] appearance-none"
                >
                  <option value="">Select water level station</option>
                  {waterPoints.features.map((f) => (
                    <option key={f.properties.id} value={f.properties.id}>
                      {f.properties.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute w-4 h-4 right-2 top-1/2 transform -translate-y-1/2 pointer-events-auto text-[#8C8C8C]" />
              </label>
            </li>
            <li>
              <div className="bg-(--black-75) text-white font-medium text-[16px] py-2 px-7 rounded-[8px] flex gap-6 items-center">
                <span className="Date">{date}</span>
                <span className="Time">{time}</span>
              </div>
            </li>
          </ul>
        </form>
      </div>

      <div className="text-[16px] text-[#A2A2AA] mb-8">
        Patare Chawl, Swami Vivekananda Rd, near DCB Bank, Fish Market Area,
        Navneeth Colony, Andheri West, Mumbai, Maharashtra 400058, India
      </div>

      <p className="mb-2 text-white text-[20px] font-medium">
        Average Water Level
      </p>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Last 5 mins", value: "25 cm" },
          { label: "Last 15 mins", value: "27 cm" },
          { label: "Last 12 hrs", value: "36 cm" },
          { label: "Last 24 hrs", value: "35 cm" },
        ].map((i, idx) => (
          <div
            key={idx}
            className="bg-black p-4 rounded-lg text-center font-medium"
          >
            <p className="text-lg">{i.value}</p>
            <p className="text-sm text-[#A2A2AA]">{i.label}</p>
          </div>
        ))}
      </div>

      <p className="mb-2 text-white text-[20px] font-medium">
        Water Level for Mithi River
      </p>
      <WaterLevelChart data={waterLevelData} />
    </>
  );
};

export default WaterLevelModel;
