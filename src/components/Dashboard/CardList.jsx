/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Switch from "../general/Switch";
import CardListItem from "./CardListItem";
import styles from "./CardList.module.css";

const CardList = ({ data }) => {
  const [cardData, setCardData] = useState(data);

  // Function to update the status of a specific item
  const updateItemStatus = (id, newStatus) => {
    console.log(`Updating item with id: ${id} to status: ${newStatus}`);
    setCardData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };
  return (
    <div className={`${styles.cardContainer}`}>
      {cardData.map((item, i) => (
        <CardListItem
          index={i}
          key={item.ID}
          item={item}
          updateItemStatus={updateItemStatus}
          // curr={curr}
        />
      ))}
    </div>
  );
};

export default CardList;
