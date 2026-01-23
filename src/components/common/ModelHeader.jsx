import React from "react";

const ModelHeader = ({ Icon, title }) => {
  return (
    <div className="flex items-center">
      <Icon strokeColor="#ffffff" className="max-w-9.5 md:max-w-9.8" />
      <h2 className="text-lg md:text-[20px] [@media(min-width:1700px)]:text-2xl font-semibold">
        {title}
      </h2>
    </div>
  );
};

export default ModelHeader;
