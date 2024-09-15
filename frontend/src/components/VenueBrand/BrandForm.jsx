import React from "react";
import Button from "../general/Button";
import styles from "./BrandForm.module.css";
import ArrowDown from "../SVGcomponent/ArrowDown";

const BrandForm = ({ formData, setFormData, text1, text2 }) => {
  return (
    <div className={`${styles.formContainer}`}>
      <form className={`${styles.form}`}>
        <div className={``}>
          <label>Name</label>
          <input placeholder="Enter your names" className={`${styles.input}`} 
          value={formData.Name}
          onChange={(e) =>
            setFormData((formData) => ({
                  ...formData,
                  Name: e.target.value,
                }))
              }
              required/>
        </div>

        <div className={`${styles.inputContainer}`}>
          <div className="w-full">
            <label>Genre type</label>

            <div className="relative">
              <input
                placeholder="Select genre type"
                className={`${styles.input}`} 

                value={formData.genreType}
                onChange={(e) =>
                  setFormData((formData) => ({
                        ...formData,
                        genreType: e.target.value,
                      }))
                    }
                    required
              />
              <button className="absolute right-4 top-4">
                <ArrowDown />
              </button>
            </div>
          </div>

          <div className="w-full">
            <label>Email</label>
            <input placeholder="Email" className={`${styles.input}`}
            value={formData.Email}
            onChange={(e) =>
              setFormData((formData) => ({
                    ...formData,
                    Email: e.target.value,
                  }))
                }
                required />
          </div>
        </div>

        <div>
          <label>Band tagline</label>
          <input
            placeholder="Enter band tagline"
            className={`${styles.input}`}
            value={formData.tagLine}
            onChange={(e) =>
              setFormData((formData) => ({
                    ...formData,
                    tagLine: e.target.value,
                  }))
                }
                required />
        </div>
      </form>
    </div>
  );
};

export default BrandForm;
