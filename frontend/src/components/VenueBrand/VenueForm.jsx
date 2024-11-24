import React, { useState } from "react";
import styles from "./VenueForm.module.css";
import ArrowDown from "../SVGcomponent/ArrowDown";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dropdown from "../general/Dropdown";
import { TimePicker } from "@mui/x-date-pickers";
import { FaTimes } from "react-icons/fa";
import { genre, venueType } from "../../data/data";

const VenueForm = ({ formData, setFormData }) => {
  // Single state to track which dropdown is open ('venue' or 'genre')
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdownType) => {
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

  const handleGenre = (selectedGenres) => {
    setFormData((prevData) => ({
      ...prevData,
      venue_type: selectedGenres[0].genreOrType,
    }));
    closeDropdown();
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date,
    }));
  };

  const handleTimeChange = (time) => {
    setFormData((prev) => ({
      ...prev,
      time: time,
    }));
  };

  return (
    <div className={`${styles.formContainer} `}>
      <div className={`${styles.inputContainer}`}>
        <div className="w-full">
          <label>Name</label>
          <input
            placeholder="Enter Venue Name"
            className={`${styles.input}`}
            value={formData.name}
            onChange={(e) =>
              setFormData((formData) => ({
                ...formData,
                name: e.target.value,
              }))
            }
            required
          />
        </div>

        <div className="w-full">
          <label>Email</label>
          <input
            placeholder="Enter email"
            className={`${styles.input}`}
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((formData) => ({
                ...formData,
                email: e.target.value,
              }))
            }
            required
          />
        </div>
      </div>

      <div className={`${styles.inputContainer}`}>
        <div className="w-full">
          <label>Venue type</label>

          <div className="relative">
            <input
              placeholder="Select venue type"
              className={`${styles.input}`}
              value={formData.venue_type || ""}
              readOnly
            />
            <button
              type="button"
              className="absolute right-4 top-4"
              onClick={() => toggleDropdown("venue")}
            >
              <ArrowDown />
            </button>

            {activeDropdown === "venue" && (
              <div className="absolute top-0 w-full bg-[#F6F8FD] z-50 p-[1rem] border-[#2659C34D] border-[1px] rounded-md">
                <button
                  type="button"
                  className="absolute right-[20px] top-[10px]"
                  onClick={closeDropdown}
                >
                  <FaTimes />
                </button>

                <Dropdown
                  data={venueType}
                  setGenre={handleGenre}
                  closeDropdown={closeDropdown}
                />
              </div>
            )}
          </div>

          {/* GENRE INPUT */}

          {/* <div className="w-full">
          <label>Genre type</label>

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
                <button
                  type="button"
                  className="absolute right-[20px] top-[10px]"
                  onClick={closeDropdown}
                >
                  <FaTimes />
                </button>
                <Dropdown
                  data={genre}
                  setGenre={handleGenreSelect}
                  closeDropdown={closeDropdown}
                />
              </div>
            )}
          </div>
        </div> */}
        </div>

        <div className={`${styles.inputContainer}`}>
          <div className="w-full">
            <label>Address</label>
            <input
              placeholder="Search for venue address"
              className={`${styles.input}`}
              value={formData.address}
              onChange={(e) =>
                setFormData((formData) => ({
                  ...formData,
                  address: e.target.value,
                }))
              }
              required
            />
          </div>
        </div>

        {/* <div className={`${styles.inputContainer}`}>
        <div className="w-full">
          <label>Date</label>
          <DatePicker
            className={`${styles.input}`}
            selected={formData.date}
            onChange={handleDateChange}
          />
        </div>
        <div className="w-full">
          <label>Time</label>
          <TimePicker
            className={`${styles.input}`}
            value={formData.time}
            onChange={handleTimeChange}
          />
        </div>
      </div> */}
      </div>
      <div className={`text-center`}>
        <p>Interested In Being a Featured venue ?</p>
        <p>Ask us here!</p>
      </div>
    </div>
  );
};

export default VenueForm;
