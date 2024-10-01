import React from "react";
import styles from "./Advert.module.css";
import { adImg } from "@/assets";

const AdvertItem = () => {
  return (
    <div className={`flex mx-auto gap-2 `}>
      <img src={adImg} alt="img" className={`w-[300px] mx-auto`} />
      <img src={adImg} alt="img" className={`w-[300px] mx-auto`} />
      <img src={adImg} alt="img" className={`w-[300px] mx-auto`} />
      <img src={adImg} alt="img" className={`w-[300px] mx-auto`} />
    </div>
  );
};

const Advert = () => {
  return (
    <div className={`${styles.check}`}>
      <AdvertItem />
    </div>
  );
};

export default Advert;
