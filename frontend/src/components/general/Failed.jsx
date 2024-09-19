import React from "react";
import Button from "./Button";
import styles from "./Failed.module.css";
import Close from "./Close";
import Error from "../SVGcomponent/Error";
import { useModal } from "../../App";

const Failed = () => {
  const { modalHandler } = useModal();
  return (
    <div className={`${styles.successCard} relative`}>
      <button
        className={`absolute top-[20px] right-[20px]`}
        onClick={modalHandler}
      >
        <Close />
      </button>
      <Error />
      <p>Submitted Unsuccessfully</p>

      <Button
        colored
        text={`Close`}
        width={`w-[165px]`}
        radius={`rounded-md`}
        clickFunction={modalHandler}
      />
    </div>
  );
};

export default Failed;
