import React, { useState } from "react";
import styles from "./VenueForm.module.css";
import ArrowDown from "../SVGcomponent/ArrowDown";
import Dropdown from "../general/Dropdown";

const VenueForm = () => {
  const [dropdown, setDropDown] = useState(false);
  const [tokenState, setTokenState] = useState("USDT");

  const showDropdown = (e) => {
    e.preventDefault();
    setDropDown((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropDown(false);
  };

  const tokenStateHandler = (currentToken) => {
    setTokenState(currentToken);
  };
  return (
    <div className={`${styles.formContainer}`}>
      <form className={`${styles.form}`}>
        <div className={`${styles.inputContainer}`}>
          <div className="w-full">
            <label>Name</label>
            <input
              placeholder="Enter Venue Name"
              className={`${styles.input}`}
            />
          </div>

          <div className="w-full">
            <label>Venue type</label>

            <div className="relative">
              <input
                placeholder="Select venue type"
                className={`${styles.input}`}
              />
              <button className="absolute right-4 top-4" onClick={showDropdown}>
                <ArrowDown />
              </button>

              {dropdown && (
                <div className="absolute top-0 w-full bg-[#F6F8FD] p-[1rem] border-[#2659C34D] border-[1px] rounded-md ">
                  <Dropdown
                    tokenStateHandler={tokenStateHandler}
                    closeDropdown={closeDropdown}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/*  */}
        <div className={`${styles.inputContainer}`}>
          <div className="w-full">
            <label>Address</label>
            <input
              placeholder="Search for venue address"
              className={`${styles.input}`}
            />
          </div>

          <div className="w-full">
            <label>Email</label>
            <input placeholder="Enter email" className={`${styles.input}`} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default VenueForm;
