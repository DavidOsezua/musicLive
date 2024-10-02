import React, { useState } from "react";
import Button from "./Button";
import Upload from "../SVGcomponent/Upload";
import styles from "./UploadForm.module.css";
import Close from "./Close";
import { useModal } from "@/App";
import { uploadAdsimage } from "../../pages/MainPage/router";
import Modal from "./Modal";
import Success from "./Success";
import Failed from "./Failed";
const UploadForm = ({
  label1,
  label2,
  iconSize,
  uploadInstruction,
  firstLayer = true,
}) => {
  const { modalHandler } = useModal() || {};
  const [image, setImage] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false); // New state to control result modal visibility
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState();
  const [imageForm, setImageform] = useState({
    AdsImage: "",
  });
  const handleAddImage = (e) => {
    const selectedFile = e.target.files[0];
    // Check if the user selected a valid file
    if (selectedFile) {
      setImageform((prevForm) => ({
        ...prevForm,
        AdsImage: selectedFile,
      }));
    }

    setImage(selectedFile);
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
      setIsSubmitted(true);
      setMessage("Ads uploaded successfully");
      console.log("Ads uploaded successfully");
      setShowResultModal(true);
    } catch (e) {
      setMessage(e.response?.data?.detail || "Upload failed");
      setIsSubmitted(false);
      console.log("Error uploading ads:", e);
      setShowResultModal(true);
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

      {showResultModal && (
        <Modal modalHandler={() => setShowResultModal(false)}>
          {isSubmitted ? (
            <Success
              modalHandler={() => setShowResultModal(false)} // Close modal when Success is clicked
              message={message}
              description="Band under review, you will be notified via email once it is approved."
            />
          ) : (
            <Failed
              modalHandler={() => setShowResultModal(false)} // Close modal when Failed is clicked
              message={message}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default UploadForm;
