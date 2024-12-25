import React from "react";
import Genre from "./Genre";
import styles from "./GenreScroll.module.css";
import { bands } from "../../data/data";
import { facebook, instagram, website } from "@/assets";
import "./ads.css";

const GenreScroll = () => {
  return (
    <div className={`${styles.check} `}>
      <Genre />
    </div>
  );
};

export default GenreScroll;
