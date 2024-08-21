import React from "react";
import { TipJar } from "../../components";
import styles from "./AddYourVenue.module.css";
import useMultistepForm from "../../CustomHooks/useMultiStepForm";
import BrandVenueForm from "../../components/VenueBrand/BrandVenueForm";
import VenueForm from "../../components/VenueBrand/VenueForm";
import ProgressBar from "../../components/VenueBrand/Progressbar";
import PageHeader from "../../components/general/PageHeader";
import Button from "../../components/general/Button";
import ArrowLeft from "../../components/SVGcomponent/ArrowLeft";
import ArrowRight from "../../components/SVGcomponent/ArrowRight";

const AddYourVenue = () => {
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
    <section className={`section p-0 transition`}>
      <PageHeader page={`Add your venue`} />
      <div className={`sectionContainer`}>
        <div className={`${styles.formContainer}`}>
          <form className={`${styles.form}`}>
            <div className={`${styles.formHeader}`}>
              <div className="flex justify-center w-full">
                <p className={`${styles.formText}`}>
                  Please kindly fill the required information below
                </p>
              </div>

              <div>
                <img
                  src={``}
                  onClick={``}
                  className="cursor-pointer w-[20px]"
                />
              </div>
            </div>

            <div>
              <ProgressBar />
            </div>

            <h4 className={`${styles.tellUs}`}>Tell Us About Your Venue!</h4>
            <div className={`${styles.formWrapper}`}>
              {step}

              {currentStep > 0 ? (
                <Button
                  text={`Back`}
                  width={`w-full`}
                  colored
                  radius={`rounded-sm`}
                  clickFunction={backHandler}
                  svg2={<ArrowLeft />}
                />
              ) : (
                <Button
                  text={`Next`}
                  width={`w-full`}
                  colored
                  radius={`rounded-sm`}
                  clickFunction={submitHandler}
                  type={`submit`}
                  svg={<ArrowRight />}
                />
              )}

              {/* */}
            </div>
          </form>
        </div>
        <TipJar />
      </div>
    </section>
  );
};

export default AddYourVenue;
