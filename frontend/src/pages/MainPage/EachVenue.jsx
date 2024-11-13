import React from "react";
import styles from "./EachVenue.module.css";
import Concert from "@/components/SVGcomponent/Concert";
import GreaterThan from "@/components/SVGcomponent/GreaterThan";
import Facebook from "@/components/SVGcomponent/Facebook";
import Instagram from "@/components/SVGcomponent/Instagram";

const EachVenue = () => {
  return (
    <div className={`${styles.venueCard}`}>
      <div className={`flex justify-between items-center`}>
        <h2 className={`text-[#0A2259] font-semibold `}>O2 Arena</h2>
        <p className={`flex items-center gap-1 text-[#3D69C5] text-[10px]`}>
          <Concert />
          Concert
        </p>
      </div>

      <p className={`text-[#0A2259] text-[13px]`}>
        2200 Harvard St, Sacramento, CA 95815
      </p>

      <div
        className={`${styles.socialsAndDetails}`}
      >
        <div className={`flex items-center gap-1`}>
          <Facebook />
          <Instagram />
        </div>

        <button onClick={() => {}} className={`${styles.btn}`}>
          See Details <GreaterThan />
          {/* Lets check something */}
        </button>
      </div>
    </div>
  );
};
//okay
export default EachVenue;
