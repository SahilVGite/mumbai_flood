import { SideBar } from "@/assets/svg";
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  FloodModel as FloodModelIcon,
  Rainfall as RainfallIcon,
  WaterLevel as WaterLevelIcon,
  RailwayIcon,
  FloodReportIcon,
  InfoIcon,
  Language,
} from "@/assets/svg";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import ReportCard from "./ReportCard";
import RainfallForecast from "./RainfallForecast";
import ModelData from "./ModelData/ModelData";
import FloodModel from "./ModelData/FloodModel"; // your page component
import path from "node:path";
import RainfallModel from "./ModelData/RainfallModel";
import WaterLevelModel from "./ModelData/WaterLevelModel";
import TransportStressModel from "./ModelData/TransportStressModel";
import ReportedFloodsModel from "./ModelData/ReportedFloodsModel";
import ReportFloodForm from "./ReportFloodForm";

const UserInteractions = () => {

  const location = useLocation();
  const isReportFlood = location.pathname === "/report-flood";

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTogglers = [
    { name: "Flood Model", icon: FloodModelIcon, path: "/" },
    { name: "Rainfall", icon: RainfallIcon, path: "/rainfall" },
    { name: "Water Level", icon: WaterLevelIcon, path: "/water-level" },
    { name: "Transport Stress", icon: RailwayIcon, path: "/transport-stress" },
    { name: "Reported Floods", icon: FloodReportIcon, path: "/reported-floods" },
  ];

  const informative = [
    { name: "Info", icon: InfoIcon, path: "/info" },
    { name: "Language", icon: Language, path: "/language" },
  ];

  const RainfallForecastData = [
    {
      id: 1,
      title: "Extremely Heavy Rainfall (>= 204.5 mm)",
      color: "#F70008",
    },
    {
      id: 2,
      title: "Very Heavy Rainfall (115.6 - 204.4 mm)",
      color: "#FFA00B",
    },
    { id: 3, title: "Heavy Rainfall (64.5 - 115.5 mm)", color: "#F9FD06" },
    { id: 4, title: "Moderate Rainfall (15.6 - 64.4 mm)", color: "#82CCE5" },
    { id: 5, title: "Light Rainfall (0.1 - 15.5 mm)", color: "#90F18F" },
    { id: 6, title: "No Rain", color: "#828083" },
  ];

  return (
    <>
      <div className="fixed left-0 top-0 w-full h-full max-h-screen z-10 [@media(max-width:1100px)]:flex [@media(max-width:1100px)]:items-end [@media(max-width:1100px)]:justify-center [@media(max-width:1100px)]:*:w-full pointer-events-none">
        <div className="relative">
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            pageTogglers={pageTogglers}
            informative={informative}
          />
          {!isReportFlood && (
            <>
            <div className={`fixed [@media(min-width:1201px)]:absolute top-2 [@media(min-width:1201px)]:top-4 bg-(--blue) text-white font-bold text-lg [@media(min-width:1700px)]:text-2xl p-2.5 w-auto [@media(min-width:1201px)]:w-full [@media(min-width:1201px)]:max-w-140 [@media(min-width:1700px)]:max-w-187.5 text-center rounded-[12px] transition-all duration-300 ease-in-out [@media(max-width:1100px)]:inset-x-2 ${sidebarOpen ? "[@media(min-width:1201px)]:left-54 [@media(min-width:1700px)]:left-61.5" : "[@media(min-width:1201px)]:left-22 [@media(min-width:1700px)]:left-30"}`}>
              Mumbai Flood Experiment
            </div>
            <div className={`NextToSidebar absolute [@media(min-width:1201px)]:top-1/2 [@media(min-width:1201px)]:-translate-y-1/2 w-full transition-all duration-300 ease-in-out [@media(max-width:1100px)]:left-0 [@media(max-width:1100px)]:bottom-0 ${sidebarOpen ? "[@media(min-width:1201px)]:left-54 [@media(min-width:1700px)]:left-61.5" : "[@media(min-width:1201px)]:left-22 [@media(min-width:1700px)]:left-30"}`} >
              <div className="relative w-full h-auto [@media(min-width:1201px)]:max-w-140 [@media(min-width:1700px)]:max-w-187.5">
                <Routes>
                  <Route element={<ModelData />}>
                    <Route index element={<FloodModel />} />
                    <Route path="/rainfall" element={<RainfallModel />} />
                    <Route path="/water-level" element={<WaterLevelModel />} />
                    <Route path="/transport-stress" element={<TransportStressModel />} />
                    <Route path="/reported-floods" element={<ReportedFloodsModel />} />
                  </Route>
                </Routes>
                <div className="absolute left-2 [@media(min-width:1201px)]:left-[calc(100%+16px)] [@media(min-width:1700px)]:left-[calc(100%+32px)] bottom-[calc(100%+15px)] [@media(min-width:1201px)]:bottom-8 [@media(min-width:1700px)]:bottom-14">
                  <RainfallForecast RainfallForecastData={RainfallForecastData} />
                </div>
                <div className="[@media(min-width:1201px)]:hidden absolute bottom-[calc(100%+15px)] right-2 md:right-4 z-10">
                  <ReportCard />
                </div>
              </div>
            </div>
            <div className="[@media(max-width:1100px)]:hidden fixed top-4 [@media(min-width:1700px)]:top-8 right-4 [@media(min-width:1700px)]:right-8 z-10">
              <ReportCard />
            </div>
          </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserInteractions;
