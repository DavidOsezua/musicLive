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
import { api } from "@/services/api.route";

const EditBand = ({ item, data }) => {
  const { modal, modalHandler } = useModal() || {};
  const [message, setMessage] = useState();
  const [loader, setLoader] = useState(false);
  const [dataObj, setdataObj] = useState({});
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

  async function getAllUserBand() {
    try {
      const res = await api.get("api/v1/band");
      const data = await res.data;
      const bandId = item.ID;
      const band = data.find((b) => b.id === bandId);
      console.log(data);
      console.log(band);
      if (band) {
        console.log("Band:", band);
        setFormData({
          name: band.name || "",
          email: band.email || "",
          genre_type: band.genre_type || "",
          band_tag: band.band_tag || "",
          homepage: band.homepage || "",
          facebook: band.facebook_url || "",
          instagram: band.instagram_url || "",
          youtube: band.youtube_url || "",
          image1: band.image1 || "", // Assuming these are URLs or image data
          image2: band.image2 || "",
        });

        setdataObj(band);
      } else {
        console.log("Band not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUserBand();
  }, []);

  console.log(dataObj);

  const handleSave = async () => {
    setLoader(true);
    if (validateStep(1)) {
      console.log("the user form:", formData);
      const dataForm = new FormData();
      Object.keys(formData).forEach((key) => {
        dataForm.append(key, formData[key]);
      });

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
        getAllUserBand();
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
          />,
        ]}
        showTipJar={false}
        showPageHeader={false}
        formHeaderText={`Tell Us About Your Band!`}
        onSubmit={handleSave}
        validateStep={validateStep}
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

export default EditBand;
