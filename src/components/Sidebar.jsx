import { SideBar } from "@/assets/svg";
import React, { useEffect, useState } from "react";
import {
  FloodModel,
  Rainfall,
  WaterLevel,
  RailwayIcon,
  FloodReportIcon,
  InfoIcon,
  Language,
} from "@/assets/svg";

const Sidebar = ({ sidebarOpen, setSidebarOpen, informative, pageTogglers }) => {
  return (
    <>
      <div className="sidebar flex gap-4 rounded-r-xl w-full max-w-fit h-full min-h-screen bg-(--black-80) pointer-events-auto flex-col items-center justify-between py-10 px-4 transition-all">
        <div
          className={`sidebarToggle ${sidebarOpen ? "w-full" : ""}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <SideBar
            className={`cursor-pointer ${sidebarOpen ? "ml-auto" : ""}`}
          />
        </div>
        <div className="pageTogglers flex flex-col justify-center items-center gap-8">
          {pageTogglers.map((toggler, index) => (
            <div
              key={index}
              className="toggler w-full bg-black rounded-lg cursor-pointer transition-colors flex items-center justify-start gap-1 group relative"
            >
              <toggler.icon />
              {sidebarOpen && (
                <span className="font-medium text-sm text-(--light-blue) mr-3">
                  {toggler.name}
                </span>
              )}
              {!sidebarOpen && (
                <>
                  <span className="absolute bg-black p-2 rounded-sm text-white font-medium capitalize opacity-0 group-hover:opacity-100 left-0 group-hover:left-20 top-1/2 -translate-y-1/2 z-4 text-xs whitespace-nowrap pointer-events-none transition-all">
                    {toggler.name}
                  </span>
                  <span className="absolute opacity-0 group-hover:opacity-100 left-0 group-hover:left-19 top-1/2 -translate-y-1/2 z-3 rotate-45 bg-black w-3 h-3 pointer-events-none transition-all" />
                </>
              )}
            </div>
          ))}
        </div>
        <div
          className={`flex flex-col justify-center items-center gap-8 ${
            sidebarOpen ? "w-full" : ""
          }`}
        >
          {informative.map((info, index) => (
            <div
              key={index}
              className="toggler w-full cursor-pointer transition-colors flex items-center justify-start gap-3 group relative"
            >
              <info.icon />
              {sidebarOpen && (
                <span className="font-medium text-sm text-(--light-blue) mr-3">
                  {info.name}
                </span>
              )}
              {!sidebarOpen && (
                <>
                  <span className="absolute bg-black p-2 rounded-sm text-white font-medium capitalize opacity-0 group-hover:opacity-100 left-0 group-hover:left-18 top-1/2 -translate-y-1/2 z-4 text-xs whitespace-nowrap pointer-events-none transition-all">
                    {info.name}
                  </span>
                  <span className="absolute opacity-0 group-hover:opacity-100 left-0 group-hover:left-17 top-1/2 -translate-y-1/2 z-3 rotate-45 bg-black w-3 h-3 pointer-events-none transition-all" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
