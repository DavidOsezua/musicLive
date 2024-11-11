import React from "react";
import styles from "./SelectBand.module.css";
import AdminSearch from "../Dashboard/AdminSearch";
import { band1, venueImage } from "@/assets";
import Close from "../general/Close";
import ArrowRight from "../SVGcomponent/ArrowRight";
import GreaterThan from "../SVGcomponent/GreaterThan";

const EachBand = () => {
  return (
    <div className={`flex gap-4 items-center justify-between`}>
      <div className={`flex gap-4 items-center`}>
        <img
          src={band1}
          className={`w-[40px] h-[40px] rounded-md object-cover`}
        />

        <div className={`flex flex-col gap-0`}>
          <p className={`text-[#0A2259]`}>Demi3D Bands</p>
          <span className={`text-[#C32FB4]`}>Blues</span>
        </div>
      </div>

      <button>
        <GreaterThan />
      </button>
    </div>
  );
};

const SelectBand = ({ close }) => {
  return (
    <div className={`${styles.cardContainer}`}>
      <div className={`flex justify-between items-center`}>
        <p>Select Band</p>

        <button onClick={close}>
          <Close />
        </button>
      </div>
      <AdminSearch />

      {/* ALL BAND DATA GOES HERE. CURRENTLY IT DISPLAYS MOCK DATA */}
      <div className={`${styles.allBands}`}>
        {Array.from({ length: 10 }).map((item) => (
          <>
            <EachBand />
            <div className={`${styles.hr}`}></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default SelectBand;
