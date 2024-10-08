import React from "react";

const EditLocation = () => {
  const { modal, modalHandler } = useModal() || {};
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
            text2={`Send to: addMyBand@findmelivemusic.com`}
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />,
        ]}
        onSubmit={handleSubmit}
        validateStep={validateStep}
        showTipJar={false}
        showPageHeader={false}
        formHeaderText={`Tell Us About Your Band!`}
      />
      {loader && (
        <Modal>
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

// import React, { useState } from "react";
// import MultiFormPage from "../general/MultiFormPage";
// import VenueForm from "../VenueBrand/VenueForm";
// import BrandVenueForm from "../VenueBrand/BrandVenueForm";
// import { uploadUservenue } from "../../pages/MainPage/router";
// import { useModal } from "../../App";
// import Success from "../general/Success";
// import Failed from "../general/Failed";
// import Modal from "../general/Modal";
// import Loader from "../general/Loader";

// const AddLocation = ({ settrackChanges }) =>
//   return (
//   //   );
// };

// export default AddLocation;
