import { FloodReportIcon, ReportedIcon, Twitter } from "@/assets/svg";
import { useState } from "react";
import { reportedFloodData, twittedData } from "../../data/reportedFloodData";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import UpVote from "@/assets/svg/UpVote";
import DownVote from "@/assets/svg/DownVote";

const ReportedFloodsModel = () => {
  const reportedFloodsTabs = [
    { name: "Flood Report Form", icon: ReportedIcon, iconColor: "#FF5F8D" },
    { name: "Tweets", icon: Twitter, iconColor: "#326AFD" },
  ];

  const [activeTab, setActiveTab] = useState("Flood Report Form");
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <>
      {/* Header */}
      <div className="flex items-center">
        <FloodReportIcon
          strokeColor="#ffffff"
          className="max-w-9.5 md:max-w-9.8"
        />
        <h2 className="text-lg md:text-[20px] [@media(min-width:1700px)]:text-2xl font-semibold">
          Reported Floods
        </h2>
      </div>

      {/* Reported Floods Tabs */}
      <div className="mt-2">
        <ul className="flex items-stretch">
          {reportedFloodsTabs.map((tab) => (
            <li
              key={tab.name}
              className={`flex gap-4 items-center w-1/2 justify-center p-2.5 transition-all text-[#A2A2AA] font-medium text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] rounded-lg md:rounded-b-none md:rounded-t-2xl cursor-pointer ${activeTab === tab.name ? "bg-black" : ""}`}
              onClick={() => {
                setActiveTab(tab.name);
                setSelectedReport(null);
              }}
            >
              <span>
                <tab.icon
                  strokeColor={tab.iconColor}
                  className="max-w-9.5 md:max-w-9.8"
                />
              </span>
              <span>{tab.name}</span>
            </li>
          ))}
        </ul>
        <ul
          className={`md:bg-(--black-50) rounded-[8px] py-4 md:px-3.5 transition-all ${activeTab === "Flood Report Form" ? "rounded-tl-none" : "rounded-tr-none"}`}
        >
          {!selectedReport ? (
            <>
              {activeTab === "Flood Report Form" &&
                reportedFloodData.map((report, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedReport(report)}
                    className="mb-4 p-2 md:p-4 bg-black md:bg-[rgba(162,162,162,0.15)] rounded-[8px] flex items-center justify-between gap-2.5 last:mb-0 cursor-pointer"
                  >
                    <p className="font-medium text-[12px] md:text-[16px] [@media(min-width:1700px)]:text-lg text-[#A2A2A2] w-fit">
                      {report.user}
                    </p>
                    <p className="font-medium text-[12px] [@media(min-width:1700px)]:text-[14px] text-[#A2A2A2] w-fit flex items-center">
                      <span className="md:border-r border-[#A2A2A2] pr-2 mr-2">
                        {report.date}
                      </span>
                      <span className="hidden md:block">{report.time}</span>
                    </p>
                    <p className="line-clamp-1 font-medium text-[10px] md:text-[12px] [@media(min-width:1700px)]:text-[14px] text-white max-w-[25%]">
                      {report.location.area}
                    </p>
                    <p className="text-[12px] [@media(min-width:1700px)]:text-[14px] w-fit whitespace-nowrap flex items-center font-medium">
                      <span className="flex items-center gap-1 border-r border-white pr-2 mr-2 text-[#32C545]">
                        {report.votes.upvote}
                        <UpVote className="w-3 md:w-4" strokeColor="#32C545" />
                      </span>
                      <span className="flex items-center gap-1 text-[#FF2463]">
                        {report.votes.downvote}
                        <DownVote className="w-3 md:w-4" strokeColor="#FF2463" />
                      </span>
                    </p>
                    <p className="w-fit">
                      <ChevronRight className="text-[#8C8C8C]" />
                    </p>
                  </li>
                ))}
              {activeTab === "Tweets" &&
                twittedData.map((tweet, index) => (
                  <li
                    key={index}
                    className="mb-4 p-2 md:p-4 bg-black md:bg-[rgba(162,162,162,0.15)] rounded-[8px] last:mb-0"
                  >
                    <div className="flex items-center gap-10">
                      <span className="font-medium text-[12px] md:text-[16px] [@media(min-width:1700px)]:text-lg text-[#A2A2A2]">
                        {tweet.user}
                      </span>
                      <p className="font-medium text-[12px] [@media(min-width:1700px)]:text-[14px] text-[#A2A2A2] w-fit flex items-center">
                        <span className="md:border-r border-[#A2A2A2] pr-2 mr-2">
                          {tweet.date}
                        </span>
                        <span className="hidden md:block">{tweet.time}</span>
                      </p>
                    </div>
                    <div className="text-[#A2A2A2] font-medium text-[12px] [@media(min-width:1700px)]:text-[14px] mt-4">
                      <p>{tweet.twitter}</p>
                      <p>{tweet.message}</p>
                      <p>{tweet.tags.join(" ")}</p>
                    </div>
                  </li>
                ))}
            </>
          ) : (
            /* ================= DETAIL VIEW ================= */
            <div className="bg-black md:bg-[rgba(162,162,162,0.15)] rounded-[8px] p-3 md:p-6">
              {/* Back Button */}
              <button
                onClick={() => setSelectedReport(null)}
                className="text-[#8C8C8C] mb-4 flex items-center gap-2 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6 -ml-3" />
              </button>

              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-[12px] md:text-[16px] [@media(min-width:1700px)]:text-lg text-white">
                  {selectedReport.user}
                </h3>
                <p className="text-[#A2A2A2] text-[12px] [@media(min-width:1700px)]:text-[14px] font-medium">
                  {selectedReport.date} | {selectedReport.time}
                </p>
                <p className="text-[12px] [@media(min-width:1700px)]:text-[14px] w-fit whitespace-nowrap flex items-center font-medium">
                  <span className="flex items-center gap-1 border-r border-white pr-2 mr-2 text-[#32C545]">
                    {selectedReport.votes.upvote}
                    <UpVote className="w-3 md:w-4" strokeColor="#32C545" />
                  </span>
                  <span className="flex items-center gap-1 text-[#FF2463]">
                    {selectedReport.votes.downvote}
                    <DownVote className="w-3 md:w-4" strokeColor="#FF2463" />
                  </span>
                </p>
              </div>

              {/* Location */}
              <p className="text-white mb-4 font-medium text-[12px] [@media(min-width:1700px)]:text-[14px]">
                {selectedReport.location.area}
              </p>

              {/* Images */}
              <div className="grid grid-cols-3 gap-1 mb-4">
                {selectedReport.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="rounded-sm object-cover h-auto aspect-[1.53/1] w-full"
                  />
                ))}
              </div>

              {/* Message */}
              <p className="text-[12px] font-medium text-[#A2A2A2] mb-1">
                Message
              </p>
              <div className="text-white italic mb-10 text-[12px] [@media(min-width:1700px)]:text-[14px]">
                “{selectedReport.message}”
              </div>

              {/* Actions */}
              <div className="flex justify-center font-medium gap-8 text-[12px] [@media(min-width:1700px)]:text-[14px]">
                <button className="bg-[#FF2463] text-white px-6 py-4 min-w-[40%] rounded-lg flex items-center justify-center gap-2 cursor-pointer">
                  <DownVote className="w-4 h-4" strokeColor="#ffffff" />
                  Down vote
                </button>
                <button className="bg-[#32C545] text-white px-6 py-4 min-w-[40%] rounded-lg flex items-center justify-center gap-2 cursor-pointer">
                  <UpVote className="w-4 h-4" strokeColor="#ffffff" />
                  Upvote
                </button>
              </div>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default ReportedFloodsModel;
