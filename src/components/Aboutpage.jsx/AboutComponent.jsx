/* eslint-disable react/prop-types */
import React from "react";
import styles from "./AboutComponent.module.css";

const AboutComponent = ({ Image, title, content, invert, switched }) => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.imgContainer}`}>
        {" "}
        <img src={Image} className={`${styles.image}`} />
      </div>

      <div
        className={`${styles.contentContainer}  ${
          switched ? styles.switch : ""
        }`}
      >
        <h2
          className={`${!invert ? "" : styles.desktopTitle2} ${
            styles.desktopTitle
          } `}
        >
          {title}
        </h2>
        <p className={`${!invert ? styles.text : styles.text2}`}>{content}</p>
      </div>
    </div>
  );
};

export default AboutComponent;
