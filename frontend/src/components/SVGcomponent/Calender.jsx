import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calender = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    setStartDate(date);
    setIsOpen(false);
    onDateChange(date);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <span
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1.6H15.2C15.6418 1.6 16 1.95818 16 2.4V15.2C16 15.6418 15.6418 16 15.2 16H0.8C0.358176 16 0 15.6418 0 15.2V2.4C0 1.95818 0.358176 1.6 0.8 1.6H4V0H5.6V1.6H10.4V0H12V1.6ZM1.6 6.4V14.4H14.4V6.4H1.6ZM3.2 9.6H7.2V12.8H3.2V9.6Z"
            fill="#1C1853"
            fillOpacity="0.3"
          />
        </svg>
      </span>

      {isOpen && (
        <div style={{ position: "absolute", zIndex: 1 }}>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            inline
          />
        </div>
      )}
    </div>
  );
};

export default Calender;
