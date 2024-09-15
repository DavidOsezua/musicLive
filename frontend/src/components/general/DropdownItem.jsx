import React from "react";
import styles from "./DropdownItem.module.css";

const DropdownItem = ({ img, closeDropdown }) => {
  return (
    <div onClick={closeDropdown}>
      <button className={`${styles.dropItem}`}>
        <img src={img} className="w-[15px]" />

        <p>Genre</p>
      </button>
    </div>
  );
};

export default DropdownItem;
