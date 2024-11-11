/* eslint-disable react/prop-types */
import React from "react";
import useMultistepForm from "../../CustomHooks/useMultiStepForm";
import ProgressBar from "../../components/VenueBrand/Progressbar";
import PageHeader from "../../components/general/PageHeader";
import Button from "../../components/general/Button";
import ArrowLeft from "../../components/SVGcomponent/ArrowLeft";
import ArrowRight from "../../components/SVGcomponent/ArrowRight";
import { TipJar } from "../../components";
import styles from "./MultiFormPage.module.css";
import Upload from "../SVGcomponent/Upload";

const MultiFormPage = ({
  stepContent,
  sectionClass,
  containerClass,
  onSubmit,
  validateStep,
  showPageHeader = true,
  headerText,
  showTipJar = true,
  formHeaderText,
  error,
  setError,
}) => {
  const { steps, currentStep, next, step, stepNames, previous } =
    useMultistepForm(stepContent);

  const submitHandler = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log(currentStep);
      next();
    }
  };

  const Upload = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const backHandler = (e) => {
    e.preventDefault();
    previous();
  };

  console.log(currentStep);
  return (
    <section className={`${sectionClass} `}>
      {showPageHeader && <PageHeader page={`${headerText}`} />}
      <div className={`${containerClass}`}>
        <div className={`${styles.formContainer}`}>
          <form className={`${styles.form}`}>
            <div className={`${styles.formHeader}`}>
              <div className="flex justify-center w-full">
                <p className={`${styles.formText} px-3`}>
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
              <ProgressBar
                progress={steps.length}
                currentProgress={currentStep}
              />
            </div>

            <h4 className={`${styles.tellUs}`}>{formHeaderText}</h4>
            <div className={`${styles.formWrapper}`}>
              {step}

              {currentStep > 0 ? (
                error ? (
                  <Button
                    text={`Back`}
                    width={`w-full`}
                    colored
                    radius={`rounded-sm`}
                    clickFunction={() => {
                      setError(false); // Set error to false
                      backHandler(); // Call the back handler
                    }}
                    svg2={<ArrowLeft />}
                  />
                ) : (
                  <Button
                    text={`Upload`}
                    width={`w-full`}
                    colored
                    radius={`rounded-sm`}
                    clickFunction={Upload}
                    type={`button`}
                    // svg2={<ArrowLeft />}
                  />
                )
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
        {showTipJar && <TipJar />}
      </div>
    </section>
  );
};

export default MultiFormPage;
