import React from "react";
import UploadForm from "../general/UploadForm";

const AddAds = () => {
  return (
    <UploadForm
      label1={`Genre`}
      label2={`Upload Ad Icon`}
      iconSize={`Icon 64px X 64px`}
      uploadInstruction={`Upload Ads icon with required information`}
      firstLayer={false}
    />
  );
};

export default AddAds;
