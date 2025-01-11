import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import ArrowDown from "../SVGcomponent/ArrowDown";
import Dropdown from "../general/Dropdown";
import { genre } from "../../data/data";
import styles from "./BrandForm.module.css";

const BrandForm = ({ formData, setFormData }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdownType) => {
    console.log(dropdownType);
    setActiveDropdown((prev) => (prev === dropdownType ? null : dropdownType));
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const handleGenreSelect = (selectedGenres) => {
    setFormData((prevData) => ({
      ...prevData,
      genre_type: selectedGenres[0].genreOrType,
    }));
    closeDropdown();
  };

  return (
    <div className={`${styles.formContainer}`}>
      <div className="w-full">
        <label>Name</label>
        <input
          placeholder="Enter your band name"
          className={`${styles.input}`}
          value={formData.name || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              name: e.target.value,
            }))
          }
          required
        />
      </div>

      <div className={`${styles.inputContainer}`}>
        <div className="w-full">
          <label>Genre Type</label>
          <div className="relative">
            <input
              placeholder="Select genre type"
              className={`${styles.input}`}
              value={formData.genre_type || ""}
              readOnly
            />
            <button
              type="button"
              className="absolute right-4 top-4"
              onClick={() => toggleDropdown("genre")}
            >
              <ArrowDown />
            </button>

            {activeDropdown === "genre" && (
              <div className="absolute top-0 w-full bg-[#F6F8FD] z-50 p-[1rem] border-[#2659C34D] border-[1px] rounded-md">
                <Dropdown
                  data={genre}
                  setGenre={handleGenreSelect}
                  closeDropdown={closeDropdown}
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-full">
          <label>Email</label>
          <input
            placeholder="Enter your email"
            className={`${styles.input}`}
            value={formData.email || ""}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                email: e.target.value,
              }))
            }
            required
          />
        </div>
      </div>

      <div>
        <label>Band Tagline</label>
        <input
          placeholder="Enter band tagline"
          className={`${styles.input}`}
          value={formData.band_tag || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              band_tag: e.target.value,
            }))
          }
          required
        />
      </div>

      <div className={`text-center`}>
        <p>Interested In Being a Featured Band ?</p>
        <p>Ask us here!</p>
      </div>
    </div>
  );
};

export default BrandForm;
