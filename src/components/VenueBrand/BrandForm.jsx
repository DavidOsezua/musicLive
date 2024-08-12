import React from "react";
import Button from "../general/Button";
import styles from "./BrandForm.module.css";

const BrandForm = () => {
  return (
    <div className={`${styles.formContainer}`}>
      <form className={`${styles.form}`}>
        <div className={``}>
          <label>Name</label>
          <input placeholder="Enter your names" className={`${styles.input}`} />
        </div>

        <div className={`${styles.inputContainer}`}>
          <div className="w-full">
            <label>Genre type</label>
            <input placeholder="Email" className={`${styles.input}`} />
          </div>

          <div className="w-full">
            <label>Email</label>
            <input placeholder="Phone" className={`${styles.input}`} />
          </div>
        </div>

        <div>
          <label>Band tagline</label>
          <input
            placeholder="Enter band tagline"
            className={`${styles.input}`}
          />
        </div>
      </form>
    </div>
  );
};

export default BrandForm;
