import { genre, venueType } from "../../data/data";
import { useContext, useEffect, useState } from "react";
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
import Modal from "@/components/general/Modal";
import EventPopUp from "./EventPopUp";
import { LocationPopUpContext } from "@/contexts/locationPopContext";

const Venues = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const dateQuery = searchParams.get("date");

  const { popUp, setPopup } = useContext(LocationPopUpContext);
  const [dropdown, setDropDown] = useState(false);
  const [page, setPage] = useState(6); // Track current page
  const [selectVenue, setSelectVenue] = useState([]); // Track selected venues
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const [venues, setVenues] = useState([]);

  const [searchData, setSearchData] = useState({
    name: "",
    types: [], // To store the types of venues selected
    selectedVenues: [], // Track selected venues
    genre_type: query || "",
    date: dateQuery,
  });

  const location = useLocation();
  const { date, location: selectedLocation } = location.state || {};

  // Handles input change for search fields
  const handleInputChange = (e) => {
    console.log(e.target);
    // const { name, value } = e.target;
    setSearchData((prevFormData) => ({
      ...prevFormData,
      name: e.target.value, // Update name or genre based on input
    }));
  };

  // Handles selecting venues from dropdown and updating search data
  const handleGenre = (selectedGenres) => {
    console.log(selectedGenres);
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

    console.log(searchParams.types);

    const getVenues = async () => {
      setIsLoading(true);
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
        // setVenues((prevVenues) => [...prevVenues, ...response.data]);
        setVenues(response.data); // Update venues
      } catch (error) {
        console.error("Error occurred when getting the venues:", error);
        setVenues([]); // Clear venues on error
      } finally {
        setIsLoading(false);
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

  // Load more venues when "Show More" button is clicked
  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 3);
  };

  console.log(venues);
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

        {/* Venue Details  */}

        <div className={`${styles.bandWrapper}`}>
          <div className={`${styles.bandDetailsContainer}`}>
            {venues.slice(0, page).map((item) => (
              <>
                <EachVenue data={item} />
              </>
            ))}
          </div>
        </div>

        {page < 9 ? (
          <div className={`flex flex-col items-center ${styles.showMore}`}>
            <p className={`text-[#0A2259] pb-4`}>
              Continue exploring Live Bands!!
            </p>
            <Button
              text={`${isLoading ? "Loading..." : "Show more"}`}
              width={`w-[236px]`}
              colored
              clickFunction={handleShowMore}
              radius={`rounded-full`}
            />
          </div>
        ) : (
          ""
        )}
      </section>
      <TipJar />
      {popUp && (
        <Modal modalHandler={() => setPopup((value) => !value)}>
          <EventPopUp />
        </Modal>
      )}
    </>
  );
};

export default Venues;
