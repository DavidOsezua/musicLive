import React from "react";
import Button from "../general/Button";
import styles from "./BrandForm.module.css";
import ArrowDown from "../SVGcomponent/ArrowDown";

const BrandForm = () => {
  return (
    <div className={`${styles.formContainer}`}>
      <div className="w-full">
        <label>Name</label>
        <input placeholder="Enter your names" className={`${styles.input}`} />
      </div>

      <div className={`${styles.inputContainer}`}>
        <div className="w-full">
          <label>Genre type</label>

          <div className="relative">
            <input
              placeholder="Select genre type"
              className={`${styles.input}`}
            />
            <button className="absolute right-4 top-4">
              <ArrowDown />
            </button>
          </div>
        </div>

        <div className="w-full">
          <label>Email</label>
          <input placeholder="Phone" className={`${styles.input}`} />
        </div>
      </div>

      <div>
        <label>Band tagline</label>
        <input placeholder="Enter band tagline" className={`${styles.input}`} />
      </div>
    </div>
  );
};

export default BrandForm;
