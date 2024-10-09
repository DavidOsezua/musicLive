import React, { useState } from "react";
import UploadForm from "../general/UploadForm";
import UploadForm2 from "../general/UploadForm2";
import { useModal } from "@/App";
import { api } from "@/services/api.route";
import Success from "../general/Success";
import Failed from "../general/Failed";
import { Loader } from "lucide-react";
import Modal from "../general/Modal";

const AddGenre = ({ getAllGenreData }) => {
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
  const [showResultModal, setShowResultModal] = useState(false);

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
      await api.post(`api/v1/genre/`, dataForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsSubmitted(true);
      setMessage("Genre uploaded successfully!");
      setShowResultModal(true);
      if (getAllGenreData) getAllGenreData();
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
        <Modal modalHandler={() => setShowResultModal(false)}>
          {isSubmitted ? (
            <Success
              modalHandler={() => setShowResultModal(false)} // Close modal when Success is clicked
              message={message}
              description="Band under review, you will be notified via email once it is approved."
            />
          ) : (
            <Failed
              modalHandler={modalHandler} // Close modal when Failed is clicked
              message={message}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default AddGenre;

// const validateStep = (currentStep) => {
//   const errors = {};
//   if (currentStep === 0) {
//     if (!formData.name) errors.name = "Band name is required";
//     if (!formData.email) errors.email = "Email is required";
//     if (!formData.genre_type) errors.genre_type = "Genre type is required";
//     if (!formData.band_tag) errors.band_tag = "Band tag is required";
//   }

//   if (currentStep === 1) {
//     if (!formData.homepage) errors.homepage = "Homepage is required";
//     if (!formData.facebook)
//       errors.facebook = "Facebook profile link is required";
//     if (!formData.instagram)
//       errors.instagram = "Instagram profile link is required";

//   }

//   setFormErrors(errors);
//   return Object.keys(errors).length === 0;
// };

// const handleSubmit = async () => {
//   console.log(formData);
//   setLoader(true);
//   if (validateStep(1)) {
//     const dataForm = new FormData();
//     Object.keys(formData).forEach((key) => {
//       dataForm.append(key, formData[key]);
//     });
//     try {
//       await uploadUserbrand(dataForm);
//       setIsSubmitted(true);
//       if (settrackChanges) settrackChanges(true);
//       setMessage("Band uploaded successfully!");
//       setShowResultModal(true); // Show the result modal
//       setLoader(false);
//     } catch (e) {
//       setError(e.message);
//       if (settrackChanges) settrackChanges(false);
//       setIsSubmitted(false);
//       setMessage(e.response?.data?.detail || "Form validation failed");
//       setShowResultModal(true); // Show the result modal on failure as well
//     }
//   } else {
//     setError("Form validation failed");
//     settrackChanges(false);
//     setMessage("Form validation failed");
//     setShowResultModal(true); // Show result modal on validation failure
//   }
// };
