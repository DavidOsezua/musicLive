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

const EditLocation = ({ item }) => {
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
    async function getAllUserBand() {
      try {
        const res = await api.get("api/v1/venue");
        const data = await res.data;
        const venueId = item.ID;
        const venue = data.find((b) => b.id === venueId);
        console.log(data);
        console.log(venue);
        console.log(venueId);
        if (venue) {
          console.log("Venue:", venue);

          // Set the formData state with the data from the venue object
          setFormData({
            name: venue.name || "",
            email: venue.email || "",
            genre_type: venue.genre_type || "",
            venue_type: venue.venue_type || "",
            address: venue.address || "",
            date: venue.venue_date || "",
            time: venue.venue_time || "",
            homepage: venue.homepage || "",
            facebook: venue.facebook_url || "",
            instagram: venue.instagram_url || "",
            youtube: venue.youtube_url || "",
            image1: venue.image1 ? `${Url}/${venue.image1}` : "",
            image2: venue.image2 ? `${Url}/${venue.image2}` : "",
          });

          setImage(venue.image1 ? `${Url}/${venue.image1}` : "");
          setImage2(venue.image2 ? `${Url}/${venue.image2}` : "");

          // setdataObj(venue);
        } else {
          console.log("Band not found");
        }
      } catch (error) {
        console.log(error);
      }
    }

    getAllUserBand();
  }, []);

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

export default EditLocation;
