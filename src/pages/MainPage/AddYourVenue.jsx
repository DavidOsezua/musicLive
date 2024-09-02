import React from "react";
import MultiFormPage from "../../components/general/MultiFormPage";
import VenueForm from "../../components/VenueBrand/VenueForm";
import BrandVenueForm from "../../components/VenueBrand/BrandVenueForm";

const AddYourVenue = () => {
  return (
    <MultiFormPage
      sectionClass={`section p-0 transition`}
      containerClass={`sectionContainer`}
      stepContent={[
        <VenueForm key={"one"} />,
        <BrandVenueForm
          key={`two`}
          text1={`Pending Gigs? E-mail us the Musician / Band names and Dates we will help you.`}
          text2={`Send to: addMyVenue@findmelivemusic.com`}
        />,
      ]}
      showTipJar
      showPageHeader
      headerText={`Add your venue`}
      formHeaderText={`Tell Us About Your Venue!`}
    />
  );
};

export default AddYourVenue;
