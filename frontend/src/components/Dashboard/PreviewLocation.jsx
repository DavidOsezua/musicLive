import React from "react";
import styles from "./PreviewLocation.module.css";
import Close from "../general/Close";

const PreviewLocation = ({ item, modalHandler }) => {
  console.log(item);

  return (
    <div className={`${styles.successCard} relative rounded-lg`}>
      <button
        className={`absolute top-[20px] right-[20px]`}
        onClick={modalHandler}
      >
        <Close />
      </button>
      <img src={item.image} className="w-[200px] rounded-md" />
      <p>{item.venueOrBandName}</p>
      <p>{item.status}</p>
      <p>{item.email}</p>
      <p>{item.date}</p>
      <p>{item.time}</p>
      <p className="">{item.address}</p>
    </div>
  );
};

export default PreviewLocation;
