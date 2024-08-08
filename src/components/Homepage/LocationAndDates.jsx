import React from "react";
import styles from "./LocationAndDates.module.css";
import Location from "../SVGcomponent/Location";
import Calender from "../SVGcomponent/Calender";
import Search from "../SVGcomponent/Search";
import Line from "../SVGcomponent/Line";

const LocationAndDates = () => {
  return (
    <div className={`${styles.locationAndDatesContainer}`}>
      <div className={`${styles.inputContainer}`}>
        <Location />
        <div>
          <label></label>
          <input placeholder="Great Sacramento" className={`${styles.input}`} />
        </div>
      </div>

      <Line/>

      <div className={`${styles.inputContainer}`}>
        <Calender />

        <div className={`w-full`}>
          <label></label>
          <input placeholder="Add dates" className={`${styles.input}`} />
        </div>
      </div>

      <div className={`${styles.search}`}>
        <Search />
      </div>
    </div>
  );
};

export default LocationAndDates;
