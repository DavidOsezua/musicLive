import React from "react";
import MultiFormPage from "../general/MultiFormPage";
import VenueForm from "../VenueBrand/VenueForm";
import BrandVenueForm from "../VenueBrand/BrandVenueForm";

const AddLocation = () => {
  return (
    <MultiFormPage
      stepContent={[
        <VenueForm key={"one"} />,
        <BrandVenueForm
          key={`two`}
          text1={`Pending Gigs? E-mail us the Venue names and Dates we will help you.`}
          text2={`Send to: addMyBand@findmelivemusic.com`}
        />,
      ]}
      showTipJar={false}
      showPageHeader={false}
      formHeaderText={`Tell Us About Your Band!`}
    />
  );
};

export default AddLocation;
