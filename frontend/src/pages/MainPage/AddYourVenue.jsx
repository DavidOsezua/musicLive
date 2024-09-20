import React from "react";
import MultiFormPage from "../../components/general/MultiFormPage";
import VenueForm from "../../components/VenueBrand/VenueForm";
import BrandVenueForm from "../../components/VenueBrand/BrandVenueForm";
import { useState } from "react";
import { uploadUservenue } from "./router";
import { useModal } from "../../App";
import Success from "../../components/general/Success";
import Failed from "../../components/general/Failed";
import Modal from "../../components/general/Modal";

const AddYourVenue = () => {
  const { modal, modalHandler } = useModal();
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
  const [isSubmitted, setIssubmitted] = useState(false);
  const [error, setError] = useState("");

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
      if (!formData.homepage) errors.date = "homepage is required";
      if (!formData.facebook)
        errors.facebook = "facebook profile link is required";
      if (!formData.instagram)
        errors.instagram = "instagram profile link is required";
      if (!formData.image1) errors.image1 = "Upload your venue image1";
      if (!formData.image2) errors.image2 = "Upload your venue image1";

      // if (!formData.youtube) errors.youtube = "youtube is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    console.log(formData);

    if (validateStep(1)) {
      const dataForm = new FormData();
      dataForm.append("name", formData.name);
      dataForm.append("genre_type", formData.genre_type);
      dataForm.append("venue_type", formData.venue_type);
      dataForm.append("address", formData.address);
      dataForm.append("venue_date", formData.date);
      dataForm.append("venue_time", formData.time);
      dataForm.append("email", formData.email);
      dataForm.append("homepage", formData.homepage);
      dataForm.append("facebook", formData.facebook);
      dataForm.append("instagram", formData.instagram);
      dataForm.append("youtube", formData.youtube);
      dataForm.append("image1", formData.image1);
      dataForm.append("image2", formData.image2);
      try {
        await uploadUservenue(dataForm);
        setIssubmitted(true);
        modalHandler()
      } catch (e) {
        console.log(e);
        setError(e.message);
        setIssubmitted(false);
        modalHandler()
        //inplement the catching error card here
      }
    } else {
      console.error("error:", formErrors);
      setError(formErrors);
      setIssubmitted(false);
      modalHandler()
      // implement the error rendering here
    }
  };

  return (
    <>
      <MultiFormPage
        sectionClass={`section p-0 transition`}
        containerClass={`sectionContainer`}
        stepContent={[
          <VenueForm
            key={"one"}
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />,
          <BrandVenueForm
            key={`two`}
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
            text1={`Pending Gigs? E-mail us the Musician / Band names and Dates we will help you.`}
            text2={`Send to: addMyVenue@findmelivemusic.com`}
          />,
        ]}
        onSubmit={handleSubmit}
        validateStep={validateStep}
        showTipJar
        showPageHeader
        headerText={`Add your venue`}
        formHeaderText={`Tell Us About Your Venue!`}
      />
      {/* Conditionally render success or failure modal */}
      {modal && (
        <Modal>
          {isSubmitted ? (
            <Success modalHandler={modalHandler} />
          ) : (
            <Failed modalHandler={modalHandler} />
          )}
        </Modal>
      )}
    </>
  );
};

export default AddYourVenue;
