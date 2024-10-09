import React, { useState } from "react";
import styles from "./LocationAndDates.module.css";
import Location from "../SVGcomponent/Location";
import Calender from "../SVGcomponent/Calender";
import Search from "../SVGcomponent/Search";
import Line from "../SVGcomponent/Line";
import { useNavigate } from "react-router-dom";

const LocationAndDates = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearchBtn = (e) => {
    e.preventDefault();
    console.log("Selected date:", selectedDate);
    console.log("Selected location:", selectedLocation);

    navigate("/venues", {

      state: { date: selectedDate, location: selectedLocation },
    });
  };

  return (
    <div className={`${styles.locationAndDatesContainer}`}>
      {/* Location Input */}
      <div className={`${styles.inputContainer}`}>
        <Location />
        <div>
          <label></label>
          <input
            placeholder="Greater Sacramento"
            className={`${styles.input}`}
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          />
        </div>
      </div>

      <Line />

      {/* Date Input */}
      <div className={`${styles.inputContainer}`}>
        <Calender onDateChange={handleDateChange} />
        <div className="w-full">
          <input
            id="date-input"
            placeholder="Add dates"
            className={`${styles.input}`}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* Search Button */}
      <div className={`${styles.search}`}>
        <Search searchFunc={handleSearchBtn} />
      </div>
    </div>
  );
};

export default LocationAndDates;
