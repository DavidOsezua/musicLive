/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import DropdownItem from "./DropdownItem";
import Button from "./Button";

const Dropdown = ({ setGenre, data, closeDropdown }) => {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const selectedButtonHandler = (id) => {
<<<<<<< HEAD
    setSelectedButtons((prev) =>
      prev.includes(id)
        ? selectedButtons.filter((item) => item !== id)
        : [...prev, id]
    );
  };
=======

    setSelectedButtons((prev) =>
      
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleSelect = () => {
    console.log("data",data)
    const selectedItems = data.filter((item) => selectedButtons.includes(item.ID));
    console.log(selectedItems)
    setGenre(selectedItems);
    closeDropdown(); 
  };
>>>>>>> new

  return (
    <div>
      <div className={`${styles.card}`}>
        {data.map((item, i) => (
          <DropdownItem
            key={i}
            item={item}
<<<<<<< HEAD
            setGenre={setGenre}
=======
>>>>>>> new
            selectedButtonHandler={selectedButtonHandler}
            selectedButtons={selectedButtons}
          />
        ))}
      </div>
      <Button
<<<<<<< HEAD
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
=======
        type="button"
        colored
        text="Select"
        radius="rounded-full"
        width="w-full"
        clickFunction={handleSelect} // Handles selection
        disableFn={selectedButtons.length === 0}
>>>>>>> new
      />
    </div>
  );
};

export default Dropdown;
