/* eslint-disable react/prop-types */
import React from "react";
import Search from "../SVGcomponent/Search";
import SearchIcon from "../SVGcomponent/SearchIcon";
import styles from "./FilterAndSearch.module.css";
import AdminSearch from "./AdminSearch";

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
        {/* {pageType === "bands" || pageType === "venue" ? <div className="w-full">Export</div> : ""} */}

        <AdminSearch />
      </div>
    </div>
  );
};

export default FilterAndSearch;
