import { genre, venueType } from "../../data/data";
import { useEffect, useState } from "react";
import { TipJar } from "../../components";
import Search from "../../components/general/Search";
import styles from "./Venues.module.css";
import Button from "../../components/general/Button";
// import { desktopMap } from "../../assets";
import Map from "../../components/VenueBrand/Map";
import Dropdown from "../../components/general/Dropdown";
import { facebook, instagram, website } from "../../assets";
import { Url, api } from "../../services/api.route";
import { useLocation, useSearchParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import EachVenue from "./EachVenue";

const Venues = () => {
  // const [searchParams] = useSearchParams();
  // const query = searchParams.get("query");

  // const [dropdown, setDropDown] = useState(false);
  // const [selectVenue, setSelectVenue] = useState([]);

  // const [venues, setVenues] = useState([]);

  // const [searchData, setSearchData] = useState({
  //   name: "",
  //   genre: query || "",
  //   types: [],
  // });

  // const location = useLocation();
  // const { date, location: selectedLocation } = location.state || {};

  // const handleRemoveVenue = (id) => {
  //   setSelectVenue((prev) => prev.filter((venue) => venue.ID !== id));
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   setSearchData((prevFormData) => ({
  //     ...prevFormData,
  //     name: value,
  //   }));
  // };

  // const handleGenre = (selectedGenres) => {
  //   const genres = selectedGenres.map((gnr) => gnr.genreOrType);
  //   console.log("checking genres");
  //   console.log(genres);
  //   setSearchData((prevData) => {
  //     return { ...prevData, types: genres };
  //   });
  //   closeDropdown();
  // };

  // useEffect(() => {
  //   console.log(searchData);
  //   const searchParams = { ...searchData };
  //   searchParams.types = searchParams.types.join(",");

  //   const getVenues = async () => {
  //     try {
  //       const params = {};
  //       Object.entries(searchParams).forEach(([key, value]) => {
  //         if (value) params[key] = value;
  //       });

  //       console.log(params);

  //       const response = await api.get("/api/v1/venue/search", {
  //         params: params,
  //       });
  //       console.log(response.data);
  //       setVenues(response.data);
  //     } catch (error) {
  //       console.error("Error occurred when getting the user band:", error);
  //       console.error(error || "An unexpected error occurred");
  //       setVenues([]);
  //     }
  //   };
  //   getVenues();
  // }, [searchData]);

  // const showDropdown = () => {
  //   setDropDown((prev) => !prev);
  // };

  // const closeDropdown = () => {
  //   setDropDown(false);
  // };

  // console.log(selectVenue);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [dropdown, setDropDown] = useState(false);
  const [selectVenue, setSelectVenue] = useState([]); // Track selected venues

  const [venues, setVenues] = useState([]);

  const [searchData, setSearchData] = useState({
    name: "",
    genre: query || "",
    types: [], // To store the types of venues selected
    selectedVenues: [], // Track selected venues
  });

  const location = useLocation();
  const { date, location: selectedLocation } = location.state || {};

  // Handles input change for search fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // Update name or genre based on input
    }));
  };

  // Handles selecting venues from dropdown and updating search data
  const handleGenre = (selectedGenres) => {
    const genres = selectedGenres.map((gnr) => gnr.genreOrType);
    setSearchData((prevData) => {
      return { ...prevData, types: genres, selectedVenues: selectedGenres };
    });
    closeDropdown();
  };

  // Fetches venues based on search criteria and selected venues
  useEffect(() => {
    const searchParams = { ...searchData };
    searchParams.types = searchParams.types.join(","); // Convert selected types to comma-separated string

    const getVenues = async () => {
      try {
        const params = {};
        Object.entries(searchParams).forEach(([key, value]) => {
          if (value) params[key] = value; // Only add non-empty parameters
        });

        console.log("API Search Params:", params);

        const response = await api.get("/api/v1/venue/search", {
          params: params,
        });
        console.log("Fetched venues:", response.data);
        setVenues(response.data); // Update venues
      } catch (error) {
        console.error("Error occurred when getting the venues:", error);
        setVenues([]); // Clear venues on error
      }
    };

    getVenues();
  }, [searchData]);

  // Shows/hides dropdown for venue selection
  const showDropdown = () => {
    setDropDown((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropDown(false);
  };

  // Removes a selected venue and resets the search to show all venues
  const handleRemoveVenue = (id) => {
    const updatedSelectedVenues = selectVenue.filter(
      (venue) => venue.ID !== id
    );
    setSelectVenue(updatedSelectedVenues);

    // If no more venues are selected, reset the search criteria to show all venues
    if (updatedSelectedVenues.length === 0) {
      setSearchData((prevData) => ({
        ...prevData,
        types: [], // Reset the types to fetch all venues
        selectedVenues: [], // Clear the selected venues
      }));
    } else {
      setSearchData((prevData) => ({
        ...prevData,
        selectedVenues: updatedSelectedVenues,
        types: updatedSelectedVenues.map((venue) => venue.genreOrType),
      }));
    }
  };
  return (
    <>
      <section className={`${styles.venueSection} transition `}>
        <div className={`${styles.search} px-[1rem] relative`}>
          <Search
            showDropdown={showDropdown}
            searchData={searchData}
            handleInputChange={handleInputChange}
          />

          {dropdown && (
            <div className="absolute bg-slate-100 w-full px-[2rem] py-[1rem] z-[10] top-[50px] rounded-md">
              <Dropdown
                data={venueType}
                setGenre={handleGenre}
                closeDropdown={closeDropdown}
                setSelectVenue={setSelectVenue}
              />
            </div>
          )}

          <div className={`${styles.card} `}>
            {selectVenue.length > 0
              ? selectVenue.map((item) => (
                  <div key={item.ID} className={`${styles.dropItem} relative`}>
                    <img
                      src={item.image}
                      alt={item.genreOrType}
                      className="w-[15px]"
                    />
                    <p className="text-[0.8rem]">{item.genreOrType}</p>
                    {/* Cancel button to remove the venue */}
                    <button
                      onClick={() => handleRemoveVenue(item.ID)}
                      className="absolute top-[50%] transform translate-y-[-50%] right-[5%]"
                    >
                      <FaTimes className="font-light" />
                    </button>
                  </div>
                ))
              : ""}
          </div>
        </div>

        <div className={`${styles.map} px-0 `}>
          <Map venues={venues} />
        </div>

        {/******** BANDS DETAILS  *********/}

        {/* <div className={`${styles.bandDetailsContainer}`}>
          {venues.map((venue) => (
            <div key={venue.id} className={`${styles.bandDetail}`}>
              <a href="#" rel="noopener noreferrer">
                <img
                  src={`${Url}/${venue.image1}`}
                  alt={`${venue.name} image 1`}
                  className={`${Url}/ ${styles.image}`}
                />
              </a>

              <span>{venue.venue_type}</span>
              <h1 className={`${styles.bandName}`}>
                {String(venue.name).charAt(0).toUpperCase() +
                  String(venue.name.slice(1))}
              </h1>

              <div className={`${styles.socials}`}>
                {venue.facebook_url === "" ? (
                  ""
                ) : (
                  <a
                    href={venue.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={facebook} alt="Facebook" key={1} />
                  </a>
                )}
                {venue.instagram_url === "" ? (
                  ""
                ) : (
                  <a
                    href={venue.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={instagram} alt="Instagram" key={2} />
                  </a>
                )}
                {venue.youtube_url === "" ? (
                  ""
                ) : (
                  <a
                    href={venue.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={website} alt="YouTube" key={3} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div> */}

        {/* Venue Details  */}

      
          <div className={`${styles.bandDetailsContainer}`}>
            {Array.from({ length: 12 }).map((item) => (
              <>
                <EachVenue />
              </>
            ))}
          </div>
        

        <div className={`flex flex-col items-center ${styles.showMore}`}>
          <p className={`text-[#0A2259] pb-4`}>
            Continue exploring Live Bands!!
          </p>
          <Button
            text={`Show more`}
            width={`w-[236px]`}
            colored
            radius={`rounded-full`}
          />
        </div>
      </section>
      <TipJar />
    </>
  );
};

export default Venues;
