import React from "react";
import styles from "./VenueForm.module.css";

const VenueForm = () => {
  return (
    <div className={`${styles.formContainer}`}>
      <form className={`${styles.form}`}>
        <div className={`${styles.inputContainer}`}>
          <div className="w-full">
            <label>Name</label>
            <input
              placeholder="Enter Venue Name"
              className={`${styles.input}`}
            />
          </div>

          <div className="w-full">
            <label>Venue type</label>
            <input
              placeholder="Select venue type"
              className={`${styles.input}`}
            />
          </div>
        </div>

        {/*  */}
        <div className={`${styles.inputContainer}`}>
          <div className="w-full">
            <label>Address</label>
            <input
              placeholder="Search for venue address"
              className={`${styles.input}`}
            />
          </div>

          <div className="w-full">
            <label>Email</label>
            <input placeholder="Enter email" className={`${styles.input}`} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default VenueForm;
