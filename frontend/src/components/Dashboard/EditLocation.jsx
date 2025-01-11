import React, { useEffect, useState } from "react";
import Loader from "../general/Loader";
import Failed from "../general/Failed";
import Success from "../general/Success";
import { useModal } from "@/App";
import MultiFormPage from "../general/MultiFormPage";
import BrandVenueForm from "../VenueBrand/BrandVenueForm";
import VenueForm from "../VenueBrand/VenueForm";
import { Url, api } from "@/services/api.route";
import Modal from "../general/Modal";

const EditLocation = ({ item, cancel }) => {
  const { modal, modalHandler } = useModal() || {};
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [message, setMessage] = useState();
  const [showResultModal, setShowResultModal] = useState(false); // New state to control result modal visibility
  const [formData, setFormData] = useState({});

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // Set the formData state with the data from the venue object
    setFormData({
      name: item.venueOrBandName || "",
      email: item.email || "",
      venue_type: item.venueType || "",
      address: item.address || "",
      date: item.venue_date || "",
      time: item.venue_time || "",
      homepage: item.homepage || "",
      facebook: item.facebook || "",
      instagram: item.instagram || "",
      youtube: item.youtube || "",
      image1: item.image,
      image2: item.image2,
    });

    // image1: item.image1 ? `${Url}/${item.image1}` : "",
    // image2: item.image2 ? `${Url}/${item.image2}` : "",

    setImage(item.image1 ? `${Url}/${item.image1}` : "");
    setImage2(item.image2 ? `${Url}/${item.image2}` : "");
  }, []);

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
      if (!formData.homepage) errors.homepage = "homepage is required";
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

  const handleSave = async () => {
    setLoader(true);
    if (validateStep(1)) {
      const dataForm = new FormData();
      Object.keys(formData).forEach((key) => {
        dataForm.append(key, formData[key]);
      });

      try {
        await api.put(`api/v1/venue/${item.ID}`, dataForm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setIsSubmitted(true);
        setMessage("venue updated successfully!");
        setShowResultModal(true);
      } catch (error) {
        setError(error.message);
        setMessage(error.response?.data?.detail || "Failed to update venue.");
        setIsSubmitted(false);
        setShowResultModal(true);
      } finally {
        setLoader(false);
      }
    } else {
      setError("Form validation failed");
      setMessage("Please fill in all required fields.");
      setShowResultModal(true);
      setLoader(false);
    }
  };

  console.log(item);

  const cancelAll = () => {
    cancel();
    setShowResultModal(false);
  };

  return (
    <>
      //{" "}
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
            text2={`Send to: addMyVenue@findmelivemusic.com`}
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
            image={image}
            image2={image2}
            error={`Upload a new image.The current image is for preview only`}
            formHandler={formHandler}
            formHandler2={formHandler2}
          />,
        ]}
        onSubmit={handleSave}
        validateStep={validateStep}
        showTipJar={false}
        showPageHeader={false}
        formHeaderText={`Tell Us About Your Venue`}
      />
      {loader && (
        <Modal modalHandler={modalHandler}>
          <Loader />
        </Modal>
      )}
      {showResultModal && (
        <Modal modalHandler={cancelAll}>
          {isSubmitted ? (
            <Success
              modalHandler={cancelAll} // Close modal when Success is clicked
              message={message}
              description="Band under review, you will be notified via email once it is approved."
            />
          ) : (
            <Failed
              modalHandler={cancel} // Close modal when Failed is clicked
              message={message}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default EditLocation;
