import React, { useEffect, useState } from "react";
import styles from "./EachVenue.module.css";
import Concert from "@/components/SVGcomponent/Concert";
import GreaterThan from "@/components/SVGcomponent/GreaterThan";
import Facebook from "@/components/SVGcomponent/Facebook";
import Instagram from "@/components/SVGcomponent/Instagram";
import Modal from "@/components/general/Modal";
import EventPopUp from "./EventPopUp";
import { api } from "@/services/api.route";

const EachVenue = ({ data }) => {
  const [popUp, setPopUp] = useState(false);
  const [events, setEvents] = useState([]); // State to store fetched events
  const [loading, setLoading] = useState(false); // Loading indicator
  const popUpHandler = async () => {
    setPopUp((prev) => !prev);

    if (!popUp) {
      // Fetch events when the popup opens
      try {
        setLoading(true);
        const res = await api.get(`/api/v1/events`, {
          params: { venue_id: data.id }, // Pass venue-specific params
        });
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // const getEvents = async () => {
  //   try {
  //     const res = await api.get("/api/v1/events");
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(getEvents(), []);

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

      {popUp && (
        <Modal modalHandler={popUpHandler}>
          <EventPopUp
            data={data}
            cancel={popUpHandler}
            events={events} // Pass fetched events
            loading={loading} // Pass loading state
          />
        </Modal>
      )}
    </>
  );
};
//okay
export default EachVenue;
