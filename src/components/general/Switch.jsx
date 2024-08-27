import React, { useState } from "react";
import "./Switch.css"; // Import the CSS for the switch styling

const Switch = ({ isToggled, handleToggle }) => {
  return (
    <button
      className={`toggle-btn ${isToggled ? "toggle" : ""}`}
      onClick={handleToggle}
    >
      <div className={`thumb ${isToggled ? "active" : ""} `}></div>
    </button>
  );
};

export default Switch;
