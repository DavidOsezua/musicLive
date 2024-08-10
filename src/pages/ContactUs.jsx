import React from "react";
import styles from "./ContactUs.module.css";
import { TipJar } from "../components";
import Button from "../components/general/Button";

const ContactUs = () => {
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

          <form className={`${styles.form}`}>
            <input
              placeholder="Enter your names"
              className={`${styles.input}`}
            />

            <div className={`${styles.inputContainer}`}>
              <input placeholder="Email" className={`${styles.input}`} />
              <input placeholder="Phone" className={`${styles.input}`} />
            </div>

            <textarea
              placeholder="Description"
              className={`${styles.textArea}`}
            />

            <Button
              text={`send`}
              width={`w-full`}
              colored
              radius={`rounded-sm`}
            />
          </form>
        </div>

        <TipJar />
      </div>
    </section>
  );
};

export default ContactUs;
