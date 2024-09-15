/* eslint-disable react/prop-types */
import React from "react";
import styles from "./TitleAndStatus.module.css";
import Plus from "../SVGcomponent/Plus";

const TitleAndStatus = ({ data, title, buttonText }) => {
  return (
    <div className={`${styles.titleAndStatusContainer}`}>
      <h3 className={`${styles.title}`}>{title}</h3>

      <div className={`${styles.cardContainer}`}>
        <button className={`${styles.btn}`}>
          <Plus />
          {buttonText}
        </button>

        {data.statusData.map((componentData) => (
          <div
            key={``}
            className={`${styles.card} ${styles[componentData.colorID]}`}
          >
            <h3>{componentData.status}</h3>
            <span>{componentData.numbers}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleAndStatus;
