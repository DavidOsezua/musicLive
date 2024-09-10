/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import { genre } from "../../data/data";
import DropdownItem from "./DropdownItem";
import Button from "./Button";

const Dropdown = ({ setGenre, data, closeDropdown }) => {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const selectedButtonHandler = (id) => {
    setSelectedButtons((prev) =>
      prev.includes(id)
        ? selectedButtons.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div>
      <div className={`${styles.card}`}>
        {data.map((item, i) => (
          <DropdownItem
            key={i}
            item={item}
            setGenre={setGenre}
            selectedButtonHandler={selectedButtonHandler}
            selectedButtons={selectedButtons}
          />
        ))}
      </div>
      <Button
        type={`button`}
        colored
        text={`Select`}
        radius={`rounded-full`}
        width={`w-full`}
        clickFunction={closeDropdown}
        disableFn={selectedButtons.length === 0}
        style={`${
          selectedButtons.length === 0
            ? "bg-[#2659C3] opacity-[30%]"
            : "bg-[#2659C3]"
        }`}
      />
    </div>
  );
};

export default Dropdown;
