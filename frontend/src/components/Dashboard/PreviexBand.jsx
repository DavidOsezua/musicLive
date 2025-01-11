import React from "react";
import styles from "./PreviexBand.module.css";
import Close from "../general/Close";
import { facebook, instagram, website } from "@/assets";
import Facebook from "../SVGcomponent/Facebook";
import Instagram from "../SVGcomponent/Instagram";
import Website from "../SVGcomponent/Website";

const PreviexBand = ({ item, modalHandler }) => {
  console.log("the item are:", item);
  return (
    <div className={`${styles.successCard} relative rounded-lg`}>
      <button
        className={`absolute top-[10px] right-[20px]`}
        onClick={modalHandler}
      >
        <Close />
      </button>

      <div className={`${styles.bandDetail}`}>
        {" "}
        <img src={item.image1} className={`${styles.image}`} />
        <span className="text-[#c32fb4]">{item.genreOrType}</span>
        <h1 className={`${styles.bandName} font-bold`}>
          {item.venueOrBandName}
        </h1>
        <div className={`${styles.socials}`}>
          <a href="#" rel="noopener noreferrer">
            <Facebook />
          </a>
          <a href="#" rel="noopener noreferrer">
            <Instagram />
          </a>
          <a href="#" rel="noopener noreferrer">
            <Website />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PreviexBand;

//  <div  className={`${styles.bandDetail}`}>
//    <a
//      href={`${band.homepage}`}
//      target="_blank"
//      rel="noopener noreferrer"
//    >
//      <img
//        src={`{item.image1}`}
//
//        className={`${Url}/ ${styles.image}`}
//      />

//    </a>

//    <span>{item.genreOrType}</span>
//    <h1 className={`${styles.bandName}`}>
//      {String(item.name).charAt(0).toUpperCase() +
//        String(item.name.slice(1))}
//    </h1>

//    <div className={`${styles.socials}`}>
//      <a
//        href={band.facebook_url}
//        target="_blank"
//        rel="noopener noreferrer"
//      >
//        <img src={facebook} alt="Facebook" key={1} />
//      </a>
//      <a
//        href={band.instagram_url}
//        target="_blank"
//        rel="noopener noreferrer"
//      >
//        <img src={instagram} alt="Instagram" key={2} />
//      </a>
//      <a
//        href={band.youtube_url}
//        target="_blank"
//        rel="noopener noreferrer"
//      >
//        <img src={website} alt="YouTube" key={3} />
//      </a>
//    </div>
//  </div>;
