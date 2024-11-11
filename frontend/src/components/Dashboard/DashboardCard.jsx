/* eslint-disable react/prop-types */
import React from "react";
import styles from "./DashboardCard.module.css";
import ArrowRightColored from "../SVGcomponent/ArrowRightColored";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../general/Modal";

const DashboardCard = ({ summary, onSelection, card }) => {
  const navigate = useNavigate();

  const handleArrowClick = () => {
    if (summary.path) {
      navigate(summary.path, { replace: true });
    }
  };
  return (
    <>
      <div className={` ${styles.dashboardCard} ${styles[summary.colorID]}`}>
        <div className="flex justify-between">
          <div>
            <h3>{summary.name}</h3>
            <h3 className="text-[2rem] font-semibold">{summary.numbers}</h3>
          </div>
          <img src={summary.image} />
        </div>

        <button
          className={`${styles.button}`}
          onClick={() => onSelection(summary)}
        >
          {summary.buttonText}
        </button>

        <div className="flex justify-between">
          <div className="flex gap-2">
            {summary.status.map((status) => (
              <div key={``} className="flex gap-1">
                <span className={`${styles.state} ${styles[status.colorID]}`}>
                  {status.state}
                </span>
                <span className={`${styles.state} ${styles[status.colorID]}`}>
                  {status.number}
                </span>
              </div>
            ))}
          </div>

          <button onClick={handleArrowClick}>
            <ArrowRightColored />
          </button>
        </div>
      </div>
      
    </>
  );
};

export default DashboardCard;
