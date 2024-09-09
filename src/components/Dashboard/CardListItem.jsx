/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Switch from "../general/Switch";
import Delete from "../SVGcomponent/Delete";
import styles from "./CardListItem.module.css";

const CardListItem = ({ item, updateItemStatus, handleDelete }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [status, setStatus] = useState(item.status);

  const handleToggle = () => {
    setIsToggled(!isToggled);

    if (!isToggled) {
      updateItemStatus(item.ID, "Approved");
      setStatus("Approved");
    } else {
      updateItemStatus(item.ID, "Inactive"); // Revert to another status
      setStatus("Inactive");
    }
  };

  return (
    <div key={item.ID} className={styles.cardContainer}>
      <div className="flex justify-between">
        <p
          className={` ${
            status === "Inactive" ? "text-[#FF1316] " : "text-[#27993A]"
          }`}
        >
          {status}
        </p>
        <Switch
          isToggled={isToggled}
          handleToggle={handleToggle}
          status={status}
        />
      </div>

      <div className="flex justify-center w-full">
        <img src={item.image} />
      </div>

      <p className="text-center">{item.genreOrType}</p>

      <button onClick={() => handleDelete(item.ID)}>
        <Delete />
      </button>
    </div>
  );
};

export default CardListItem;
