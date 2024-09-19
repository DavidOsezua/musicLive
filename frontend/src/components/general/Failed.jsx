import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import Check from "../SVGcomponent/Check";
import styles from "./Failed.module.css";
import Close from "./Close";
import Error from "../SVGcomponent/Error";

const Failed = () => {
  return (
    <div className={`${styles.successCard} relative`}>
      <button className={`absolute top-[20px] right-[20px]`} onClick={""}>
        <Close />
      </button>
      <Error />
      <p>Submitted Unsuccessfully</p>

      <Button
        colored
        text={`Close`}
        width={`w-[165px]`}
        radius={`rounded-md`}
        clickFunction={""}
      />
    </div>
  );
};

export default Failed;
