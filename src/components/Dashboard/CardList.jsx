/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Switch from "../general/Switch";
import CardListItem from "./CardListItem";
import styles from "./CardList.module.css";

const CardList = ({ data }) => {
  // const [curr, setIsOpen] = useState(null);
  const [isToggled, setIsToggled] = useState(false);

  // const handleToggle = () => {
  //   setIsToggled((prev) => !prev);
  // };

  return (
    <div className={`${styles.cardContainer}`}>
      {data.map((item, i) => (
        <CardListItem
          index={i}
          key={item.ID}
          item={item}
          // curr={curr}
          isToggled={isToggled}
          setIsToggled={setIsToggled}
        />
      ))}
    </div>
  );
};

export default CardList;
