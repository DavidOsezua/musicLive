import React, { useContext } from "react";
import styles from "./EventPopUp.module.css";
import { band1 } from "@/assets";
import Concert from "@/components/SVGcomponent/Concert";
import Facebook from "@/components/SVGcomponent/Facebook";
import Instagram from "@/components/SVGcomponent/Instagram";
import Close from "@/components/general/Close";
import Loader from "@/components/general/Loader";
import { Url } from "@/services/api.route";
import { LocationPopUpContext } from "@/contexts/locationPopContext";

const EventPopUp = () => {
  const {events, loading, venueData: data, setPopup} = useContext(LocationPopUpContext)
  
  return (
    <>
      <button
        className={`bg-[#f6f8fd] h-[40px] w-[40px] p-[0.8rem] rounded-full absolute top-0 right-[50%] translate-x-[50%] translate-y-1/2`}
        onClick={() => setPopup(false)}
      >
        <Close />
      </button>
      <div className={`${styles.cardContainer}`}>
        <h2 className={`capitalize text-[#0A2259] font-bold`}>{data?.name}</h2>
        <div className={`flex items-center justify-between gap-2`}>
          <p>Location</p>

          <div className={`flex items-center gap-2`}>
            <Concert />
            <p className={`text-[#C32FB4]`}>{data?.venue_type}</p>
          </div>
        </div>
        <div className={`flex items-center justify-between gap-2`}>
          <p className={`text-[0.8rem]`}>{data?.address}</p>

          <div className={`flex items-center gap-2`}>
            <Facebook />
            <Instagram />
          </div>
        </div>

        <p>Upcoming Live Music Event</p>

        <div className={`h-[450px] overflow-auto`}>
          <div className={`${styles.bandDetailsContainer}`}>
            {loading ? (
              <Loader />
            ) : events.length > 0 ? (
              events.map((event) => (
                <div className={`${styles.bandDetail}`}>
                  <img
                    src={`${Url}/${event.band.image1}`}
                    className={`${styles.image}`}
                  />
                  <div className={`flex items-center justify-between`}>
                    <h2 className={`text-[0.9rem] text-[#0A2259] font-bold`}>
                      {event.band.name}
                    </h2>
                    <div className={`flex items-center gap-2`}>
                      <Facebook width={20} height={20} />
                      <Instagram />
                    </div>
                  </div>
                  <p className={`text-[0.8rem]`}>{event.name}</p>
                  <p className={`text-[0.8rem]`}>{event.date}</p>
                </div>
              ))
            ) : (
              <p className="text-center">No events found for this venue</p>
            )}
            {/* {Array.from({ length: 10 }).map((item) => (
              <div className={`${styles.bandDetail}`}>
                <img src={band1} className={`${styles.image}`} />
                <div className={`flex items-center justify-between`}>
                  <h2 className={`text-[0.9rem] text-[#0A2259] font-bold`}>
                    Demi3D Bands
                  </h2>
                  <div className={`flex items-center gap-2`}>
                    <Facebook width={20} height={20} />
                    <Instagram />
                  </div>
                </div>
                <p className={`text-[0.8rem]`}>Karoke Night</p>
                <p className={`text-[0.8rem]`}>Saturday, October 19 - 7:00PM</p>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPopUp;

// import React from "react";
// import styles from "./EventPopUp.module.css";

// const EventPopUp = ({ data, events, loading, cancel }) => {
//   return (
//     <div className={styles.popUp}>
//       <h2 className="text-[#0A2259] font-semibold">{data.name}</h2>
//       <p className="text-[#0A2259]">{data.address}</p>

//       {loading ? (
//         <p>Loading events...</p>
//       ) : events.length > 0 ? (
//         <ul>
//           {events.map((event) => (
//             <li key={event.id}>
//               <p>{event.name}</p>
//               <p>{event.date}</p>
//               <p>{event.time}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No events found for this venue.</p>
//       )}

//       <button onClick={cancel} className={styles.closeBtn}>
//         Close
//       </button>
//     </div>
//   );
// };

// export default EventPopUp;
