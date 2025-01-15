import React from "react";
import styles from "./ConfirmDelete.module.css";
import Close from "./Close";
import Error from "../SVGcomponent/Error";
import Button from "./Button";

const ConfirmDelete = ({ confirmDelete, cancelDelete, message }) => {
  return (
    <div className={`${styles.successCard} relative`}>
      <button
        className={`absolute top-[20px] right-[20px]`}
        onClick={cancelDelete}
      >
        <Close />
      </button>
      <Error />
      {message}
      <div className="flex gap-3">
        <Button
          colored
          text={`Yes`}
          width={`w-[165px]`}
          radius={`rounded-md`}
          clickFunction={confirmDelete}
        />
        <Button
          text={`No`}
          width={`w-[165px]`}
          radius={`rounded-md`}
          clickFunction={cancelDelete}
        />
      </div>
    </div>
  );
};

export default ConfirmDelete;
