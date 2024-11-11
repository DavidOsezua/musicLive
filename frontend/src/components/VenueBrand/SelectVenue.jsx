import React from "react";
import GreaterThan from "../SVGcomponent/GreaterThan";
import styles from "./SelectBand.module.css";
import AdminSearch from "../Dashboard/AdminSearch";
import { venueImage } from "@/assets";
import Close from "../general/Close";

const EachVenue = () => {
  return (
    <div className={`flex gap-4 items-center justify-between`}>
      <div className={`flex gap-4 items-center`}>
        <img
          src={venueImage}
          className={`w-[40px] h-[40px] rounded-md object-cover`}
        />

        <div className={`flex flex-col gap-0`}>
          <p className={`text-[#0A2259]`}>Golden 1 Center</p>
          <span className={`text-[#3D69C5]`}>Stadium</span>
        </div>
      </div>

      <button>
        <GreaterThan />
      </button>
    </div>
  );
};
const SelectVenue = ({ close }) => {
  return (
    <div className={`${styles.cardContainer}`}>
      <div className={`flex justify-between items-center`}>
        <p>Select Venue</p>

        <button onClick={close}>
          <Close />
        </button>
      </div>
      <AdminSearch />

      {/* ALL BAND DATA GOES HERE. CURRENTLY IT DISPLAYS MOCK DATA */}
      <div className={`${styles.allBands}`}>
        {Array.from({ length: 10 }).map((item) => (
          <>
            <EachVenue />
            <div className={`${styles.hr}`}></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default SelectVenue;
