/* eslint-disable react/prop-types */
import React from "react";
import Search from "../SVGcomponent/Search";
import SearchIcon from "../SVGcomponent/SearchIcon";
import styles from "./FilterAndSearch.module.css";

const FilterAndSearch = ({ data, pageType, handleFilter, active }) => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.filteredButton}`}>
        {data.status.map((item) => (
          <button
            key={item}
            onClick={() => handleFilter(item)}
            className={`${styles.btn} ${active === item ? styles.active : ""}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className={`${styles.secondColumn}`}>
        {pageType === "bands" || pageType === "venue" ? <div>Export</div> : ""}

        <div className={`${styles.inputContainer}`}>
          <SearchIcon width={`20`} height={`18`} />
          <input placeholder="Search" className={`${styles.input}`} />
        </div>
      </div>
    </div>
  );
};

export default FilterAndSearch;
