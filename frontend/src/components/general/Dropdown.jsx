import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import { genre } from "../../data/data";
import DropdownItem from "./DropdownItem";

const Dropdown = ({ tokenStateHandler, closeDropdown, setGenre }) => {
  return (
    <div className={`${styles.card}`}>
      {genre.map((item, i) => (
        <DropdownItem
          key={i}
          img={item.image}
          token={item.token}
          value={item.value}
          network={item.network}
          closeDropdown={closeDropdown}
          tokenStateHandler={tokenStateHandler}
          setGenre={setGenre}
        />
      ))}
    </div>
  );
};

export default Dropdown;
