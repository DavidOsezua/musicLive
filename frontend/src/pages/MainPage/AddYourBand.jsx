import { useState } from "react";
import BrandForm from "../../components/VenueBrand/BrandForm";
import BrandVenueForm from "../../components/VenueBrand/BrandVenueForm";
import MultiFormPage from "../../components/general/MultiFormPage";
import Success from "../../components/general/Success";
import { uploadUserbrand } from "./router";
// import Modal from "../../components/general/Modal";
import { useModal } from "../../App";
import Failed from "../../components/general/Failed";
import Modal from "@/components/general/Modal";
import Loader from "@/components/general/Loader";

const AddYourBand = () => {
  const { modal, modalHandler } = useModal() || {};
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [message, setMessage] = useState();
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
  const [loader, setLoader] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(false);

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
    console.log(formErrors);
    setLoader(true);
    if (validateStep(1)) {
      const dataForm = new FormData();
      Object.keys(formData).forEach((key) => {
        dataForm.append(key, formData[key]);
      });
      try {
        await uploadUserbrand(dataForm);
        setIsSubmitted(true);
        setMessage("Band uploaded successfully!");
        setError(false);
        setLoader(false);
        modalHandler(); // Open modal on success
      } catch (e) {
        setMessage(e.response.data.detail || "Form validation failed");
        setIsSubmitted(false);
        setError(true);
        setLoader(false);
        console.error("error", e.response.data.detail);
        modalHandler(); // Open modal on failure
      }
    } else {
      console.error("error", error);
      setError(true);
      setLoader(false);
      setMessage("Form validation failed");
      modalHandler(); // Open modal for validation failure
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
          <BrandForm
            key={"one"}
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />,
          <BrandVenueForm
            key={"two"}
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
            text1={`Pending Gigs? E-mail us the Venue names and Dates we will help you.`}
            text2={`Send to: addMyBand@findmelivemusic.com`}
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
        headerText={`Add your Band`}
        formHeaderText={`Tell Us About Your Band!`}
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
              description="Band under review, you will be notified via email once it approved"
            />
          ) : (
            <Failed modalHandler={modalHandler} message={message} />
          )}
        </Modal>
      )}
    </>
  );
};

export default AddYourBand;
