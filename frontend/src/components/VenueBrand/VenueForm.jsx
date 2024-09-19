import React, { useState } from "react";
import styles from "./VenueForm.module.css";
import ArrowDown from "../SVGcomponent/ArrowDown";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dropdown from "../general/Dropdown";
import { TimePicker } from "@mui/x-date-pickers";
import { FaTimes } from "react-icons/fa";
import { genre, venueType } from "../../data/data";

<<<<<<< HEAD
<<<<<<< HEAD:src/components/VenueBrand/VenueForm.jsx
const VenueForm = () => {
  // Single state to track which dropdown is open ('venue' or 'genre')
  const [activeDropdown, setActiveDropdown] = useState(null);

=======
const VenueForm = ({ formData, setFormData, text1, text2 }) => {
  const [dropdown, setDropDown] = useState(false);
>>>>>>> 6fab4b4e87ac2b1e3f6c33df75dee9ede6675d3e:frontend/src/components/VenueBrand/VenueForm.jsx
  const [tokenState, setTokenState] = useState("USDT");

=======
const VenueForm = ({ formData, setFormData}) => {
  // Single state to track which dropdown is open ('venue' or 'genre')
  const [activeDropdown, setActiveDropdown] = useState(null);

  // const [tokenState, setTokenState] = useState("USDT");

>>>>>>> new
  const toggleDropdown = (dropdownType) => {
    setActiveDropdown((prev) => (prev === dropdownType ? null : dropdownType));
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  // const tokenStateHandler = (currentToken) => {
  //   setTokenState(currentToken);
  // };


  const handleGenreSelect = (selectedGenres) => {
    setFormData((prevData) => ({
      ...prevData,
      genre_type: selectedGenres[0].genreOrType,
    }));
    closeDropdown(); 
  };

<<<<<<< HEAD
=======
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

>>>>>>> new
  return (
    <div className={`${styles.formContainer} `}>
      <div className={`${styles.inputContainer}`}>
        <div className="w-full">
          <label>Name</label>
<<<<<<< HEAD
          <input placeholder="Enter Venue Name" className={`${styles.input}`} />
=======
          <input placeholder="Enter Venue Name" className={`${styles.input}`} 
         value={formData.name}
         onChange={(e) =>
           setFormData((formData) => ({
                 ...formData,
                 name: e.target.value,
               }))
             }
             required/>
>>>>>>> new
        </div>

        <div className="w-full">
          <label>Email</label>
<<<<<<< HEAD
          <input placeholder="Enter email" className={`${styles.input}`} />
=======
          <input placeholder="Enter email" className={`${styles.input}`}
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((formData) => ({
                  ...formData,
                  email: e.target.value,
                }))
              }
              required />
>>>>>>> new
        </div>
      </div>

      <div className={`${styles.inputContainer}`}>
        <div className="w-full">
          <label>Venue type</label>

          <div className="relative">
            <input
              placeholder="Select venue type"
              className={`${styles.input}`}
<<<<<<< HEAD
<<<<<<< HEAD:src/components/VenueBrand/VenueForm.jsx
              readOnly
=======
              value={formData.Name}
              onChange={(e) =>
                setFormData((formData) => ({
                      ...formData,
                      Name: e.target.value,
                    }))
                  }
                  required
>>>>>>> 6fab4b4e87ac2b1e3f6c33df75dee9ede6675d3e:frontend/src/components/VenueBrand/VenueForm.jsx
=======
              value={formData.venue_type || ""}
              readOnly
>>>>>>> new
            />
            <button
              type="button"
              className="absolute right-4 top-4"
              onClick={() => toggleDropdown("venue")}
            >
              <ArrowDown />
            </button>
<<<<<<< HEAD

            {activeDropdown === "venue" && (
              <div className="absolute top-0 w-full bg-[#F6F8FD] z-50 p-[1rem] border-[#2659C34D] border-[1px] rounded-md">
                <button
                  type="button"
                  className="absolute right-[20px] top-[10px]"
                  onClick={closeDropdown}
                >
                  <FaTimes />
                </button>

<<<<<<< HEAD:src/components/VenueBrand/VenueForm.jsx
                <Dropdown
                  data={venueType}
                  tokenStateHandler={tokenStateHandler}
                  closeDropdown={closeDropdown}
                />
              </div>
            )}
          </div>
        </div>

        {/* GENRE INPUT */}

        <div className="w-full">
          <label>Genre type</label>

          <div className="relative">
            <input
              placeholder="Select genre type"
              className={`${styles.input}`}
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
                  tokenStateHandler={tokenStateHandler}
=======

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
>>>>>>> new
                  closeDropdown={closeDropdown}
                />
              </div>
            )}
<<<<<<< HEAD
=======
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
=======
>>>>>>> new
          </div>
        </div>

        {/* GENRE INPUT */}

<<<<<<< HEAD
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
>>>>>>> 6fab4b4e87ac2b1e3f6c33df75dee9ede6675d3e:frontend/src/components/VenueBrand/VenueForm.jsx
=======
        <div className="w-full">
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
>>>>>>> new
          </div>
        </div>
      </div>

      <div className={`${styles.inputContainer}`}>
        <div className="w-full">
          <label>Address</label>
          <input
            placeholder="Search for venue address"
            className={`${styles.input}`}
<<<<<<< HEAD
=======
            value={formData.address}
            onChange={(e) =>
              setFormData((formData) => ({
                    ...formData,
                    address: e.target.value,
                  }))
                }
                required
>>>>>>> new
          />
        </div>
      </div>

      <div className={`${styles.inputContainer}`}>
        <div className="w-full">
          <label>Date</label>
<<<<<<< HEAD
          <DatePicker className={`${styles.input}`} />
        </div>
        <div className="w-full">
          <label>Time</label>
          <TimePicker className={`${styles.input}`} />
=======
          <DatePicker className={`${styles.input}`}
          selected={formData.date}
          onChange={handleDateChange}/>
        </div>
        <div className="w-full">
          <label>Time</label>
          <TimePicker className={`${styles.input}`}
          // value={formData.time}
          onChange={handleTimeChange}
            />
>>>>>>> new
        </div>
      </div>
    </div>
  );
};

export default VenueForm;
