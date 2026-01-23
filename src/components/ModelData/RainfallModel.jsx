import RainfallChart from "../Charts/RainfallChart";
import { Rainfall as RainfallIcon } from "@/assets/svg";
import { ChevronDown } from "lucide-react";
import { rainfallPoints } from "../../data/rainfallPointsData";
import { useMapContext } from "@/context/MapContext";
import { useOutletContext } from "react-router-dom";

import { useLiveDateTime } from "@/hooks/useLiveDateTime";
import ModelHeader from "@/components/common/ModelHeader";
import DateTimeBox from "@/components/common/DateTimeBox";
import SelectField from "@/components/common/SelectField";
import AlertBox from "@/components/common/AlertBox";

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
  const { date, time } = useLiveDateTime();
  const { setSelectedStation } = useMapContext();
  const { setIsDataVisible } = useOutletContext();

  return (
    <>
      <ModelHeader title="Rainfall" Icon={RainfallIcon} />

      <div className="my-2.5 lg:my-4">
        <form>
          <ul className="flex items-center justify-between gap-2">
            <SelectField
              placeholder="Select Area"
              options={rainfallPoints.features.map((f) => ({
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

      <AlertBox color="red">
        Heavy rainfall expected over the next 3 days. Orange alert in effect.
        Stay updated for further information.
      </AlertBox>

      <div>
        <p className="mb-2 text-white text-sm md:text-lg [@media(min-width:1700px)]:text-[20px] font-medium">
          Daily rainfall Forecast
        </p>
        <RainfallChart data={dailyFloodData} xKey="date" />
      </div>

      <div className="mt-6">
        <div className="flex items-center flex-wrap md:flex-nowrap gap-2 mb-2">
          <h3 className="text-white text-sm md:text-lg [@media(min-width:1700px)]:text-[20px] font-medium">
            Observed Hourly Rainfall (Today) –
            <span className="font-medium text-xs md:text-sm ml-1">
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
