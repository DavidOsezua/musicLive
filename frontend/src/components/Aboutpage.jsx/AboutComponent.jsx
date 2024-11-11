/* eslint-disable react/prop-types */
import React from "react";
import styles from "./AboutComponent.module.css";
import Button from "../general/Button";
import ExploreShowBtn from "../general/ExploreShowBtn";

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
      <h2 className={`${styles.title2}`}>{title2}</h2>

      <img src={Image} className={`${styles.image}`} />

      <div
        className={`${styles.contentContainer}  ${
          switched ? styles.switch : ""
        }`}
      >
        <h2 className={`${styles.title3}`}>{title2}</h2>
        <h2 className={`${styles.title}`}>{title}</h2>
        {/* <h2
          className={`${!invert ? "" : styles.desktopTitle2} ${
            styles.desktopTitle
          } ${styles.title}`}
        >
          {title}
        </h2> */}
        <p className={`${!invert ? styles.text : styles.text2}`}>{content}</p>
        <ExploreShowBtn />
      </div>
    </div>
  );
};

export default AboutComponent;
