import React from "react";
import SelectGenre from "../SVGcomponent/SelectGenre";
import { genre } from "../../data/data";
import styles from "./Genre.module.css";

const Genre = () => {
  return (
    <div className={`${styles.genreContainer}`}>
      <div className="flex justify-center">
        <button className={`${styles.genrebtn}`}>
          <SelectGenre />
          Select Genre
        </button>
      </div>

      <div className={`${styles.genre}`}>
        {genre.map((list) => (
          <div key={list.genre} className="flex flex-col items-center">
            <img src={list.image} className={`${styles.image}`}  />
            <h1 className="text-[0.7rem] font-[400] text-[#0A225980]">
              {list.genre}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genre;
