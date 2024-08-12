import React from "react";
import styles from "./BrandVenueForm.module.css";
import Upload from "../SVGcomponent/Upload";

const BrandVenueForm = () => {
  return (
    <div className={`${styles.formContainer}`}>
      <form className={`${styles.form}`}>
        <div className={`${styles.inputContainer}`}>
          <div className="w-full">
            <label>Homepage</label>
            <input placeholder="Add web link" className={`${styles.input}`} />
          </div>

          <div className="w-full">
            <label>Facebook</label>
            <input
              placeholder="Add facebook link"
              className={`${styles.input}`}
            />
          </div>
        </div>

        {/*  */}

        <div className={`${styles.inputContainer}`}>
          <div className="w-full">
            <label>Instagram</label>
            <input
              placeholder="Add Instagram link"
              className={`${styles.input}`}
            />
          </div>

          <div className="w-full">
            <label>Youtube</label>
            <input
              placeholder="Add youtube link"
              className={`${styles.input}`}
            />
          </div>
        </div>

        {/*  */}
        <div className={`${styles.inputFileContainer}  `}>
          <label className={styles.label}>Image 400px X 400px</label>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.upload}`}>
              <div className={styles.uploadContainer}>
                <Upload />
                <p className={styles.uploadText}>Upload image 1</p>
              </div>

              <input type="file" className={styles.uploadBox} />
            </div>

            <div className={`${styles.upload}`}>
              <div className={styles.uploadContainer}>
                <Upload />
                <p className={styles.uploadText}>Upload image 2</p>
              </div>

              <input type="file" className={styles.uploadBox} />
            </div>
          </div>
        </div>

        <div>
          <p className="text-[#00000080]">
            Pending Gigs? E-mail us the Venue names and Dates we will help you.
          </p>
          <p className="text-[#0A2259]">
            Send to: addMyBand@findmelivemusic.com
          </p>
        </div>
      </form>
    </div>
  );
};

export default BrandVenueForm;
