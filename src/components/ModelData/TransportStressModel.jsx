import RainfallChart from "../Charts/RainfallChart";
import { RailwayIcon } from "@/assets/svg";
import { railwayStations } from "@/data/railwayData";
import { useMapContext } from "@/context/MapContext";

import { useLiveDateTime } from "@/hooks/useLiveDateTime";
import ModelHeader from "@/components/common/ModelHeader";
import DateTimeBox from "@/components/common/DateTimeBox";
import SelectField from "@/components/common/SelectField";
import AlertBox from "@/components/common/AlertBox";

const floodHourlyData = [
  { time: "04:00", observed: 40, forecast: 42 },
  { time: "06:00", observed: 12, forecast: 15 },
  { time: "08:00", observed: 55, forecast: 58 },
  { time: "10:00", observed: 70, forecast: 65 },
  { time: "12:00", observed: 50, forecast: 50 },
  { time: "13:00", observed: null, forecast: 50 },
];

const TransportStressModel = () => {
  const { date, time } = useLiveDateTime();
  const { setSelectedStation } = useMapContext();

  return (
    <>
      <ModelHeader title="Transport Stress (Railways)" Icon={RailwayIcon} />

      {/* Select + DateTime */}
      <div className="my-2.5 lg:my-4">
        <form>
          <ul className="flex items-center justify-between gap-2">
            <SelectField
              placeholder="Select Railway Station"
              options={railwayStations.features.map((s) => ({
                value: s.properties.id,
                label: s.properties.name,
              }))}
              onChange={(e) => setSelectedStation(e.target.value)}
            />
            <DateTimeBox date={date} time={time} />
          </ul>
        </form>
      </div>

      {/* Alert */}
      <AlertBox color="red">
        Heavy rainfall expected over the next 1 hr. Trains delayed due to
        water-logging at Sion station affecting both Fast & Slow trains on the
        Central Railway Line.
      </AlertBox>

      {/* Status Cards */}
      <div className="mb-8 flex items-stretch justify-between gap-6 *:w-full">
        <div className="text-center font-medium bg-black p-4 rounded-[8px]">
          <p className="text-[#FF5F8D] text-[16px] [@media(min-width:1700px)]:text-lg">
            Central Railway Line
          </p>
          <p className="text-[#A2A2AA] text-xs md:text-sm">Affected</p>
        </div>

        <div className="text-center font-medium bg-black p-4 rounded-[8px]">
          <p className="text-[#FF5F8D] text-[16px] [@media(min-width:1700px)]:text-lg">
            Fast & Slow
          </p>
          <p className="text-[#A2A2AA] text-xs md:text-sm">Trains Affected</p>
        </div>
      </div>

      {/* Delay Cards */}
      <div>
        <p className="mb-2 text-white text-sm md:text-lg [@media(min-width:1700px)]:text-[20px] font-medium">
          Service Delays
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            {
              title: "Recovery Time",
              value: "~35 min",
              color: "text-white",
            },
            {
              title: "System Delay",
              value: "4 min",
              color: "text-white",
            },
            {
              title: "Rainfall Induced Delay",
              value: "~45 min",
              color: "text-[#FF5F8D]",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-black py-2 md:py-4 px-1 md:px-2 rounded-lg text-center flex md:flex-col justify-between md:justify-center items-center"
            >
              <p className="font-medium text-[10px] md:text-[14px] text-[#A2A2AA]">
                {item.title}
              </p>
              <p
                className={`font-medium text-sm md:text-[20px] [@media(min-width:1700px)]:text-2xl my-1 ${item.color}`}
              >
                {item.value}
              </p>
              <p className="text-[10px] md:text-sm font-medium text-[#A2A2AA]">
                Updated last 5 mins
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div>
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

export default TransportStressModel;
