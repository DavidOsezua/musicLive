import React from "react";
import { about } from "../../data/data";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={`section px-0 ${styles.about}`}>
      {about.map((item) => (
        <div key={item.title}>
          <h1>
            <span>{item.title}</span>
          </h1>
          <img src={item.image} className={`${styles.image}`} />
          <p className={`${styles.text}`}>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default About;
