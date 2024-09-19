import { useState } from "react";
import BrandForm from "../../components/VenueBrand/BrandForm";
import BrandVenueForm from "../../components/VenueBrand/BrandVenueForm";
import MultiFormPage from "../../components/general/MultiFormPage";
// import { facebook, instagram, youtube } from "../../assets";
import Success from "../../components/general/Success";
import { uploadUserbrand } from "./router";
import { FaSadCry } from "react-icons/fa";
import Modal from "../../components/general/Modal";
import { useModal } from "../../App";
import Failed from "../../components/general/Failed";

const AddYourBand = () => {
  const { modal, modalHandler } = useModal();
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
  const [isSubmitted, setIssubmitted] = useState(false);
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
      if (!formData.homepage) errors.date = "homepage is required";
      if (!formData.facebook)
        errors.facebook = "facebook profile link is required";
      if (!formData.instagram)
        errors.instagram = "instagram profile link is required";
      if (!formData.image1) errors.image1 = "Upload your brand image1";
      if (!formData.image2) errors.image2 = "Upload your brand image1";

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
      dataForm.append("tag_line", formData.band_tag);
      dataForm.append("email", formData.email);
      dataForm.append("homepage", formData.homepage);
      dataForm.append("facebook", formData.facebook);
      dataForm.append("instagram", formData.instagram);
      dataForm.append("youtube", formData.youtube);
      dataForm.append("image1", formData.image1);
      dataForm.append("image2", formData.image2);
      try {
        await uploadUserbrand(dataForm);
        setIssubmitted(true);
      } catch (e) {
        console.log(e);
        setError(e.message);
        setIssubmitted(false);
        //inplement the catching error card here
      }
    } else {
      console.error("error:", formErrors);
      setError(formErrors);
      setIssubmitted(false);
      // implement the error rendering here
    }
  };
  return (
    <>
      <MultiFormPage
        sectionClass={`section p-0 transition`}
        containerClass={`sectionContainer`}
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
          />,
        ]}
        onSubmit={handleSubmit}
        validateStep={validateStep} // Pass the validation function
        showTipJar
        showPageHeader
        headerText={`Add your Band`}
        formHeaderText={`Tell Us About Your Band!`}
      />

      {isSubmitted && (
        <Modal>
          <Success />
        </Modal>
      )}
      {error.length !== 0 && (
        <Modal>
          <Failed />
        </Modal>
      )}
    </>
  );
};

export default AddYourBand;
