import React from "react";
import UploadForm from "../general/UploadForm";

const AddGenre = () => {
  return (
    <UploadForm
      label1={`Genre`}
      label2={`Upload Genre Icon`}
      iconSize={`Icon 64px X 64px`}
      uploadInstruction={`Upload Genre icon with required information`}
    />
  );
};

export default AddGenre;
