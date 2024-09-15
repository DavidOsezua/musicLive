import React, { useState } from "react";
import "./Switch.css"; // Import the CSS for the switch styling

const Switch = ({ isOn, handleToggle }) => {
  return (
    <div className="switch-container">
      <input
        className="switch-checkbox"
        id={`switch-new`}
        type="checkbox"
        checked={isOn}
        onChange={handleToggle}
      />
      <label
        className="switch-label"
        htmlFor={`switch-new`}
        style={{ background: isOn ? "#06D6A0" : "#FF595E" }}
      >
        <span className={`switch-button`} />
      </label>
    </div>
  );
};

export default Switch;
