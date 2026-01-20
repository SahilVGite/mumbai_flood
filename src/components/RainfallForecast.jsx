import React from "react";
import { useLocation } from "react-router-dom";

const RainfallForecast = ({ RainfallForecastData }) => {
  const location = useLocation();

  // Allowed paths
  const allowedPaths = ["/rainfall", "/transport-stress", "/"]; 
  // add more if needed

  // If current path is not in allowed list, don't render anything
  if (!allowedPaths.includes(location.pathname)) return null;

  return (
    <div className="p-3 [@media(min-width:1700px)]:p-5 bg-black rounded-xl text-[#8C8C8C] w-fit [&>*:not(:last-child)]:mb-2 [@media(min-width:1700px)]:[&>*:not(:last-child)]:mb-4">
      {RainfallForecastData.map((item) => (
        <div key={item.id} className="flex items-center gap-3 [@media(min-width:1700px)]:gap-4">
          <span
            style={{ backgroundColor: item.color }}
            className="w-3 [@media(min-width:1700px)]:w-5 h-2 [@media(min-width:1700px)]:h-3 rounded-full"
          ></span>
          <p className="whitespace-nowrap text-xs [@media(min-width:1700px)]:text-sm">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default RainfallForecast;
