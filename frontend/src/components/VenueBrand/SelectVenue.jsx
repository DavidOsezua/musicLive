import React, { useEffect, useState } from "react";
import GreaterThan from "../SVGcomponent/GreaterThan";
import styles from "./SelectBand.module.css";
import AdminSearch from "../Dashboard/AdminSearch";
import { venueImage } from "@/assets";
import Close from "../general/Close";
import { api, Url } from "@/services/api.route";
import Loader from "../general/Loader";

const EachVenue = ({ venue, onVenueSelection }) => {
  return (
    <div
      className={`flex gap-4 items-center justify-between`}
      onClick={() => {
        onVenueSelection(venue);
      }}
    >
      <div className={`flex gap-4 items-center`}>
        <img
          src={`${Url}/${venue.image1}`}
          className={`w-[40px] h-[40px] rounded-md object-cover`}
        />

        <div className={`flex flex-col gap-0`}>
          <p className={`text-[#0A2259]`}>{venue.address}</p>
          <span className={`text-[#3D69C5]`}>{venue.venue_type}</span>
        </div>
      </div>

      <button>
        <GreaterThan />
      </button>
    </div>
  );
};
const SelectVenue = ({ close, onVenueSelection }) => {
  const [venues, setVenues] = useState([]); // State to hold venue data
  const [loading, setLoading] = useState(true); // State to show a loader while fetching data
  const [error, setError] = useState(null); // State to handle errors

  // Fetch venues from the API
  const getAllUserVenueData = async () => {
    try {
      const res = await api.get("/api/v1/venue");
      console.log(res.data);
      setVenues(res.data); // Update state with fetched data
      setError(null);
    } catch (error) {
      setError("Failed to fetch venues");
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to fetch data on component mount
  useEffect(() => {
    getAllUserVenueData();
  }, []);

  return (
    <div className={`${styles.cardContainer}`}>
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <p>Select Venue</p>
        <button onClick={close}>
          <Close />
        </button>
      </div>

      {/* Search Component */}
      <AdminSearch />

      {/* Content Section */}
      <div className={`${styles.allBands}`}>
        {loading ? (
          <Loader /> // Loader while data is fetching
        ) : error ? (
          <p className="text-red-500">{error}</p> // Display error if any
        ) : venues.length === 0 ? (
          <p>No venues available</p> // Message when no venues are found
        ) : (
          venues.map((venue) => (
            <React.Fragment key={venue.id}>
              <EachVenue venue={venue} onVenueSelection={onVenueSelection} />
              {/* Pass venue data to the child component */}
              <div className={`${styles.hr}`}></div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default SelectVenue;
