/* eslint-disable react/prop-types */
import React from "react";
import styles from "./DropdownItem.module.css";

const DropdownItem = ({ item, selectedButtonHandler, selectedButtons }) => {
  return (
    <button
      className={`${styles.dropItem} ${
        selectedButtons.includes(item.ID) ? "bg-[#D7E2FF]" : "bg-[#f0f0f0]"
      }`}
      type="button"
      onClick={() => {
        selectedButtonHandler(item.ID);
      }}
    >
      <img src={item.image} className="w-[15px]" />

      <p>{item.genreOrType}</p>
    </button>
  );
};

export default DropdownItem;
