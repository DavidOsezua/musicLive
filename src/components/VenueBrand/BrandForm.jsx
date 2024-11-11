import React, { useState } from "react";
import Button from "../general/Button";
import styles from "./BrandForm.module.css";
import ArrowDown from "../SVGcomponent/ArrowDown";
import Dropdown from "../general/Dropdown";
import { FaTimes } from "react-icons/fa";
import { genre } from "../../data/data";

const BrandForm = () => {
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
    <div className={`${styles.formContainer}`}>
      <div className="w-full">
        <label>Name</label>
        <input placeholder="Enter your names" className={`${styles.input}`} />
      </div>

      <div className={`${styles.inputContainer}`}>
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
                  tokenStateHandler={tokenStateHandler}
                  closeDropdown={closeDropdown}
                  data={genre}
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-full">
          <label>Email</label>
          <input placeholder="Phone" className={`${styles.input}`} />
        </div>
      </div>

      <div>
        <label>Band tagline</label>
        <input placeholder="Enter band tagline" className={`${styles.input}`} />
      </div>
    </div>
  );
};

export default BrandForm;
