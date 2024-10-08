import React, { useState } from "react";
import Button from "./Button";
import Upload from "../SVGcomponent/Upload";
import styles from "./UploadForm.module.css";
import Close from "./Close";
import { useModal } from "@/App";

const UploadForm2 = ({image}) => {
  const { modalHandler } = useModal() || {};
  return (
    <div className={styles.formContainer}>
      <button className={styles.btn} onClick={modalHandler}>
        <Close />
      </button>

      <form className={styles.formWrapper}>
        <div className={`${styles.inputContainer}`}>
          <label>{label1}</label>
          <input placeholder="Enter Venue Name" className={`${styles.input}`} />
        </div>

        <p>{label2}</p>
        <div className={`${styles.inputContainer}`}>
          <label>{iconSize}</label>
          <div className={`${styles.upload}`}>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                className={`w-[100%] h-[70px] rounded-md  object-cover mx-auto`}
              />
            ) : (
              <div className={styles.uploadContainer}>
                <Upload />
                <p className={styles.uploadText}>Upload image 1</p>
              </div>
            )}

            <input
              type="file"
              className={styles.uploadBox}
              onChange={handleAddImage}
            />
          </div>
        </div>
        <p>{uploadInstruction}</p>
        <Button
          colored
          text={`Upload`}
          width={`w-full`}
          clickFunction={clickFunction}
        />
      </form>
    </div>
  );
};

export default UploadForm2;
