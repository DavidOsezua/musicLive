/* eslint-disable react/prop-types */
import React from "react";
import styles from "./AboutComponent.module.css";

const AboutComponent = ({
  Image,
  title,
  content,
  invert,
  switched,
  title2,
}) => {
  return (
    <div className={`${styles.container}`}>
      <h2
        className={`${styles.mobileTitle} ${
          !invert ? "" : styles.desktopTitle2
        } ${styles.title}`}
      >
        {title}
      </h2>

      <img src={Image} className={`${styles.image}`} />

      <div
        className={`${styles.contentContainer}  ${
          switched ? styles.switch : ""
        }`}
      >
        <h2 className={`${styles.title2}`}>{title2}</h2>
        <h2
          className={`${!invert ? "" : styles.desktopTitle2} ${
            styles.desktopTitle
          } ${styles.title}`}
        >
          {title}
        </h2>
        <p className={`${!invert ? styles.text : styles.text2}`}>{content}</p>
      </div>
    </div>
  );
};

export default AboutComponent;
