import React from "react";
import styles from "./ContactUs.module.css";
import { TipJar } from "../../components";
import Button from "../../components/general/Button";
import { useState,useEffect} from "react";
import { toast } from "react-toastify";
import {SubmitContactinfo} from "./api"

const ContactUs = () => {
  const [contact,setContact] = useState({
    name:"",
    email:"",
    phone:"",
    description:""
  })
  const handleSubmitform = async (e)=>{
    e.preventDefault();
    const contactInfo ={
      name: contact.name,
      email:contact.email,
      phone:contact.phone,
      description:contact.description
    }
    try{
     const response = await SubmitContactinfo(JSON.stringify(contactInfo))
     console.log("status code:",response.data.status_code)
      toast.success(response.data.detail)
  }catch(err){
    console.log(err)
    toast.error(err.response.data.detail)
  }
  }

  
  return (
    <section className={`section transition`}>
      <div className={`sectionContainer`}>
        {/************************* CONTACT FORM SECTION  *****************************/}
        <div className={`${styles.formContainer}`}>
          <div className={`${styles.container}`}>
            <h1 className={`${styles.title}`}>GET IN TOUCH</h1>
            <p className={`${styles.text}`}>
              24/7 we will answer your questions
            </p>
          </div>

          <form className={`${styles.form}`} onSubmit={handleSubmitform}>
            <input
              placeholder="Enter your names"
              className={`${styles.input}`}
              value={contact.name}
              onChange={(e) =>
                setContact((formData) => ({
                  ...formData,
                  name: e.target.value,
                }))
              }
              required
            />

            <div className={`${styles.inputContainer}`}>
              <input placeholder="Email" className={`${styles.input}`} 
               value={contact.email}
               onChange={(e) =>
                 setContact((formData) => ({
                   ...formData,
                   email: e.target.value,
                 }))
               }
               required/>
              <input placeholder="Phone" className={`${styles.input}`} 
              value={contact.phone}
              onChange={(e) =>
                setContact((formData) => ({
                  ...formData,
                  phone: e.target.value,
                }))
              }
              required/>
            </div>

            <textarea
              placeholder="Description"
              className={`${styles.textArea}`}
              value={contact.description}
              onChange={(e) =>
                setContact((formData) => ({
                  ...formData,
                  description: e.target.value,
                }))
              }
              required
            />

            <Button
              text={`send`}
              width={`w-full`}
              colored
              radius={`rounded-sm`}
              type="submit"
            />
          </form>
        </div>

        <TipJar />
      </div>
    </section>
  );
};

export default ContactUs;
