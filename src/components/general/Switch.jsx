import React, { useState } from "react";
import "./Switch.css"; // Import the CSS for the switch styling

const Switch = ({ isToggled, handleToggle, status }) => {
  // console.log(status);
  return (
    <button
      className={`toggle-btn ${isToggled ? "toggle" : ""} ${
        status === "Approved" ? "toggle" : ""
      }`}
      onClick={handleToggle}
    >
      <div
        className={`thumb ${isToggled ? "active" : ""}  ${
          status === "Approved" ? "active" : ""
        }`}
      ></div>
    </button>
  );
};

export default Switch;
