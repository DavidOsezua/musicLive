import React, { useState } from "react";
import styles from "./VenueForm.module.css";
import ArrowDown from "../SVGcomponent/ArrowDown";
import Dropdown from "../general/Dropdown";

const VenueForm = ({ formData, setFormData, text1, text2 }) => {
  const [dropdown, setDropDown] = useState(false);
  const [tokenState, setTokenState] = useState("USDT");

  const showDropdown = (e) => {
    e.preventDefault();
    setDropDown((prev) => !prev);
  };

const selectVenuetype = [
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
    { value: "Divorced", label: "Divorced" },
    { value: "Widowed", label: "Widowed" },
  ];
  

  const closeDropdown = () => {
    setDropDown(false);
  };

  const tokenStateHandler = (currentToken) => {
    setTokenState(currentToken);
  };
  return (
    <div className={`${styles.formContainer}`}>
      <form className={`${styles.form}`}>
        <div className={`${styles.inputContainer}`}>
          <div className="w-full">
            <label>Name</label>
            <input
              placeholder="Enter Venue Name"
              className={`${styles.input}`}
              value={formData.Name}
              onChange={(e) =>
                setFormData((formData) => ({
                      ...formData,
                      Name: e.target.value,
                    }))
                  }
                  required
            />
          </div>

          <div className="w-full">
            <label>Venue type</label>

            <div className="relative">
              <input
                placeholder="Select venue type"
                className={`${styles.input}`}

                onChange={(e) =>
                  setFormData((formData) => ({
                        ...formData,
                        venueType: e.target.value,
                      }))
                    }
                    required
              />
              <button className="absolute right-4 top-4" onClick={showDropdown}
              value={selectVenuetype.find(
                (option) => option.value === formData.venueType
              )}>
                <ArrowDown />
              </button>

              {dropdown && (
                <div className="absolute top-0 w-full bg-[#F6F8FD] p-[1rem] border-[#2659C34D] border-[1px] rounded-md ">
                  <Dropdown
                    tokenStateHandler={tokenStateHandler}
                    closeDropdown={closeDropdown}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/*  */}
        <div className={`${styles.inputContainer}`}>
          <div className="w-full">
            <label>Address</label>
            <input
              placeholder="Search for venue address"
              className={`${styles.input}`}
              value={formData.Address}
              onChange={(e) =>
                setFormData((formData) => ({
                      ...formData,
                      Address: e.target.value,
                    }))
                  }
                  required
            />
          </div>

          <div className="w-full">
            <label>Email</label>
            <input placeholder="Enter email" className={`${styles.input}`}
             type="email"
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
      </form>
    </div>
  );
};

export default VenueForm;
