import React from "react";
import styles from './PreviewEvent.module.css'

import { facebook, instagram, website } from "@/assets";
import Close from "../general/Close";

const PreviewEvent = ({item,modalHandler}) => {
  return (
    <div className={`${styles.successCard} relative rounded-lg`}>
      <button
        className={`absolute top-[10px] right-[20px]`}
        onClick={modalHandler}
      >
        <Close />
      </button>
      {/* <img src={item.image} className="w-[200px] rounded-md" />
      <p>{item.venueOrBandName}</p>
      <p>{item.status}</p>
      <p>{item.email}</p>
      <p>{item.genreOrType}</p>
      <p>{item.date}</p>
      <p>{item.time}</p>
      <p className="">{item.address}</p> */}{" "}
      <div className={`${styles.bandDetail}`}>
        {" "}
        <img src={item.image} className={`${styles.image}`} />
        <span className="text-[#c32fb4]">{item.genreOrType}</span>
        <h1 className={`${styles.bandName} font-bold`}>
          {item.venueOrBandName}
        </h1>
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
