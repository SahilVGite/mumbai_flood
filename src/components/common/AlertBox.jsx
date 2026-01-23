import React from "react";

const AlertBox = ({ children }) => {
  return (
    <div className="bg-(--red-30) text-white text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] px-5 py-4 rounded-lg mb-4 [@media(min-width:1700px)]:mb-8">
      {children}
    </div>
  );
};

export default AlertBox;