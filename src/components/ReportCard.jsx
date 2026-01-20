import React from "react";
import { Link } from "react-router";

const ReportCard = () => {
  return (
    <div className="[@media(min-width:1201px)]:p-0.5 [@media(min-width:1201px)]:bg-[#E8CBBC] [@media(min-width:1201px)]:rounded-2xl [@media(min-width:1201px)]:bg-[radial-gradient(ellipse_at_top_left,#FFE9EA,#F7000880)] pointer-events-auto max-w-fit [@media(min-width:1201px)]:max-w-100 w-full text-center">
      <div className="[@media(min-width:1201px)]:py-4 [@media(min-width:1700px)]:py-6.25 [@media(min-width:1201px)]:px-3 [@media(min-width:1700px)]:px-4 [@media(min-width:1201px)]:bg-[#E8CBBC] [@media(min-width:1201px)]:rounded-[15px]">
        <h5 className="[@media(max-width:1100px)]:hidden font-medium text-[20px] [@media(min-width:1700px)]:text-2xl text-black mb-2">
          Spotted flooding in your area?
        </h5>
        <p className="[@media(max-width:1100px)]:hidden text-[14px] [@media(min-width:1700px)]:text-[16px] text-black">
          Take a moment to report it and help keep your community safe!
        </p>
        <Link
          to="/report-flood"
          className="block [@media(max-width:1100px)]:py-[0.875em] [@media(max-width:1100px)]:px-[2em] [@media(min-width:1201px)]:p-2.5 [@media(min-width:1700px)]:p-3.5 text-white text-[14px] md:text-[16px] [@media(min-width:1201px)]:text-[14px] [@media(min-width:1700px)]:text-[16px] mt-6 pulse-red w-[95%] mx-auto rounded-[8px]"
        >
          <span className="[@media(max-width:1100px)]:inline [@media(min-width:1201px)]:hidden whitespace-nowrap">
            Report Flood
          </span>
          <span className="[@media(max-width:1100px)]:hidden [@media(min-width:1201px)]:inline">
            Report
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ReportCard;
