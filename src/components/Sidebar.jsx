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
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  informative,
  pageTogglers,
}) => {

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1100);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setSidebarOpen(false);
    }
  }, [isSmallScreen]);

  return (
    <>
      <div className="sidebar flex gap-4 [@media(min-width:1201px)]:rounded-r-xl w-full max-w-full [@media(min-width:1201px)]:max-w-fit h-auto [@media(min-width:1201px)]:h-full min-h-auto [@media(min-width:1201px)]:min-h-screen bg-(--black-80) [@media(max-width:1100px)]:backdrop-blur-[7.5px] pointer-events-auto [@media(min-width:1201px)]:flex-col items-center [@media(max-width:1100px)]:overflow-x-auto justify-start md:justify-center [@media(min-width:1201px)]:justify-between py-4 [@media(min-width:1201px)]:py-10 px-3 [@media(min-width:1700px)]:px-4 transition-all duration-300 ease-in-out relative z-30 [@media(max-width:1100px)]:shadow-[0px_-6px_12px_-2px_rgba(50,50,93,0.25),_0px_-3px_7px_-3px_rgba(0,0,0,0.3)]">
        <div
          className={`sidebarToggle [@media(max-width:1100px)]:hidden ${sidebarOpen ? "w-full" : ""}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <SideBar
            className={`cursor-pointer transition-all duration-300 ease-in-out ${
              sidebarOpen ? "ml-auto" : ""
            }`}
          />
        </div>
        <div className="pageTogglers flex [@media(min-width:1201px)]:flex-col justify-center items-center gap-6 [@media(min-width:1700px)]:gap-8">
          {pageTogglers.map((toggler, index) => (
            <NavLink
              key={index}
              to={toggler.path}
              className="toggler w-full bg-black rounded-lg cursor-pointer transition-colors flex items-center justify-start gap-1 group relative"
            >
              {({ isActive }) => (
                <>
                  <toggler.icon
                    strokeColor={isActive ? "#fff" : "#8DADFF"}
                    className="max-w-12 [@media(min-width:1700px)]:max-w-14 h-auto"
                  />

                  {sidebarOpen && (
                    <span
                      className={`font-medium text-sm mr-3 ${
                        isActive ? "text-white" : "text-(--light-blue)"
                      }`}
                    >
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
                </>
              )}
            </NavLink>
          ))}
        </div>
        <div
          className={`flex [@media(min-width:1201px)]:flex-col justify-center items-center gap-5 [@media(min-width:1700px)]:gap-8 ${
            sidebarOpen ? "w-full" : ""
          }`}
        >
          {informative.map((info, index) => (
            <NavLink
              to={`${info.path}`}
              key={index}
              className="toggler w-full cursor-pointer transition-colors flex items-center justify-start gap-3 group relative [@media(max-width:1100px)]:bg-black [@media(max-width:1100px)]:rounded-lg p-2"
            >
              {({ isActive }) => (
                <>
                  <info.icon
                    strokeColor={isActive ? "#fff" : "#8DADFF"}
                    className="max-w-8 [@media(min-width:1700px)]:max-w-9 h-auto"
                  />
                  {sidebarOpen && (
                    <span
                      className={`font-medium text-sm mr-3 ${
                        isActive ? "text-white" : "text-(--light-blue)"
                      }`}
                    >
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
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
