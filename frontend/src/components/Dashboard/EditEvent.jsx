// import React, { useEffect, useState } from "react";
// import Loader from "../general/Loader";
// import Modal from "../general/Modal";
// import Button from "../general/Button";
// import { DatePicker, TimePicker } from "@mui/x-date-pickers";
// import SelectBand from "../VenueBrand/SelectBand";
// import ArrowDown from "../SVGcomponent/ArrowDown";
// import SelectVenue from "../VenueBrand/SelectVenue";
// import Close from "../general/Close";
// import styles from "./EditEvent.module.css";
// import { api } from "@/services/api.route";

// const EditEvent = ({ item }) => {
//   const [formData, setFormData] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const [error, setError] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   // Single state to track which dropdown is open ('venue' or 'genre')
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const toggleDropdown = (dropdownType) => {
//     setActiveDropdown((prev) => (prev === dropdownType ? null : dropdownType));
//   };

const modalHandler = () => {
  setActiveDropdown(null);
};

//   const closeDropdown = () => {
//     setActiveDropdown(null);
//     modalHandler();
//   };

//   const handleBandSelect = (selectedBand) => {
//     setFormData((prev) => ({ ...prev, band: selectedBand }));
//     console.log(selectedBand);
//     closeDropdown(); // Close dropdown after selection
//   };
//   const handleVenueSelect = (selectedVenue) => {
//     setFormData((prev) => ({ ...prev, venue: selectedVenue }));
//     console.log(selectedVenue);
//     closeDropdown(); // Close dropdown after selection
//   };

//   async function getOneEventData() {
//     try {
//       const res = await api.get(`/api/v1/events/all`, {
//         params: { venue_id: item.ID }, // Pass venue-specific params
//       });
//       const data = await res.data;
//       const eventId = item.ID;
//       const event = data.find((b) => b.id === eventId);
//       console.log(data);
//       console.log(event);
//       if (event) {
//         // console.log("Band:", band);
//         setFormData({
//           name: event.name || "",
//           venue: event.venue_id,
//           band: event.band_id,
//             date: event.date,
//             time: event.time,
//         });

//         // setdataObj(event);
//       } else {
//         console.log("Event not found");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     getOneEventData();
//   }, []);

//   const formHandler = async (e) => {
//     e.preventDefault();

//     //show a loader
//     setLoader(true);

//     if (
//       !formData.eventName ||
//       !formData.band ||
//       !formData.venue ||
//       !formData.date ||
//       !formData.time
//     ) {
//       // setLoader(true);
//       setError("All Fields Required");
//       setIsSubmitted(false);
//       setShowModal(true);
//       setLoader(false);
//       return;
//     }
//     console.log(formData.band.id);
//     // Prepare data for submission
//     const data = {
//       band_id: formData.band.id,
//       venue_id: formData.venue.id,
//       name: formData.eventName,
//       date: formData.date.toISOString().split("T")[0], // Extract only the date portion (e.g., "2024-11-20")
//       time: formData.time.format("HH:mm"), // Keep time as is
//     };

//     try {
//       await createEvent(data);
//       if (getAllEventData) getAllEventData();
//       setIsSubmitted(true);
//       setShowModal(true);

//       setLoader(false);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoader(false);
//     }
//     setLoader(false);
//   };
//   return (
//     <>
//       <div className={`${styles.formContainer} relative`}>
//         <button className={`absolute right-[5%]`} onClick={() => {}}>
//           <Close />
//         </button>
//         <div className={`${styles.formHeader}`}>
//           <div className="flex justify-center w-full">
//             <p className={`text-center text-[#0A2259B2] px-3 pt-[2rem]`}>
//               If a band or venue is not available for selection, please ask the
//               user to register on the website, or the admin can register it on
//               the admin page.
//             </p>
//           </div>

//           <div>
//             <img src={``} onClick={``} className="cursor-pointer w-[20px]" />
//           </div>
//         </div>

//         <form onSubmit={formHandler}>
//           <h4 className={`${styles.tellUs}`}>Create Event</h4>
//           <div className={`${styles.formWrapper} `}>
//             <div className={`${styles.inputContainer}`}>
//               <div className="w-full">
//                 <label>Name</label>
//                 <input
//                   placeholder="Enter Venue Name"
//                   className={`${styles.input}`}
//                   value={formData.eventName}
//                   onChange={(e) =>
//                     setFormData((formData) => ({
//                       ...formData,
//                       eventName: e.target.value,
//                     }))
//                   }
//                 />
//               </div>
//             </div>

//             <div className={`${styles.inputContainer}`}>
//               <div className="w-full">
//                 <label>Select Venue</label>

//                 <div className="relative">
//                   <input
//                     value={formData.venue?.name}
//                     placeholder="Select venue type"
//                     className={`${styles.input}`}
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-4 top-4"
//                     onClick={() => toggleDropdown("venue")}
//                   >
//                     <ArrowDown />
//                   </button>

//                   {activeDropdown === "venue" && (
//                     <Modal modalHandler={modalHandler}>
//                       <SelectVenue
//                         close={closeDropdown}
//                         onVenueSelection={handleVenueSelect}
//                       />
//                     </Modal>
//                   )}
//                 </div>
//               </div>

//               {/* GENRE INPUT */}

//               <div className="w-full">
//                 <label>Select Band</label>

//                 <div className="relative">
//                   <input
//                     value={formData.band?.name}
//                     placeholder="Select Band"
//                     className={`${styles.input}`}
//                     readOnly
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-4 top-4"
//                     onClick={() => toggleDropdown("Band")}
//                   >
//                     <ArrowDown />
//                   </button>

//                   {/* BAND DropDown  */}
//                   {activeDropdown === "Band" && (
//                     <Modal modalHandler={modalHandler}>
//                       <SelectBand
//                         close={closeDropdown}
//                         onBandSelection={handleBandSelect}
//                       />
//                     </Modal>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className={`${styles.inputContainer}`}>
//               <div className="w-full">
//                 <label>Date</label>
//                 <DatePicker
//                   value={formData.date}
//                   onChange={(newValue) =>
//                     setFormData({ ...formData, date: newValue })
//                   }
//                   className={`${styles.input}`}
//                 />
//               </div>
//               <div className="w-full">
//                 <label>Time</label>
//                 <TimePicker
//                   value={formData.time}
//                   onChange={(newValue) =>
//                     setFormData({ ...formData, time: newValue })
//                   }
//                   className={`${styles.input}`}
//                 />
//               </div>
//             </div>

//             <Button
//               text={`Create`}
//               width={`w-full`}
//               colored
//               radius={`rounded-sm`}
//               // clickFunction={formHandler}
//               // type={`button`}
//               // svg2={<ArrowLeft />}
//             />
//           </div>
//         </form>
//       </div>
//       {loader && (
//         <Modal>
//           <Loader />
//         </Modal>
//       )}
//       {showModal && (
//         <Modal modalHandler={() => setShowModal(false)}>
//           {isSubmitted ? (
//             <Success
//               modalHandler={() => setShowModal(false)} // Close modal when Success is clicked
//               message={"Submitted Successfully"}
//               description="Band under review, you will be notified via email once it is approved."
//             />
//           ) : (
//             <Failed
//               modalHandler={() => setShowModal(false)} // Close modal when Failed is clicked
//               message={error}
//             />
//           )}
//         </Modal>
//       )}
//     </>
//   );
// };

// export default EditEvent;

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Loader from "../general/Loader";
import Modal from "../general/Modal";
import Button from "../general/Button";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import SelectBand from "../VenueBrand/SelectBand";
import ArrowDown from "../SVGcomponent/ArrowDown";
import SelectVenue from "../VenueBrand/SelectVenue";
import Close from "../general/Close";
import Success from "../general/Success";
import Failed from "../general/Failed";
import styles from "./EditEvent.module.css";
import { api } from "@/services/api.route";

const EditEvent = ({ item, cancel }) => {
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdownType) => {
    setActiveDropdown((prev) => (prev === dropdownType ? null : dropdownType));
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const handleBandSelect = (selectedBand) => {
    setFormData((prev) => ({ ...prev, band: selectedBand }));
    closeDropdown();
  };

  const handleVenueSelect = (selectedVenue) => {
    setFormData((prev) => ({ ...prev, venue: selectedVenue }));
    closeDropdown();
  };

  const modalHandler = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    setFormData({
      name: item.name,
      venue: item.venue,
      band: item.band,
      date: dayjs(item.date),
      time: dayjs(item.time, "HH:mm"),
    });
  }, []);

  console.log(item);

  const formHandler = async (e) => {
    e.preventDefault();
    console.log("Editing event");
    // setLoader(true);

    const data = {};
    if (formData.date) data.date = dayjs(formData.date).format("YYYY-MM-DD");
    if (formData.time) data.time = dayjs(formData.time).format("HH:mm");
    if (formData.name) data.name = formData.name;
    if (formData.band) data.band_id = formData.band.id;
    if (formData.venue) data.venue_id = formData.venue.id;

    if (Object.entries(data).length == 0) {
      setError("Nothing to update");
      setIsSubmitted(false);
      setShowModal(true);
      setLoader(false);
      return;
    }

    console.log(data);

    try {
      await api.put(`/api/v1/events/${item.ID}`, data);
      setIsSubmitted(true);
      setShowModal(true);
    } catch (error) {
      setError(error.message || "Submission failed");
      setIsSubmitted(false);
      setShowModal(true);
    } finally {
      setLoader(false);
    }
  };

  //cancelAll
  const cancelAll = () => {
    setShowModal(false);
    cancel();
  };

  return (
    <>
      <div className={`${styles.formContainer} relative`}>
        <button className="absolute right-[5%]" onClick={cancel}>
          <Close />
        </button>
        <div className={`${styles.formHeader}`}>
          <p className="text-center text-[#0A2259B2] px-3 pt-[2rem]">
            If a band or venue is not available for selection, please ask the
            user to register on the website, or the admin can register it on the
            admin page.
          </p>
        </div>

        <form onSubmit={formHandler}>
          <h4 className={`${styles.tellUs}`}>Create Event</h4>
          <div className={`${styles.formWrapper}`}>
            {" "}
            <div className={`${styles.inputContainer}`}>
              {" "}
              <div className="w-full">
                <label>Name</label>{" "}
                <input
                  placeholder="Enter Venue Name"
                  className={`${styles.input}`}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((formData) => ({
                      ...formData,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className={`${styles.inputContainer}`}>
              {" "}
              <div className="w-full">
                <label>Select Venue</label>{" "}
                <div className="relative">
                  {" "}
                  <input
                    value={formData.venue?.name}
                    placeholder="Select venue type"
                    className={`${styles.input}`}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-4"
                    onClick={() => toggleDropdown("venue")}
                  >
                    <ArrowDown />
                  </button>
                  {activeDropdown === "venue" && (
                    <Modal modalHandler={closeDropdown}>
                      <SelectVenue
                        close={closeDropdown}
                        onVenueSelection={handleVenueSelect}
                      />
                    </Modal>
                  )}
                </div>
              </div>
              {/* GENRE INPUT */}
              <div className="w-full">
                <label>Select Band</label>

                <div className="relative">
                  <input
                    value={formData.band?.name}
                    placeholder="Select Band"
                    className={`${styles.input}`}
                    readOnly
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-4"
                    onClick={() => toggleDropdown("Band")}
                  >
                    <ArrowDown />
                  </button>

                  {/* BAND DropDown  */}
                  {activeDropdown === "Band" && (
                    <Modal modalHandler={closeDropdown}>
                      <SelectBand
                        close={closeDropdown}
                        onBandSelection={handleBandSelect}
                      />
                    </Modal>
                  )}
                </div>
              </div>
            </div>
            <div className={`${styles.inputContainer}`}>
              {" "}
              <div className="w-full">
                <label>Date</label>{" "}
                <DatePicker
                  value={formData.date}
                  onChange={(newValue) =>
                    setFormData({ ...formData, date: newValue })
                  }
                  className={`${styles.input}`}
                />
              </div>
              <div className="w-full">
                <label>Time</label>
                <TimePicker
                  value={formData.time}
                  onChange={(newValue) =>
                    setFormData({ ...formData, time: newValue })
                  }
                  className={`${styles.input}`}
                />
              </div>
            </div>
            <Button
              text="Edit"
              width="w-full"
              colored
              radius="rounded-sm"
              disabled={loader}
            />
          </div>
        </form>
      </div>

      {loader && (
        <Modal>
          <Loader />
        </Modal>
      )}

      {showModal && (
        <Modal modalHandler={cancelAll}>
          {isSubmitted ? (
            <Success
              modalHandler={cancelAll}
              message="Submitted Successfully"
              description="The event has been created successfully."
            />
          ) : (
            <Failed
              modalHandler={() => setShowModal(false)}
              message={error || "An error occurred"}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default EditEvent;
