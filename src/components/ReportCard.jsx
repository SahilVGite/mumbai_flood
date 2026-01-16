import React from "react";
import { Link } from "react-router";

const ReportCard = () => {
  return (
    <div className="fixed top-8 right-8 z-10 p-0.5 bg-[#E8CBBC] rounded-2xl bg-[radial-gradient(ellipse_at_top_left,#FFE9EA,#F7000880)] pointer-events-auto max-w-100 w-full text-center">
      <div className="py-6.25 px-4 bg-[#E8CBBC] rounded-[15px]">
        <h5 className="font-medium text-2xl text-black mb-2">
          Spotted flooding in your area?
        </h5>
        <p className="text-[16px] text-black">
          Take a moment to report it and help keep your community safe!
        </p>
        <Link
          to="/report-flood"
          className="block p-3.5 text-white text-[16px] mt-6 bg-(--red-50) w-[95%] mx-auto rounded-[8px]"
        >
          Report
        </Link>
      </div>
    </div>
  );
};

export default ReportCard;
