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

const EventForm = ({ cancel }) => {
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

  return (
    <div className={`${styles.formContainer} relative`}>
      <button className={`absolute right-[5%]`} onClick={cancel}>
        <Close />
      </button>
      <div className={`${styles.formHeader}`}>
        <div className="flex justify-center w-full">
          <p className={`text-center text-[#0A2259B2] px-3 pt-[2rem]`}>
            If a band or venue is not available for selection, please ask the
            user to register on the website, or the admin can register it on the
            admin page.
          </p>
        </div>

        <div>
          <img src={``} onClick={``} className="cursor-pointer w-[20px]" />
        </div>
      </div>

      <form>
        <h4 className={`${styles.tellUs}`}>Create Event</h4>
        <div className={`${styles.formWrapper} `}>
          <div className={`${styles.inputContainer}`}>
            <div className="w-full">
              <label>Name</label>
              <input
                placeholder="Enter Venue Name"
                className={`${styles.input}`}
              />
            </div>
          </div>

          <div className={`${styles.inputContainer}`}>
            <div className="w-full">
              <label>Select Venue</label>

              <div className="relative">
                <input
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
                    <SelectVenue close={closeDropdown} />
                  </Modal>
                )}
              </div>
            </div>

            {/* GENRE INPUT */}

            <div className="w-full">
              <label>Select Band</label>

              <div className="relative">
                <input
                  placeholder="Select Band"
                  className={`${styles.input}`}
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
                    <SelectBand close={closeDropdown} />
                  </Modal>
                )}
              </div>
            </div>
          </div>

          <div className={`${styles.inputContainer}`}>
            <div className="w-full">
              <label>Date</label>
              <DatePicker className={`${styles.input}`} />
            </div>
            <div className="w-full">
              <label>Time</label>
              <TimePicker className={`${styles.input}`} />
            </div>
          </div>

          <Button
            text={`Create`}
            width={`w-full`}
            colored
            radius={`rounded-sm`}
            // clickFunction={Upload}
            type={`button`}
            // svg2={<ArrowLeft />}
          />
        </div>
      </form>
    </div>
  );
};

export default EventForm;
