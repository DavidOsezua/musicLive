import React from "react";
import styles from "./CsvRecent.module.css";

const CsvRecent = ({ title, numberOfRequests, buttonText }) => {
  return (
    <div className={`${styles.card}`}>
      <h3>{title}</h3>
      <p className="text-[#437CF3]">{numberOfRequests}</p>
      <button className={`${styles.button}`}>{buttonText}</button>
    </div>
  );
};

export default CsvRecent;
