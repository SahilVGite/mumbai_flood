import RainfallChart from "../Charts/RainfallChart";
import { FloodModel as FloodModelIcon } from "@/assets/svg";
import { useLiveDateTime } from "@/hooks/useLiveDateTime";
import ModelHeader from "@/components/common/ModelHeader";
import DateTimeBox from "@/components/common/DateTimeBox";
import AlertBox from "@/components/common/AlertBox";
import SelectField from "@/components/common/SelectField";

const FloodModel = () => {
  const { date, time } = useLiveDateTime();

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
      <ModelHeader Icon={FloodModelIcon} title="Flood Model" />

      <div className="my-2.5 lg:my-4 flex justify-between gap-2">
        <SelectField placeholder="Your current location">
          <option value="nearest">Choose nearest station</option>
        </SelectField>
        <DateTimeBox date={date} time={time} />
      </div>

      <AlertBox>
        Moderate rainfall expected over the next 3 hrs. Water logging might happen.
      </AlertBox>

      <RainfallChart data={floodHourlyData} xKey="time" />
    </>
  );
};

export default FloodModel;
