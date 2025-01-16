import React, { useState } from "react";
import UploadForm from "../general/UploadForm";
import { useModal } from "@/App";
import Modal from "../general/Modal";
import Success from "../general/Success";
import Failed from "../general/Failed";
import Loader from "../general/Loader";
import { uploadAdsimage } from "../../pages/MainPage/router";

const AddAds = ({
  getAlladsData,
  cancel,
  setShowResultModal,
  showResultModal,
}) => {
  const { modalHandler } = useModal() || {};
  const [image, setImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState();
  const [loader, setLoader] = useState(false);
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
    setLoader(true);

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
      setLoader(false);
      if (getAlladsData) {
        getAlladsData().catch((e) => {
          console.log(e);
        });
      }
    } catch (e) {
      setMessage(e.response?.data?.detail || "Upload failed");
      setIsSubmitted(false);
      console.log("Error uploading ads:", e);
      setShowResultModal(true);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <UploadForm
        clickFunction={clickFunction}
        cancel={cancel}
        image={image}
        label1={`Genre`}
        label2={`Upload Ad Icon`}
        iconSize={`Icon 400px X 112px`}
        uploadInstruction={`Upload Ads icon with required information`}
        firstLayer={false}
        handleAddImage={handleAddImage}
        // getAlladsData={getAlladsData}
      />
      {loader && (
        <Modal modalHandler={cancel}>
          <Loader />
        </Modal>
      )}

      {showResultModal && (
        <Modal modalHandler={cancel}>
          {isSubmitted ? (
            <Success
              modalHandler={cancel} // Close modal when Success is clicked
              message={message}
              description="Ads under review, you will be notified via email once it is approved."
            />
          ) : (
            <Failed
              modalHandler={() => setShowResultModal(false)} // Close modal when Failed is clicked
              message={message}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default AddAds;
