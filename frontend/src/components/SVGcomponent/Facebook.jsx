import React from "react";

const Facebook = ({ width = 25, height = 25 }) => {
  return (
    <span className="fill-[#0E3386] hover:fill-[#fff] ">
      <svg
        width={width}
        height={height}
        viewBox="0 0 25 25"
        className=" transition-colors duration-300  hover:bg-[#0E3386]  rounded-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.8333 10.7222H16.8333L16.3889 12.5H12.8333V20.5H11.0556V12.5H7.5V10.7222H11.0556V9.05802C11.0556 7.47309 11.2206 6.89836 11.5305 6.31894C11.8404 5.73952 12.2951 5.28478 12.8745 4.97491C13.454 4.66502 14.0286 4.5 15.6136 4.5C16.0776 4.5 16.4842 4.54444 16.8333 4.63333V6.27778H15.6136C14.437 6.27778 14.0787 6.34697 13.7129 6.54257C13.4433 6.68676 13.2423 6.88772 13.0981 7.15734C12.9025 7.52308 12.8333 7.8814 12.8333 9.05802V10.7222Z"
          // className=" hover:fill-[#fff]"
        />
        <rect
          opacity="0.1"
          x="0.5"
          y="0.5"
          width="24"
          height="24"
          rx="4"
          // className="fill-[#0031A1]"
        />
      </svg>
    </span>
  );
};

export default Facebook;
