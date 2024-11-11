import React from "react";
import styles from "./FilterAndSearch.module.css";
import SearchIcon from "../SVGcomponent/SearchIcon";

const AdminSearch = () => {
  return (
    <div className={`${styles.inputContainer}`}>
      <SearchIcon width={`20`} height={`18`} />
      <input placeholder="Search" className={`${styles.input}`} />
    </div>
  );
};

export default AdminSearch;
