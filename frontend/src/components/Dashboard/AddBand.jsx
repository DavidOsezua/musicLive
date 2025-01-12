import { useState } from "react";
import BrandForm from "../../components/VenueBrand/BrandForm";
import BrandVenueForm from "../../components/VenueBrand/BrandVenueForm";
import MultiFormPage from "../../components/general/MultiFormPage";
import Success from "../../components/general/Success";
import { uploadUserbrand } from "../../pages/MainPage/router";
import Modal from "../../components/general/Modal";
import { useModal } from "../../App";
import Failed from "../../components/general/Failed";
import Loader from "../general/Loader";

const AddBand = ({
  settrackChanges,
  setShowResultModal,
  showResultModal,
  getAllUserBandData,
  cancel,
}) => {
  const { modal, modalHandler } = useModal() || {};
  const [message, setMessage] = useState();
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [loader, setLoader] = useState(false);
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
    console.log(formData);
    setLoader(true);
    if (validateStep(1)) {
      const dataForm = new FormData();
      Object.keys(formData).forEach((key) => {
        dataForm.append(key, formData[key]);
      });
      try {
        await uploadUserbrand(dataForm);
        setIsSubmitted(true);
        if (settrackChanges) settrackChanges(true);
        if (getAllUserBandData) getAllUserBandData();
        setMessage("Band uploaded successfully!");
        setShowResultModal(true); // Show the result modal
      } catch (e) {
        setError(e.message);
        if (settrackChanges) settrackChanges(false);
        setIsSubmitted(false);
        setMessage(e.response?.data?.detail || "Form validation failed");
        setShowResultModal(true); // Show the result modal on failure as well
      } finally {
        setLoader(false);
      }
    } else {
      setError("Form validation failed");
      settrackChanges(false);
      setMessage("Form validation failed");
      setShowResultModal(true); // Show result modal on validation failure
      setLoader(false);
    }
  };

  console.log(formData);

  console.log(showResultModal);

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
            image={image}
            image2={image2}
            formHandler={formHandler}
            formHandler2={formHandler2}
          />,
        ]}
        showTipJar={false}
        showPageHeader={false}
        formHeaderText={`Tell Us About Your Band!`}
        onSubmit={handleSubmit}
        error={error}
        setError={setError}
        validateStep={validateStep}
      />

      {loader && (
        <Modal modalHandler={() => setLoader(false)}>
          <Loader />
        </Modal>
      )}

      {showResultModal && (
        <Modal modalHandler={cancel}>
          {isSubmitted ? (
            <Success
              modalHandler={cancel} // Close modal when Success is clicked
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

export default AddBand;
