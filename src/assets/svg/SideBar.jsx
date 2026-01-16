import React from "react";

const SideBar = ({ className, strokeColor="var(--light-blue)" }) => {
  return (
    <>
      <svg
        width="30"
        height="28"
        viewBox="0 0 30 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className}`}
      >
        <rect
          x="27.9737"
          y="26.5"
          width="26.4737"
          height="25"
          rx="2.5"
          transform="rotate(-180 27.9737 26.5)"
          stroke={`${strokeColor}`}
          strokeWidth="3"
        />
        <rect
          x="10.9737"
          y="26.5"
          width="9"
          height="25"
          rx="2.5"
          transform="rotate(-180 10.9737 26.5)"
          stroke={`${strokeColor}`}
          strokeWidth="3"
        />
      </svg>
    </>
  );
};

export default SideBar;
