import React from "react";
import styles from "./BrandVenueForm.module.css";
import Upload from "../SVGcomponent/Upload";

const BrandVenueForm = ({ formData, setFormData, text1, text2 }) => {
  return (
    <div className={`${styles.formContainer}`}>
      <form className={`${styles.form}`}>
        <div className={`${styles.inputContainer}`}>
          <div className="w-full">
            <label>Homepage</label>
            <input placeholder="Add web link" className={`${styles.input}`} 
            value={formData.homePage}
            onChange={(e) =>
              setFormData((formData) => ({
                ...formData,
                homePage: e.target.value,
              }))
            }
            required
              />
          </div>

          <div className="w-full">
            <label>Facebook</label>
            <input
              placeholder="Add facebook link"
              className={`${styles.input}`}
              value={formData.Facebook}
              onChange={(e) =>
                setFormData((formData) => ({
                  ...formData,
                  Facebook: e.target.value,
                }))
              }
              required
            />
          </div>
        </div>

        <div className={`${styles.inputContainer}`}>
          <div className="w-full">
            <label>Instagram</label>
            <input
              placeholder="Add Instagram link"
              className={`${styles.input}`}
              value={formData.Instagram}
              onChange={(e) =>
                setFormData((formData) => ({
                  ...formData,
                  Instagram: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="w-full">
            <label>Youtube</label>
            <input
              placeholder="Add youtube link"
              className={`${styles.input}`}
              value={formData.Youtube}
              onChange={(e) =>
                setFormData((formData) => ({
                  ...formData,
                  Youtube: e.target.value,
                }))
              }
              required
            />
          </div>
        </div>

        <div className={`${styles.inputFileContainer}`}>
          <label className={styles.label}>Image 400px X 400px</label>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.upload}`}>
              <div className={styles.uploadContainer}>
                <Upload />
                <p className={styles.uploadText}>Upload image 1</p>
              </div>
              <input
                type="file"
                className={styles.uploadBox}
                onChange={(e) =>
                  setFormData((formData) => ({
                    ...formData,
                    Image1: e.target.files[0], // Handle file selection
                  }))
                }
                required
              />
            </div>

            <div className={`${styles.upload}`}>
              <div className={styles.uploadContainer}>
                <Upload />
                <p className={styles.uploadText}>Upload image 2</p>
              </div>
              <input
                type="file"
                className={styles.uploadBox}
                onChange={(e) =>
                  setFormData((formData) => ({
                    ...formData,
                    Image2: e.target.files[0], // Handle file selection
                  }))
                }
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className="text-[#00000080]">{text1}</p>
          <p className="text-[#0A2259]">{text2}</p>
        </div>
      </form>
    </div>
  );
};

export default BrandVenueForm;
