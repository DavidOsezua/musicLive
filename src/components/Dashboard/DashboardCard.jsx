/* eslint-disable react/prop-types */
import React from "react";
import styles from "./DashboardCard.module.css";
import ArrowRightColored from "../SVGcomponent/ArrowRightColored";

const DashboardCard = ({ summary }) => {
  return (
    <div className={` ${styles.dashboardCard} ${styles[summary.colorID]}`}>
      <div className="flex justify-between">
        <div>
          <h3>{summary.name}</h3>
          <h3 className="text-[2rem] font-semibold">{summary.numbers}</h3>
        </div>
        <img src={summary.image} />
      </div>

      <button className={`${styles.button}`}>{summary.buttonText}</button>

      <div className="flex justify-between">
        <div className="flex gap-2">
          {summary.status.map((status) => (
            <div key={``} className="flex gap-1">
              <span className={`${styles.state}`}>{status.state}</span>
              <span className={`${styles.state}`}>{status.number}</span>
            </div>
          ))}
        </div>

        <ArrowRightColored />
      </div>
    </div>
  );
};

export default DashboardCard;
