import React, { useState } from "react";
import Button from "./Button";
import Upload from "../SVGcomponent/Upload";
import styles from "./UploadForm.module.css";
import Close from "./Close";
import { useModal } from "@/App";
import {uploadAdsimage} from "../../pages/MainPage/router"
const UploadForm = ({
  label1,
  label2,
  iconSize,
  uploadInstruction,
  firstLayer = true,
}) => {
  const { modalHandler } = useModal();
  const [imageForm, setImageform] = useState({
    AdsImage:""
  })
  const handleAddImage = (e) => {
    const selectedFile = e.target.files[0];
    // Check if the user selected a valid file
    if (selectedFile) {
      setImageform((prevForm) => ({
        ...prevForm,
        AdsImage: selectedFile
      }));
    }
  };

  const clickFunction = async (e) => {
    e.preventDefault();

    if (!imageForm.AdsImage) {
      console.log("Please select an image.");
      return;
    }

    const imageFormData = new FormData();
    imageFormData.append("image1", imageForm.AdsImage);

    try {

      await uploadAdsimage(imageFormData);
      console.log("Ads uploaded successfully");
    } catch (error) {
      console.log("Error uploading ads:", error);
    }
  };


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

            <input type="file" className={styles.uploadBox}
            onChange={handleAddImage}
            />
          </div>
        </div>
        <p>{uploadInstruction}</p>
        <Button colored text={`Upload`} width={`w-full`} clickFunction={clickFunction}/>
      </form>
    </div>
  );
};

export default UploadForm;
