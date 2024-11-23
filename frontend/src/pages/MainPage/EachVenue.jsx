import React, { useContext, useEffect} from "react";
import styles from "./EachVenue.module.css";
import Concert from "@/components/SVGcomponent/Concert";
import GreaterThan from "@/components/SVGcomponent/GreaterThan";
import Facebook from "@/components/SVGcomponent/Facebook";
import Instagram from "@/components/SVGcomponent/Instagram";

import { LocationPopUpContext } from "@/contexts/locationPopContext";

const EachVenue = ({ data}) => {
  
  const {setVenueData, setPopup, popUp} = useContext(LocationPopUpContext)
  
  const popUpHandler = async () => {
    setVenueData({...data})
    setPopup(true)
  };

  

  useEffect(() => {
    // Scroll to the top whenever `popUp` is set to true
    if (popUp) {
      window.scrollTo(0, 0);
    }
  }, [popUp]);
  return (
    <>
      <div className={`${styles.venueCard}`}>
        <div className={`flex justify-between items-center`}>
          <h2 className={`text-[#0A2259] font-semibold `}>{data.name}</h2>
          <p className={`flex items-center gap-1 text-[#3D69C5] text-[10px]`}>
            <Concert />
            {data.venue_type}
          </p>
        </div>

        <div className={`${styles.mobile} `}>
          <div className={`flex gap-3 items-center justify-between`}>
            <p className={`text-[#0A2259] text-[13px] ${styles.mobile}`}>
              {data.address}
            </p>

            <div className={`flex items-center gap-1`}>
              <Facebook />
              <Instagram />
            </div>
          </div>

          <button onClick={popUpHandler} className={`${styles.btn}`}>
            See Details <GreaterThan />
            {/* Lets check something */}
          </button>
        </div>

        <p className={`text-[#0A2259] text-[13px] ${styles.desktop}`}>
          {data.address}
        </p>

        <div className={` ${styles.socialsAndDetails} `}>
          <div className={`flex items-center gap-1`}>
            <Facebook />
            <Instagram />
          </div>

          <button onClick={popUpHandler} className={`${styles.btn}`}>
            See Details <GreaterThan />
            {/* Lets check something */}
          </button>
        </div>
      </div>

      
    </>
  );
};
//okay
export default EachVenue;
