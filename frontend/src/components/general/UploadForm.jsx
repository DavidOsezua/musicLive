import React from "react";
import Button from "./Button";
import Upload from "../SVGcomponent/Upload";
import styles from "./UploadForm.module.css";
import Close from "./Close";
import { useModal } from "../../App";

const UploadForm = ({
  label1,
  label2,
  iconSize,
  uploadInstruction,
  firstLayer = true,
}) => {
  const { modalHandler } = useModal();
  return (
    <div className={styles.formContainer}>
      <button className={styles.btn} onClick={modalHandler}>
        <Close />
      </button>

      <form className={styles.formWrapper}>
        {firstLayer ? (
          <div className={`${styles.inputContainer}`}>
            <label>{label1}</label>
            <input
              placeholder="Enter Venue Name"
              className={`${styles.input}`}
            />
          </div>
        ) : (
          ""
        )}

        <p>{label2}</p>

        <div className={`${styles.inputContainer}`}>
          <label>{iconSize}</label>
          <div className={`${styles.upload}`}>
            <div className={styles.uploadContainer}>
              <Upload />
              <p className={styles.uploadText}>Upload Icon</p>
            </div>

            <input type="file" className={styles.uploadBox} />
          </div>
        </div>
        <p>{uploadInstruction}</p>
        <Button colored text={`Upload`} width={`w-full`} />
      </form>
    </div>
  );
};

export default UploadForm;
