import React, { useState } from "react";
import UploadForm from "../general/UploadForm";
import UploadForm2 from "../general/UploadForm2";
import { useModal } from "@/App";
import { api } from "@/services/api.route";
import Success from "../general/Success";
import Failed from "../general/Failed";
import { Loader } from "lucide-react";
import Modal from "../general/Modal";

const AddType = ({
  getAllVenueTypeData,
  cancel,
  setShowResultModal,
  showResultModal,
}) => {
  const { modal, modalHandler } = useModal() || {};
  const [message, setMessage] = useState();
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  //This Function handles the adding of the image to the genre form
  const handleAddImage = (e) => {
    const selectedFile = e.target.files[0];
    // Check if the user selected a valid file
    if (selectedFile) {
      setFormData((prevForm) => ({
        ...prevForm,
        image: selectedFile,
      }));
    }
    setImage(selectedFile);
  };

  //This Function handles the uploading of the genre form
  const uploadHandler = async (e) => {
    setLoader(true);
    e.preventDefault();
    if (!formData.image) return;
    if (!formData.name) return;

    const dataForm = new FormData();
    Object.keys(formData).forEach((key) => {
      dataForm.append(key, formData[key]);
    });

    try {
      await api.post(`api/v1/type/`, dataForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsSubmitted(true);
      setMessage("Genre uploaded successfully!");
      if (getAllVenueTypeData) getAllVenueTypeData();
      setShowResultModal(true);
      setLoader(false);
    } catch (error) {
      setError(error.message);
      setMessage(error.response?.data?.detail || "Failed to upload Genre.");
      setIsSubmitted(false);
      setShowResultModal(true);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <UploadForm2
        modalHandler={modalHandler}
        image={image}
        clickFunction={uploadHandler}
        handleAddImage={handleAddImage}
        formData={formData}
        setFormData={setFormData}
      />
      {loader && (
        <Modal modalHandler={modalHandler}>
          <Loader />
        </Modal>
      )}

      {showResultModal && (
        <Modal modalHandler={cancel}>
          {isSubmitted ? (
            <Success
              modalHandler={cancel} // Close modal when Success is clicked
              message={message}
              description="Venue Type under review, you will be notified via email once it is approved."
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

export default AddType;
