/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Switch from "../general/Switch";
import Delete from "../SVGcomponent/Delete";
import styles from "./CardListItem.module.css";
<<<<<<< HEAD
=======
import {api} from "../../services/api.route"
>>>>>>> new

const CardListItem = ({ item, updateItemStatus, handleDelete }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [status, setStatus] = useState(item.status);

<<<<<<< HEAD
  const handleToggle = () => {
=======
  const handleToggle = async() => {
>>>>>>> new
    setIsToggled(!isToggled);

    if (!isToggled) {
      updateItemStatus(item.ID, "Approved");
<<<<<<< HEAD
=======
      console.log(item.ID)
      console.log(item.genreOrType)
>>>>>>> new
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

<<<<<<< HEAD
      <button onClick={() => handleDelete(item.ID)}>
=======
      <button className={styles.delete} onClick={() => handleDelete(item.ID)}>
>>>>>>> new
        <Delete />
      </button>
    </div>
  );
};

export default CardListItem;
