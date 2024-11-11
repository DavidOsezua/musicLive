import React from "react";
import styles from "./TipJar.module.css";
import Button from "./Button";
import { tipJarImage } from "../../assets";

const TipJar = () => {
  return (
    <section className={`section ${styles.tipJarSection}`}>
      <div className={`sectionContainer pt-0 ${styles.tipJarContainer}`}>
        <div className={`${styles.tipJarContent}`}>
          <h1 className={`${styles.tipJarTitle}`}>Tip Jar</h1>

          <div>
            <p className={`${styles.tipJartext} pb-[0.2rem]`}>
              Please help us keep this website{" "}
              <span className="font-semibold text-[#0A2259]">FREE.</span>
            </p>
            <p className={`${styles.tipJartext}`}>
              We appreciate you supporting{" "}
              <span className="text-[#0A2259] font-semibold">LIVE MUSIC.</span>
            </p>
          </div>

          <Button text={`Tip now`} colored width={`w-[109px]`} radius={`rounded-full`} />
        </div>

        <img src={tipJarImage} className={`${styles.tipJarImage}`} />
      </div>
    </section>
  );
};

export default TipJar;
