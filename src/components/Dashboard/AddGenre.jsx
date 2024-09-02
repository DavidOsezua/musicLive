import React from "react";
import useMultistepForm from "../../CustomHooks/useMultiStepForm";
import VenueForm from "../VenueBrand/VenueForm";
import BrandVenueForm from "../VenueBrand/BrandVenueForm";
import PageHeader from "../general/PageHeader";
import ProgressBar from "../VenueBrand/Progressbar";
import Button from "../general/Button";
import ArrowRight from "../SVGcomponent/ArrowRight";
import styles from "./AddGenre.module.css";
import ArrowLeft from "../SVGcomponent/ArrowLeft";
import MultiFormPage from "../general/MultiFormPage";
import BrandForm from "../VenueBrand/BrandForm";

const AddGenre = () => {
  const { steps, currentStep, next, step, stepNames, previous } =
    useMultistepForm([
      <VenueForm key={"one"} />,
      <BrandVenueForm
        key={`two`}
        text1={`Pending Gigs? E-mail us the Musician / Band names and Dates we will help you.`}
        text2={`Send to: addMyVenue@findmelivemusic.com`}
      />,
    ]);

  const submitHandler = (e) => {
    e.preventDefault();
    next();
  };

  const backHandler = (e) => {
    e.preventDefault();
    previous();
  };

  console.log(currentStep);

  return (
    <MultiFormPage
      stepContent={[
        <BrandForm key={"one"} />,
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

export default AddGenre;
