import { SideBar } from "@/assets/svg";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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

const UserInteractions = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTogglers = [
    { name: "Flood Model", icon: FloodModelIcon, path: "/" },
    { name: "Rainfall", icon: RainfallIcon, path: "/rainfall" },
    { name: "Water Level", icon: WaterLevelIcon, path: "/water-level" },
    { name: "Transport Stress", icon: RailwayIcon, path: "/transport-stress" },
    { name: "Report Flood", icon: FloodReportIcon, path: "/report-flood" },
  ];

  const informative = [
    { name: "Info", icon: InfoIcon, path: "/info" },
    { name: "Language", icon: Language, path: "/language" },
  ];

  const RainfallForecastData = [
    {
      id: 1,
      title: "Extremely Heavy Rainfall (>= 2.4.5 mm)",
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
      <div className="fixed left-0 top-0 w-full h-full max-h-screen z-10 pointer-events-none">
        <div className="relative">
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            pageTogglers={pageTogglers}
            informative={informative}
          />
          <div
            className={`absolute top-4 bg-(--blue) text-white font-bold text-2xl p-2.5 
  w-full max-w-187.5 text-center rounded-[12px]
  transition-all duration-300 ease-in-out
  ${sidebarOpen ? "left-61.5" : "left-30"}`}
          >
            Mumbai Flood Experiment
          </div>
          <div
            className={`NextToSidebar absolute top-1/2 -translate-y-1/2 w-full
  transition-all duration-300 ease-in-out
  ${sidebarOpen ? "left-61.5" : "left-30"}`}
          >
            <div className="relative w-full max-w-187.5">
              <Routes>
                <Route element={<ModelData />}>
                  <Route index element={<FloodModel />} />
                  <Route path="/rainfall" element={<RainfallModel />} />
                  <Route path="/water-level" element={<WaterLevelModel />} />
                  <Route
                    path="/transport-stress"
                    element={<TransportStressModel />}
                  />
                </Route>
              </Routes>
              <RainfallForecast RainfallForecastData={RainfallForecastData} />
            </div>
          </div>
          <ReportCard />
        </div>
      </div>
    </>
  );
};

export default UserInteractions;
