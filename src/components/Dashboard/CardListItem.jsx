import React, { useState } from "react";
import Switch from "../general/Switch";
import Delete from "../SVGcomponent/Delete";
import styles from "./CardListItem.module.css";

const CardListItem = ({ item, isToggled, index, setIsToggled }) => {
  const clicked = index === isToggled;
  const handleToggle = () => {
    setIsToggled(clicked ? null : index);
  };

  console.log(isToggled);
  return (
    <div key={item.id} className={styles.cardContainer}>
      <div className="flex justify-between">
        <p>{item.status}</p>
        <Switch />
      </div>

      <div className="flex justify-center w-full">
        <img src={item.image} />
      </div>

      <p className="text-center">{item.genre}</p>

      <Delete />
    </div>
  );
};

export default CardListItem;
