import React, { useState } from "react";
import styles from "./FilterAndSearch.module.css";
import SearchIcon from "../SVGcomponent/SearchIcon";

const AdminSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const inputHandler = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };
  return (
    <div className={`${styles.inputContainer}`}>
      <SearchIcon width={`20`} height={`18`} />
      <input
        placeholder="Search"
        className={`${styles.input}`}
        value={query}
        onChange={inputHandler}
      />
    </div>
  );
};

export default AdminSearch;
