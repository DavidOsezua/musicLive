import React from "react";
import Genre from "./Genre";
import styles from "./GenreScroll.module.css";
import { bands } from "../../data/data";
import { facebook, instagram, website } from "@/assets";
import "./ads.css";

const GenreScroll = ({ link, handleGenre, setSelectedGenre }) => {
  return (
    <div className={`${styles.check} `}>
      <Genre
        link={link}
        handleGenre={handleGenre}
        setSelectedGenre={setSelectedGenre}
      />
    </div>
  );
};

export default GenreScroll;
