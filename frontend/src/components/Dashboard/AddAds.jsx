import React from "react";
import UploadForm from "../general/UploadForm";

const AddAds = ({ getAlladsData }) => {
  return (
    <UploadForm
      label1={`Genre`}
      label2={`Upload Ad Icon`}
      iconSize={`Icon 400px X 112px`}
      uploadInstruction={`Upload Ads icon with required information`}
      firstLayer={false}
      getAlladsData={getAlladsData}
    />
  );
};

export default AddAds;
