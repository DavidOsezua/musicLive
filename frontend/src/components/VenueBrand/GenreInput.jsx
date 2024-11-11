import React from "react";
import Dropdown from "../general/Dropdown";
import ArrowDown from "../SVGcomponent/ArrowDown";
import styles from "./VenueForm.module.css";

const GenreInput = ({
  showDropdown,
  dropdown,
  tokenStateHandler,
  closeDropdown,
}) => {
  return (
    <div className="w-full">
      <label>Genre type</label>

      <div className="relative">
        <input placeholder="Select genre type" className={`${styles.input}`} />
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
  );
};

export default GenreInput;
