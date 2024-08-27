/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Switch from "../general/Switch";
import CardListItem from "./CardListItem";
import styles from "./CardList.module.css";

const CardList = ({ data }) => {
  return (
    <div className={`${styles.cardContainer}`}>
      {data.map((item, i) => (
        <CardListItem
          index={i}
          key={item.ID}
          item={item}
          // curr={curr}
        />
      ))}
    </div>
  );
};

export default CardList;
