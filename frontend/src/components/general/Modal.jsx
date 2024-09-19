import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ modalHandler, children }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.overlay2} onClick={modalHandler}></div>
      <div className={`z-[1000] `}>{children}</div>
    </div>
  );
};

export default Modal;
