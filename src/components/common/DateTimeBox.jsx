import React from "react";

const DateTimeBox = ({ date, time }) => {
  return (
    <div className="bg-(--black-75) text-white font-medium text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] py-2 px-5 lg:px-7 rounded-[8px] flex gap-3 md:gap-6 items-center whitespace-nowrap">
      <span>{date}</span>
      <span>{time}</span>
    </div>
  );
};

export default DateTimeBox;
