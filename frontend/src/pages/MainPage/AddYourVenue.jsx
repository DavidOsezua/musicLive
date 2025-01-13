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
import Loader from "@/components/general/Loader";

const AddYourVenue = () => {
  const [message, setMessage] = useState();
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    venue_type: "",
    address: "",
    homepage: "",
    facebook: "",
    instagram: "",
    youtube: "",
    image1: "",
    image2: "",
  });
  const { modal, modalHandler } = useModal();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIssubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateStep = (currentStep) => {
    const errors = {};
    console.log(formData);
    if (currentStep === 0) {
      if (!formData.name) errors.name = "venue name is required";
      if (!formData.email) errors.email = "Email is required";
      if (!formData.venue_type)
        errors.venue_type = "venue type tag is required";
      if (!formData.address) errors.address = "address is required";
      // if (!formData.date) errors.date = "venue date is required";
      // if (!formData.time) errors.date = "venue time is required";
    }

    if (currentStep === 1) {
      if (!formData.image1) errors.image1 = "Upload your venue image1";
      if (!formData.image2) errors.image2 = "Upload your venue image1";
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
    console.log(formData);

    console.log(formData.time);
    console.log(formData.date);
    setLoader(true);
    // return
    if (validateStep(1)) {
      const dataForm = new FormData();
      dataForm.append("name", formData.name);
      dataForm.append("venue_type", formData.venue_type);
      dataForm.append("address", formData.address);
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
        setMessage("Venue uploaded successfully!");
        setError(false);
        setLoader(false);
        modalHandler();
      } catch (e) {
        setMessage(e.response.data.detail || "Form validation failed");
        setIssubmitted(false);
        setError(true);
        console.error("error", e.response.data.detail);
        modalHandler();
      }
    } else {
      setError(true);
      setMessage("Form validation failed");
      modalHandler();
    }
  };

  return (
    <>
      <MultiFormPage
        sectionClass={`section p-0 transition`}
        containerClass={`sectionContainer`}
        error={error}
        setError={setError}
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
            image={image}
            image2={image2}
            formHandler={formHandler}
            formHandler2={formHandler2}
          />,
        ]}
        onSubmit={handleSubmit}
        validateStep={validateStep}
        showTipJar
        showPageHeader
        headerText={`Add your venue`}
        formHeaderText={`Tell Us About Your Venue!`}
      />

      {loader && (
        <Modal>
          <Loader />
        </Modal>
      )}
      {/* Conditionally render success or failure modal */}
      {modal && (
        <Modal>
          {isSubmitted ? (
            <Success
              modalHandler={modalHandler}
              message={message}
              description="Venue under review, you will be notified via email once it approved"
            />
          ) : (
            <Failed modalHandler={modalHandler} message={message} />
          )}
        </Modal>
      )}
    </>
  );
};

export default AddYourVenue;
