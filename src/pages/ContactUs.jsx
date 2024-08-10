import React from "react";
import styles from "./ContactUs.module.css";
import { TipJar } from "../components";

const ContactUs = () => {
  return (
    <section className={`section transition`}>
      <div className={`sectionContainer`}>
        {/************************* CONTACT FORM SECTION  *****************************/}
        <div className={`${styles.formContainer}`}>
          <div className={`${styles.container}`}>
            <h1>GET IN TOUCH</h1>
            <p>24/7 we will answer your questions</p>
          </div>

          <form>
            <input
              placeholder="Enter your names"
              className={`${styles.input}`}
            />

            <div>
              <input placeholder="Email" className={`${styles.input}`} />
              <input placeholder="Phone" className={`${styles.input}`} />
            </div>

            <textarea
              placeholder="Description"
              className={`${styles.textArea}`}
            />
          </form>
        </div>

        <TipJar />
      </div>
    </section>
  );
};

export default ContactUs;
