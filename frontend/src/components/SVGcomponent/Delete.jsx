import React from "react";

const Delete = () => {
  return (
    <span className="fill-[#0E3386] hover:fill-[#fff]">
      <svg
        width="27"
        height="26"
        className=" transition-colors duration-300 bg-[#E6ECF8]   hover:bg-[#0E3386]  rounded-md"
        viewBox="0 0 27 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" width="26" height="26" rx="3" fill="" />
        <path
          d="M9 7.6V4.9C9 4.40295 9.40295 4 9.9 4H17.1C17.5971 4 18 4.40295 18 4.9V7.6H22.5V9.4H20.7V21.1C20.7 21.5971 20.2971 22 19.8 22H7.2C6.70295 22 6.3 21.5971 6.3 21.1V9.4H4.5V7.6H9ZM10.8 5.8V7.6H16.2V5.8H10.8Z"
          className="   fill-[#3D69C580] hover:fill-[#a8b6e2]"
        />
      </svg>
    </span>
  );
};

export default Delete;
