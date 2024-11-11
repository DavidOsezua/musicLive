import React, { useState } from "react";
import SearchIcon from "../SVGcomponent/SearchIcon";
import styles from "./Search.module.css";
import ArrowDown from "../SVGcomponent/ArrowDown";
import Dropdown from "./Dropdown";

export const Line = () => {
  return (
    <span>
      <svg
        width="2"
        height="38"
        viewBox="0 0 2 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="1"
          y1="2.18557e-08"
          x2="0.999998"
          y2="38"
          stroke="#1C1853"
          stroke-opacity="0.3"
        />
      </svg>
    </span>
  );
};

const Search = ({ showDropdown, searchData, handleInputChange }) => {
  return (
    <div className={`${styles.searchContainer}`}>
      {/* INPUT SECTION */}
      <div className={`${styles.inputContainer}`}>
        <SearchIcon />
        <input
          placeholder="Search by name..."
          name="search"
          value={searchData.name || ""}
          onChange={handleInputChange}
          className={`${styles.input}`}
        />
      </div>

      <Line />

      {/* DROPDOWN SECTION */}
      <div className="flex items-center gap-2">
        <button onClick={showDropdown} className="flex items-center gap-3">
          <h1 className="text-[#00103380] ">Type</h1>

          <ArrowDown />
        </button>
      </div>
    </div>
  );
};

export default Search;
