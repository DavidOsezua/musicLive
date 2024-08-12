import React from "react";
import { TipJar } from "../components";
import styles from "./AddYourVenue.module.css";
import useMultistepForm from "../CustomHooks/useMultiStepForm";
import BrandVenueForm from "../components/VenueBrand/BrandVenueForm";
import VenueForm from "../components/VenueBrand/VenueForm";
import ProgressBar from "../components/VenueBrand/Progressbar";
import Button from "../components/general/Button";

const AddYourVenue = () => {
  const { steps, currentStep, next, step, stepNames } = useMultistepForm([
    <VenueForm key={"one"} />,
    <BrandVenueForm key={`two`} />,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    next();
  };
  return (
    <section className={`section transition`}>
      <div className={`sectionContainer`}>
        <div className={`${styles.formContainer}`}>
          <form onSubmit={submitHandler} className={`${styles.form}`}>
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

            <h4 className={`${styles.tellUs}`}>Tell Us About Your Band!</h4>
            <div className={`${styles.formWrapper}`}>
              {step}

              <Button
                text={`Next`}
                width={`w-full`}
                colored
                radius={`rounded-sm`}
              />
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
