import React from "react";
import BrandForm from "../../components/VenueBrand/BrandForm";
import BrandVenueForm from "../../components/VenueBrand/BrandVenueForm";
import MultiFormPage from "../../components/general/MultiFormPage";

const AddYourBand = () => {
  return (
    <MultiFormPage
      sectionClass={`section p-0 transition`}
      containerClass={`sectionContainer`}
      stepContent={[
        <BrandForm key={"one"} />,
        <BrandVenueForm
          key={`two`}
          text1={`Pending Gigs? E-mail us the Venue names and Dates we will help you.`}
          text2={`Send to: addMyBand@findmelivemusic.com`}
        />,
      ]}
      showTipJar
      showPageHeader
      headerText={`Add your Band`}
      formHeaderText={`Tell Us About Your Band!`}
    />
  );
};

export default AddYourBand;
