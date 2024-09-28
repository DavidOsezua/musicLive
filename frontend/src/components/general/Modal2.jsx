import React from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";
import AddBand from "../Dashboard/AddBand";
import AddLocation from "../Dashboard/AddLocation";
import AddAds from "../Dashboard/AddAds";
import AddGenre from "../Dashboard/AddGenre";
import AddType from "../Dashboard/AddType";

const Modal2 = ({ selectedCard, modalHandler }) => {
  const renderContent = () => {
    switch (selectedCard.name) {
      case "Bands":
        return <AddBand />;
      case "Venue":
        return <AddLocation />;
      case "Advertisment":
        return <AddAds />;
      case "Genre":
        return <AddGenre />;
      case "Venue Type":
        return <AddType />;
      default:
        return <div>Default Component</div>;
    }
  };
  return ReactDom.createPortal(
    <>
      <div className={styles.overlay2} onClick={modalHandler}></div>
      <div className={`z-[1000]  w-full lg:w-[50%]  ${styles.modal}`}>
        {renderContent()}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal2;
