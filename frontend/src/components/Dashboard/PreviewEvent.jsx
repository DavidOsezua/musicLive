import React from "react";
import styles from "./PreviewEvent.module.css";

import { facebook, instagram, website } from "@/assets";
import Close from "../general/Close";

const PreviewEvent = ({ item, modalHandler }) => {
  console.log(item);
  return (
    <div className={`${styles.successCard} relative rounded-lg`}>
      <button
        className={`absolute top-[10px] right-[20px]`}
        onClick={modalHandler}
      >
        <Close />
      </button>
      {/* <img src={item.image} className="w-[200px] rounded-md" />
     
      <p>{item.status}</p>
      <p>{item.email}</p>
      <p>{item.genreOrType}</p>
      <p>{item.date}</p>
      <p>{item.time}</p>
      <p className="">{item.address}</p> */}{" "}
      <div className={`${styles.bandDetail} space-y-3`}>
        {" "}
        <img src={item.image} className={`${styles.image}`} />
        <span className="text-[#c32fb4]">{item.genreOrType}</span>
        <div className="space-y-3">
          <h1 className={`${styles.bandName} text-[0.8rem] font-semibold`}>
            {item.bandName}
          </h1>
          <h1 className={`${styles.bandName} font-bold`}>{item.venueName}</h1>
        </div>
        <div className="flex justify-between items-center">
          <p>{item.time}</p>
          <p>{item.date}</p>
        </div>
        <div></div>
        <div className={`${styles.socials}`}>
          <a href="#" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="#" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" />
          </a>
          <a href="#" rel="noopener noreferrer">
            <img src={website} alt="YouTube" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PreviewEvent;
