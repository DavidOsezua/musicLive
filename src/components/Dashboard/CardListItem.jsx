import React, { useEffect, useState } from "react";
import Switch from "../general/Switch";
import Delete from "../SVGcomponent/Delete";
import styles from "./CardListItem.module.css";

const CardListItem = ({ item, updateItemStatus }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [status, setStatus] = useState(item.status);

  const handleToggle = () => {
    setIsToggled(!isToggled);

    if (!isToggled) {
      setStatus("Approved");
    } else {
      setStatus("Inactive");
    }
  };

  return (
    <div key={item.id} className={styles.cardContainer}>
      <div className="flex justify-between">
        <p>{status}</p>
        <Switch
          isToggled={isToggled}
          handleToggle={handleToggle}
          status={status}
        />
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
