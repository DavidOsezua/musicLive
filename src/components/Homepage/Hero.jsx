import React from "react";
import styles from "./Hero.module.css";
import { desktopHeroImage, logo } from "../../assets";

const Hero = () => {
  return (
    <div className={`${styles.heroContainer}`}>
      <img src={desktopHeroImage} />

      <div>
        <h1 className={`${styles.title}`}>Find My </h1>
        <h1 className={`${styles.title}`}>
          {" "}
          <span className="pl-[6rem]">Live Music.</span>
        </h1>
        <p className={`${styles.text}`}>HELPING UNITE BANDS AND FANS</p>
      </div>

      <img src={logo} className={`${styles.logo}`} />
    </div>
  );
};

export default Hero;
