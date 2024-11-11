import React, { useState } from "react";
import MultiFormPage from "../general/MultiFormPage";
import VenueForm from "../VenueBrand/VenueForm";
import BrandVenueForm from "../VenueBrand/BrandVenueForm";
import { uploadUservenue } from "../../pages/MainPage/router";
import { useModal } from "../../App";
import Success from "../general/Success";
import Failed from "../general/Failed";
import Modal from "../general/Modal";
import Loader from "../general/Loader";

const AddLocation = ({ settrackChanges }) => {
  const [message, setMessage] = useState();
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false); // New state to control result modal visibility
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    genre_type: "",
    venue_type: "",
    address: "",
    date: "",
    time: "",
    homepage: "",
    facebook: "",
    instagram: "",
    youtube: "",
    image1: "",
    image2: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const validateStep = (currentStep) => {
    const errors = {};
    console.log(formData);
    if (currentStep === 0) {
      if (!formData.name) errors.name = "venue name is required";
      if (!formData.email) errors.email = "Email is required";
      if (!formData.genre_type) errors.genre_type = "Genre type is required";
      if (!formData.venue_type)
        errors.venue_type = "venue type tag is required";
      if (!formData.address) errors.address = "address is required";
      // if (!formData.date) errors.date = "venue date is required";
      // if (!formData.time) errors.date = "venue time is required";
    }

    if (currentStep === 1) {
      // if (!formData.homepage) errors.homepage = "homepage is required";
      // if (!formData.facebook)
      //   errors.facebook = "facebook profile link is required";
      // if (!formData.instagram)
      //   errors.instagram = "instagram profile link is required";
      if (!formData.image1) errors.image1 = "Upload your venue image1";
      if (!formData.image2) errors.image2 = "Upload your venue image1";

      // if (!formData.youtube) errors.youtube = "youtube is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formHandler = (e) => {
    const file = e.target.files[0];
    setFormData((formData) => ({
      ...formData,
      image1: file, // Save file in formData
    }));
    setImage(URL.createObjectURL(file)); // Directly set image for preview
  };

  const formHandler2 = (e) => {
    const file = e.target.files[0];
    setFormData((formData) => ({
      ...formData,
      image2: file, // Save file in formData
    }));
    setImage2(URL.createObjectURL(file)); // Directly set image for preview
  };

  const handleSubmit = async () => {
    console.log("the data from admin venue is:", formData);
    setLoader(true);
    if (validateStep(1)) {
      const dataForm = new FormData();
      Object.keys(formData).forEach((key) => {
        dataForm.append(key, formData[key]);
      });
      try {
        console.log(dataForm);
        await uploadUservenue(dataForm);
        settrackChanges(true);
        setIsSubmitted(true);
        setMessage("Venue uploaded successfully!");
        setLoader(false);
        setShowResultModal(true); // Show the result modal
      } catch (e) {
        setError(e.message);
        setIsSubmitted(false);
        setMessage(e.response.data.detail || "Form validation failed");
        settrackChanges(false);
        setLoader(false);
        setShowResultModal(true);
        // Show the result modal
      }
    } else {
      setError("Form validation failed");
      settrackChanges(false);
      setMessage("Form validation failed");
      setShowResultModal(true);
      setLoader(false);
      setLoader(false); // Show the result modal
    }
  };

  return (
    <>
      <MultiFormPage
        stepContent={[
          <VenueForm
            key={"one"}
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />,
          <BrandVenueForm
            key={`two`}
            text1={`Pending Gigs? E-mail us the Venue names and Dates we will help you.`}
            text2={`Send to: addMyBand@findmelivemusic.com`}
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
            image={image}
            image2={image2}
            formHandler={formHandler}
            formHandler2={formHandler2}
          />,
        ]}
        onSubmit={handleSubmit}
        validateStep={validateStep}
        showTipJar={false}
        showPageHeader={false}
        formHeaderText={`Tell Us About Your Band!`}
      />
      {loader && (
        <Modal modalHandler={() => setLoader(false)}>
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
              modalHandler={() => setShowResultModal(false)} // Close modal when Failed is clicked
              message={message}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default AddLocation;
