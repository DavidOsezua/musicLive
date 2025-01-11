import React, { useEffect, useState } from "react";
import Modal from "../general/Modal";
import Success from "../general/Success";
import Failed from "../general/Failed";
import Loader from "../general/Loader";
import { useModal } from "@/App";
import { uploadUserbrand } from "../../pages/MainPage/router";
import MultiFormPage from "../general/MultiFormPage";
import BrandForm from "../VenueBrand/BrandForm";
import BrandVenueForm from "../VenueBrand/BrandVenueForm";
import { Url, api } from "@/services/api.route";

const EditBand = ({ item, data }) => {
  const { modalHandler } = useModal() || {};
  const [message, setMessage] = useState();
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [formData, setFormData] = useState({});

  console.log(item);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);

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

  

  useEffect(() => {
    setFormData({
      name: item.venueOrBandName || "",
      email: item.email || "",
      genre_type: item.genreOrType || "",
      band_tag: item.bandTag || "",
      homepage: item.homepage || "",
      facebook: item.facebook || "",
      instagram: item.instagram || "",
      youtube: item.youtube || "",
      image1: item.image1 ? `${Url}/${item.image1}` : "", // Assuming these are URLs or image data
      image2: item.image2 ? `${Url}/${item.image2}` : "",
    });
  }, []);

  console.log(data);

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
      console.log("the user form:", formData);
      const dataForm = new FormData();
      Object.keys(formData).forEach((key) => {
        dataForm.append(key, formData[key]);
      });

      // Conditionally append files to formData
      if (formData.image1 instanceof File) {
        dataForm.append("image1", formData.image1);
      }

      if (formData.image2 instanceof File) {
        dataForm.append("image2", formData.image2);
      }

      try {
        await api.put(`api/v1/band/${item.ID}`, dataForm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setIsSubmitted(true);
        setMessage("Band updated successfully!");
        setShowResultModal(true);
      } catch (error) {
        setError(error.message);
        setMessage(error.response?.data?.detail || "Failed to update band.");

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

  console.log(image);

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
            error={`Upload a new image.The current image is for preview only`}
            formErrors={formErrors}
            image={image} // Use file URL or existing image URL
            image2={image2}
            formHandler={formHandler}
            formHandler2={formHandler2}
          />,
        ]}
        showTipJar={false}
        showPageHeader={false}
        formHeaderText={`Tell Us About Your Band!`}
        onSubmit={handleSave}
        validateStep={validateStep}
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

export default EditBand;
