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
    // console.log(s)

    const date = new Date(selectedDate);
    const formattedDate = date.toLocaleDateString("en-CA");

    navigate(`/venues?date=${formattedDate}`, {
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
            disabled
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
            placeholder="Add date"
            disabled
            className={`${styles.dateInput}`}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className={`${styles.search}`}>
          <Search searchFunc={handleSearchBtn} />
        </div>
      </div>

      {/* Search Button */}
    </div>
  );
};

export default LocationAndDates;
