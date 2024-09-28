import React, { useState } from "react";
import MultiFormPage from "../general/MultiFormPage";
import BrandForm from "../VenueBrand/BrandForm";
import BrandVenueForm from "../VenueBrand/BrandVenueForm";
import Success from "../general/Success";
import { uploadUserbrand } from "../../pages/MainPage/router";
import { useModal } from "../../App";
import Failed from "../general/Failed";
import { Modal } from "@mui/material";

const AddBand = ({settrackChanges}) => {
  const { modal, modalHandler } = useModal();
  const [message, setMessage] = useState()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    genre_type: "",
    band_tag: "",
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

  const validateStep = (currentStep) => {
    const errors = {};
    if (currentStep === 0) {
      if (!formData.name) errors.name = "Band name is required";
      if (!formData.email) errors.email = "Email is required";
      if (!formData.genre_type) errors.genre_type = "Genre type is required";
      if (!formData.band_tag) errors.band_tag = "Band tag is required";
    }

    if (currentStep === 1) {
      if (!formData.homepage) errors.homepage = "Homepage is required";
      if (!formData.facebook)
        errors.facebook = "Facebook profile link is required";
      if (!formData.instagram)
        errors.instagram = "Instagram profile link is required";
      if (!formData.image1) errors.image1 = "Upload your brand image1";
      if (!formData.image2) errors.image2 = "Upload your brand image2";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    console.log(formData);
    if (validateStep(1)) {
      const dataForm = new FormData();
      Object.keys(formData).forEach((key) => {
        dataForm.append(key, formData[key]);
      });
      try {
        await uploadUserbrand(dataForm);
        setIsSubmitted(true);
        settrackChanges(true)
        setMessage("Band uploaded successfully!")
        modalHandler(); // Open modal on success
      } catch (e) {
        setError(e.message);
        settrackChanges(false)
        setIsSubmitted(false);
        setMessage(e.response.data.detail || "Form validation failed");
        modalHandler(); // Open modal on failure
      }
    } else {
      setError("Form validation failed");
      settrackChanges(false)
      setMessage("Form validation failed");
      modalHandler(); // Open modal for validation failure
    }
  };
  return (
    <>
      <MultiFormPage
        stepContent={[
          <BrandForm
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
          />,
        ]}
        showTipJar={false}
        showPageHeader={false}
        formHeaderText={`Tell Us About Your Band!`}
        onSubmit={handleSubmit}
        validateStep={validateStep}
      />
      {modal && (
        <Modal>
          {isSubmitted ? (
            <Success modalHandler={modalHandler} message={message} description="Band under review, you will be notify via email once it approved"/>
          ) : (
            <Failed modalHandler={modalHandler} message={message}/>
          )}
        </Modal>
      )}
    </>
  );
};

export default AddBand;
