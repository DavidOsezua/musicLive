import React from "react";
import { TipJar } from "../../components";
import { useState, useContext, useEffect } from "react";
import styles from "./AddYourVenue.module.css";
import useMultistepForm from "../../CustomHooks/useMultiStepForm";
import BrandVenueForm from "../../components/VenueBrand/BrandVenueForm";
import VenueForm from "../../components/VenueBrand/VenueForm";
import ProgressBar from "../../components/VenueBrand/Progressbar";
import PageHeader from "../../components/general/PageHeader";
import Button from "../../components/general/Button";
import ArrowLeft from "../../components/SVGcomponent/ArrowLeft";
import ArrowRight from "../../components/SVGcomponent/ArrowRight";
import { toast } from "react-toastify";
import Facebook from '../../components/SVGcomponent/Facebook';
import Instagram from '../../components/SVGcomponent/Instagram';
import { facebook } from "../../assets";
import {uploadUservenue} from "./api";

const AddYourVenue = () => {
  const [formData, setFormData] = useState({})
  const { steps, currentStep, next, step, stepNames, previous } =
    useMultistepForm([
      <VenueForm key={"one"}  formData={formData} setFormData={setFormData}/>,
      <BrandVenueForm
        key={`two`}
        formData={formData}
        setFormData={setFormData}  
        text1={`Pending Gigs? E-mail us the Musician / Band names and Dates we will help you.`}
        text2={`Send to: addMyVenue@findmelivemusic.com`}
      />,
    ]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData)
    if (formValidation()){
      next();
    }
    
  };

const formValidation=()=>{
  if(!formData.Name && !formData.Address && !formData.Email){
    toast.error("All fill are required")
    return false
  }else if(!formData.Name){
    toast.error("Name fill is required")
    return false
  }else if(!formData.Address){
    toast.error("Address fill is required")
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
  dataForm.append("venue_type", formData.venueType);
  dataForm.append("address", formData.Address);
  dataForm.append("email", formData.Email);
  dataForm.append("homepage", formData.homePage);
  dataForm.append("facebook", formData.Facebook);
  dataForm.append("instagram", formData.Instagram);
  dataForm.append("youtube", formData.Youtube);
  dataForm.append("image1", formData.Image1)
  dataForm.append("image2",formData.Image2)
  try{
   await uploadUservenue(dataForm);
    toast.success("Band uploaded successfully,wait for admin approval")
  }catch(e){
    console.log(e.status)
    toast.error(e.response.data.detail)
  }
}
 }

  const backHandler = (e) => {
    e.preventDefault();
    console.log(formData)
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

export default AddYourVenue;
