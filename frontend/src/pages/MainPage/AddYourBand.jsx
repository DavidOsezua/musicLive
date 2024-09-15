import React from "react";
import { TipJar } from "../../components";
import styles from "./AddYourBand.module.css";
import { useState, useContext, useEffect } from "react";
import useMultistepForm from "../../CustomHooks/useMultiStepForm";
import ProgressBar from "../../components/VenueBrand/Progressbar";
import BrandForm from "../../components/VenueBrand/BrandForm";
import BrandVenueForm from "../../components/VenueBrand/BrandVenueForm";
import Button from "../../components/general/Button";
import PageHeader from "../../components/general/PageHeader";
import ArrowRight from "../../components/SVGcomponent/ArrowRight";
import ArrowLeft from "../../components/SVGcomponent/ArrowLeft";
import { toast } from "react-toastify";
import {uploadUserbrand} from "./api";

const AddYourBand = () => {
  const [formData, setFormData] = useState({})
  const { steps, currentStep, next, step, stepNames, previous } =
    useMultistepForm([
      <BrandForm key={"one"} formData={formData} setFormData={setFormData}/>,
      <BrandVenueForm
        key={`two`}
        formData={formData}
        setFormData={setFormData}  
        text1={`Pending Gigs? E-mail us the Venue names and Dates we will help you.`}
        text2={`Send to: addMyBand@findmelivemusic.com`}
      />,
    ]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (formValidation()){
      next();
    }
  };

  const formValidation=()=>{
    if(!formData.Name && !formData.tagLine && !formData.Email){
      toast.error("All fill are required")
      return false
    }else if(!formData.Name){
      toast.error("Name fill is required")
      return false
    }else if(!formData.tagLine){
      toast.error("tagLine fill is required")
      return false
    }else if(!formData.Email){
      toast.error("Email fill is required")
      return false
    }
    return true
  }
  
  const finalFormValidation =()=>{
    if (!formData.homePage && !formData.Facebook && !formData.Facebook && !formData.Youtube){
      toast.error("All fill are required")
      return false
    }else if(!formData.homePage){
      toast.error("Homepage fill is required")
      return false
    }else if(!formData.Facebook){
      toast.error("Facebook fill is required")
      return false
    }else if(!formData.Facebook){
      toast.error("Facebook fill is required")
      return false
    }else if(!formData.Youtube){
      toast.error("Youtube fill is required")
      return false
    }
    return true
  }

  
   const handleSubmit = async (e)=>{
    e.preventDefault();  
    if (finalFormValidation()){
    console.log(formData)
    const dataForm = new FormData();
    dataForm.append("name", formData.Name);
    dataForm.append("genre_type", formData.genreType);
    dataForm.append("tag_line", formData.tagLine);
    dataForm.append("email", formData.Email);
    dataForm.append("homepage", formData.homePage);
    dataForm.append("facebook", formData.Facebook);
    dataForm.append("instagram", formData.Instagram);
    dataForm.append("youtube", formData.Youtube);
    dataForm.append("image1", formData.Image1)
    dataForm.append("image2",formData.Image2)
    try{
     await uploadUserbrand(dataForm);
      toast.success("Venue uploaded successfully,wait for admin approval")
    }catch(e){
      console.log(e.status)
      toast.error(e.response.data.detail)
    }
  }
   }

  const backHandler = (e) => {
    e.preventDefault();
    previous();
  };
  return (
    <section className={`section p-0 transition`}>
      <PageHeader page={`Add your Band`} />
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

            <h4 className={`${styles.tellUs}`}>Tell Us About Your Band!</h4>
            <div className={`${styles.formWrapper}`}>
              {step}

              {currentStep > 0 ? (
                <Button
                  text={`Submit`}
                  width={`w-full`}
                  colored
                  radius={`rounded-sm`}
                  clickFunction={handleSubmit}
                  // svg2={<ArrowLeft />}
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

export default AddYourBand;
