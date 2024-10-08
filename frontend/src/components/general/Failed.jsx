import React from "react";
import Button from "./Button";
import styles from "./Failed.module.css";
import Close from "./Close";
import Error from "../SVGcomponent/Error";
import { useDeleteModal, useModal } from "../../App";

const Failed = ({ message, modalHandler }) => {
  // const { modalHandler } = useModal() || {};
  const displayMessage =
    typeof message === "object" && message?.msg
      ? message.msg
      : typeof message === "string"
      ? message
      : "An unexpected error occurred, please try again.";
  return (
    <div className={`${styles.successCard} relative`}>
      <button
        className={`absolute top-[20px] right-[20px]`}
        onClick={modalHandler}
      >
        <Close />
      </button>
      <Error />
      <p>{displayMessage}</p>

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
