import React from "react";
import UploadForm from "../general/UploadForm";

const AddType = () => {
  return (
    <UploadForm
      label1={`Venue Type`}
      label2={`Upload Venue Type Icon`}
      iconSize={`Icon 64px X 64px`}
      uploadInstruction={`Upload Venue Type icon with required information`}
    />
  );
};

export default AddType;
