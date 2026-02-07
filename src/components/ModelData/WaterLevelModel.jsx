import WaterLevelChart from "../Charts/WaterLevelChart";
import { WaterLevel as WaterLevelIcon } from "@/assets/svg";
import { waterPoints } from "@/data/waterPointsData";
import { useMapContext } from "@/context/MapContext";
import { useOutletContext } from "react-router-dom";

import { useLiveDateTime } from "@/hooks/useLiveDateTime";
import ModelHeader from "@/components/common/ModelHeader";
import DateTimeBox from "@/components/common/DateTimeBox";
import SelectField from "@/components/common/SelectField";
import AlertBox from "@/components/common/AlertBox";

const waterLevelData = [
  { time: "00:00", level: 25 },
  { time: "02:00", level: 20 },
  { time: "04:00", level: 30 },
  { time: "06:00", level: 18 },
  { time: "08:00", level: 22 },
  { time: "10:00", level: 210 },
  { time: "12:00", level: 20 },
  { time: "14:00", level: 220 },
  { time: "16:00", level: 80 },
  { time: "18:00", level: 100 },
  { time: "20:00", level: 110 },
  { time: "22:00", level: 120 },
  { time: "24:00", level: 130 },
];

const WaterLevelModel = () => {
  const { date, time } = useLiveDateTime();
  const { setSelectedStation } = useMapContext();
  const { setIsDataVisible } = useOutletContext();

  return (
    <>
      <ModelHeader title="Water Level" Icon={WaterLevelIcon} />

      <div className="my-2.5 lg:my-4">
        <form>
          <ul className="flex items-center justify-between gap-2">
            <SelectField
              placeholder="Select Area"
              options={waterPoints.features.map((f) => ({
                value: f.properties.id,
                label: f.properties.name,
              }))}
              onChange={(e) => {
                setSelectedStation(e.target.value);
                setIsDataVisible(false);
              }}
            />
            <DateTimeBox date={date} time={time} />
          </ul>
        </form>
      </div>

      <p className="text-[#A2A2AA] text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] mb-4 [@media(min-width:1700px)]:mb-8">
        Patare Chawl, Swami Vivekananda Rd, near DCB Bank, Fish Market Area,
        Navneeth Colony, Andheri West, Mumbai, Maharashtra 400058, India
      </p>

      <p className="mb-2 text-white text-sm md:text-lg [@media(min-width:1700px)]:text-[20px] font-medium">
        Average Water Level
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Last 5 mins", value: "25 cm" },
          { label: "Last 15 mins", value: "27 cm" },
          { label: "Last 12 hrs", value: "36 cm" },
          { label: "Last 24 hrs", value: "35 cm" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-black p-4 rounded-lg text-center font-medium"
          >
            <p className="text-sm md:text-lg text-white">{item.value}</p>
            <p className="text-xs md:text-sm text-[#A2A2AA]">{item.label}</p>
          </div>
        ))}
      </div>

      <p className="mb-2 text-white text-sm md:text-lg [@media(min-width:1700px)]:text-[20px] font-medium">
        Water Level for Mithi River
      </p>

      <WaterLevelChart data={waterLevelData} xKey="time" />
    </>
  );
};

export default WaterLevelModel;
