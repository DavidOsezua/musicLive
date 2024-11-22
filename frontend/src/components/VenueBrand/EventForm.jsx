import React, { useState } from "react";
import styles from "./EventForm.module.css";
import ArrowDown from "../SVGcomponent/ArrowDown";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dropdown from "../general/Dropdown";
import { TimePicker } from "@mui/x-date-pickers";
import { FaTimes } from "react-icons/fa";
import { genre, venueType } from "../../data/data";
import Button from "../general/Button";
import Close from "../general/Close";
import Modal from "../general/Modal";
import SelectVenue from "./SelectVenue";
import SelectBand from "./SelectBand";
import { createEvent } from "@/pages/MainPage/router";
import Loader from "../general/Loader";
import Success from "../general/Success";
import Failed from "../general/Failed";

const EventForm = ({ cancel, getAllEventData, setShowModal, showModal }) => {
  const [formData, setFormData] = useState({
    eventName: "",
    venue: null,
    band: null,
    date: null,
    time: null,
  });

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Single state to track which dropdown is open ('venue' or 'genre')
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdownType) => {
    setActiveDropdown((prev) => (prev === dropdownType ? null : dropdownType));
  };

  const modalHandler = () => {
    setActiveDropdown(null);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
    modalHandler();
  };

  const handleBandSelect = (selectedBand) => {
    setFormData((prev) => ({ ...prev, band: selectedBand }));
    console.log(selectedBand);
    closeDropdown(); // Close dropdown after selection
  };
  const handleVenueSelect = (selectedVenue) => {
    setFormData((prev) => ({ ...prev, venue: selectedVenue }));
    console.log(selectedVenue);
    closeDropdown(); // Close dropdown after selection
  };

  const formHandler = async (e) => {
    e.preventDefault();

    //show a loader
    setLoader(true);

    if (
      !formData.eventName ||
      !formData.band ||
      !formData.venue ||
      !formData.date ||
      !formData.time
    ) {
      // setLoader(true);
      setError("All Fields Required");
      setIsSubmitted(false);
      setShowModal(true);
      setLoader(false);
      return;
    }
    console.log(formData.band.id);
    // Prepare data for submission
    const data = {
      band_id: formData.band.id,
      venue_id: formData.venue.id,
      name: formData.eventName,
      date: formData.date.toISOString().split("T")[0], // Extract only the date portion (e.g., "2024-11-20")
      time: formData.time.format("HH:mm"), // Keep time as is
    };

    try {
      await createEvent(data);
      if (getAllEventData) getAllEventData();
      setIsSubmitted(true);
      setShowModal(true);

      setLoader(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoader(false);
    }
    setLoader(false);
  };

  return (
    <>
      <div className={`${styles.formContainer} relative`}>
        <button className={`absolute right-[5%]`} onClick={cancel}>
          <Close />
        </button>
        <div className={`${styles.formHeader}`}>
          <div className="flex justify-center w-full">
            <p className={`text-center text-[#0A2259B2] px-3 pt-[2rem]`}>
              If a band or venue is not available for selection, please ask the
              user to register on the website, or the admin can register it on
              the admin page.
            </p>
          </div>

          <div>
            <img src={``} onClick={``} className="cursor-pointer w-[20px]" />
          </div>
        </div>

        <form onSubmit={formHandler}>
          <h4 className={`${styles.tellUs}`}>Create Event</h4>
          <div className={`${styles.formWrapper} `}>
            <div className={`${styles.inputContainer}`}>
              <div className="w-full">
                <label>Name</label>
                <input
                  placeholder="Enter Venue Name"
                  className={`${styles.input}`}
                  value={formData.eventName}
                  onChange={(e) =>
                    setFormData((formData) => ({
                      ...formData,
                      eventName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className={`${styles.inputContainer}`}>
              <div className="w-full">
                <label>Select Venue</label>

                <div className="relative">
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
                    <Modal modalHandler={modalHandler}>
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
                    <Modal modalHandler={modalHandler}>
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
              <div className="w-full">
                <label>Date</label>
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
              text={`Create`}
              width={`w-full`}
              colored
              radius={`rounded-sm`}
              // clickFunction={formHandler}
              // type={`button`}
              // svg2={<ArrowLeft />}
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
        <Modal modalHandler={cancel}>
          {isSubmitted ? (
            <Success
              modalHandler={cancel} // Close modal when Success is clicked
              message={"Submitted Successfully"}
              description="Band under review, you will be notified via email once it is approved."
            />
          ) : (
            <Failed
              modalHandler={() => setShowModal(false)} // Close modal when Failed is clicked
              message={error}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default EventForm;
