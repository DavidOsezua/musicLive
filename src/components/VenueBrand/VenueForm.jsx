import React, { useState } from "react";
import styles from "./VenueForm.module.css";
import ArrowDown from "../SVGcomponent/ArrowDown";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dropdown from "../general/Dropdown";
import { TimePicker } from "@mui/x-date-pickers";
import { FaTimes } from "react-icons/fa";
import { genre, venueType } from "../../data/data";

const VenueForm = () => {
  // Single state to track which dropdown is open ('venue' or 'genre')
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [tokenState, setTokenState] = useState("USDT");

  const toggleDropdown = (dropdownType) => {
    setActiveDropdown((prev) => (prev === dropdownType ? null : dropdownType));
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const tokenStateHandler = (currentToken) => {
    setTokenState(currentToken);
  };

  return (
    <div className={`${styles.formContainer} `}>
      <div className={`${styles.inputContainer}`}>
        <div className="w-full">
          <label>Name</label>
          <input placeholder="Enter Venue Name" className={`${styles.input}`} />
        </div>

        <div className="w-full">
          <label>Email</label>
          <input placeholder="Enter email" className={`${styles.input}`} />
        </div>
      </div>

      <div className={`${styles.inputContainer}`}>
        <div className="w-full">
          <label>Venue type</label>

          <div className="relative">
            <input
              placeholder="Select venue type"
              className={`${styles.input}`}
              readOnly
            />
            <button
              type="button"
              className="absolute right-4 top-4"
              onClick={() => toggleDropdown("venue")}
            >
              <ArrowDown />
            </button>

            {activeDropdown === "venue" && (
              <div className="absolute top-0 w-full bg-[#F6F8FD] z-50 p-[1rem] border-[#2659C34D] border-[1px] rounded-md">
                <button
                  type="button"
                  className="absolute right-[20px] top-[10px]"
                  onClick={closeDropdown}
                >
                  <FaTimes />
                </button>

                <Dropdown
                  data={venueType}
                  tokenStateHandler={tokenStateHandler}
                  closeDropdown={closeDropdown}
                />
              </div>
            )}
          </div>
        </div>

        {/* GENRE INPUT */}

        <div className="w-full">
          <label>Genre type</label>

          <div className="relative">
            <input
              placeholder="Select genre type"
              className={`${styles.input}`}
              readOnly
            />
            <button
              type="button"
              className="absolute right-4 top-4"
              onClick={() => toggleDropdown("genre")}
            >
              <ArrowDown />
            </button>

            {activeDropdown === "genre" && (
              <div className="absolute top-0 w-full bg-[#F6F8FD] z-50 p-[1rem] border-[#2659C34D] border-[1px] rounded-md">
                <button
                  type="button"
                  className="absolute right-[20px] top-[10px]"
                  onClick={closeDropdown}
                >
                  <FaTimes />
                </button>
                <Dropdown
                  data={genre}
                  tokenStateHandler={tokenStateHandler}
                  closeDropdown={closeDropdown}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`${styles.inputContainer}`}>
        <div className="w-full">
          <label>Address</label>
          <input
            placeholder="Search for venue address"
            className={`${styles.input}`}
          />
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
    </div>
  );
};

export default VenueForm;
