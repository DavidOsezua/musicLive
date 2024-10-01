import React, { useState } from "react";
import styles from "./BrandVenueForm.module.css";
import Upload from "../SVGcomponent/Upload";

const BrandVenueForm = ({ formData, setFormData, text1, text2 }) => {
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);

  const formHandler = (e) => {
    const file = e.target.files[0];
    setFormData((formData) => ({
      ...formData,
      image1: file, // Save file in formData
    }));
    setImage(file); // Directly set image for preview
  };

  const formHandler2 = (e) => {
    const file = e.target.files[0];
    setFormData((formData) => ({
      ...formData,
      image2: file, // Save file in formData
    }));
    setImage2(file); // Directly set image for preview
  };

  return (
    <div className={`${styles.formContainer}`}>
      <form className={`${styles.form}`}>
        <div className={`${styles.inputContainer}`}>
          <div className="w-full">
            <label>Homepage</label>
            <input
              placeholder="Add web link"
              className={`${styles.input}`}
              value={formData.homepage}
              onChange={(e) =>
                setFormData((formData) => ({
                  ...formData,
                  homepage: e.target.value,
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
              value={formData.facebook}
              onChange={(e) =>
                setFormData((formData) => ({
                  ...formData,
                  facebook: e.target.value,
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
              value={formData.instagram}
              onChange={(e) =>
                setFormData((formData) => ({
                  ...formData,
                  instagram: e.target.value,
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
              value={formData.youtube}
              onChange={(e) =>
                setFormData((formData) => ({
                  ...formData,
                  youtube: e.target.value,
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
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  className={`w-[100%] h-[70px] rounded-md  object-cover mx-auto`}
                />
              ) : (
                <div className={styles.uploadContainer}>
                  <Upload />
                  <p className={styles.uploadText}>Upload image 1</p>
                </div>
              )}

              <input
                type="file"
                className={styles.uploadBox}
                onChange={formHandler}
                required
              />
            </div>

            <div className={`${styles.upload}`}>
              {image2 ? (
                <img
                  src={URL.createObjectURL(image2)}
                  className={`w-[100%] h-[70px] rounded-md  object-cover mx-auto`}
                />
              ) : (
                <div className={styles.uploadContainer}>
                  <Upload />
                  <p className={styles.uploadText}>Upload image 2</p>
                </div>
              )}
              <input
                type="file"
                className={styles.uploadBox}
                onChange={formHandler2}
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
