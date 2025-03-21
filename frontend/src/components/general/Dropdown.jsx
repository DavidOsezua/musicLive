/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import DropdownItem from "./DropdownItem";
import Button from "./Button";
import { FaTimes } from "react-icons/fa";

const Dropdown = ({ setGenre, data, closeDropdown, setSelectVenue }) => {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const selectedButtonHandler = (id) => {
    setSelectedButtons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelect = () => {
    console.log("data", data);
    const selectedItems = data.filter((item) =>
      selectedButtons.includes(item.ID)
    );
    console.log("selected item", selectedItems);
    setGenre(selectedItems);
    if (setSelectVenue) setSelectVenue(selectedItems);
    closeDropdown();
  };

  return (
    <div>
      <div className={`${styles.card} relative`}>
        <button onClick={closeDropdown} className={`absolute right-0`}>
          <FaTimes />
        </button>
        {data.map((item, i) => (
          <DropdownItem
            key={i}
            item={item}
            selectedButtonHandler={selectedButtonHandler}
            selectedButtons={selectedButtons}
          />
        ))}
      </div>
      <Button
        type="button"
        colored
        text="Select"
        radius="rounded-full"
        width="w-full"
        clickFunction={handleSelect} // Handles selection
        // disableFn={selectedButtons.length === 0}
      />
    </div>
  );
};

export default Dropdown;
