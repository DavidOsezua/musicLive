import React, { useEffect, useState } from "react";
import styles from "./SelectBand.module.css";
import AdminSearch from "../Dashboard/AdminSearch";
import { band1, venueImage } from "@/assets";
import Close from "../general/Close";
import ArrowRight from "../SVGcomponent/ArrowRight";
import GreaterThan from "../SVGcomponent/GreaterThan";
import Loader from "../general/Loader";
import { api, Url } from "@/services/api.route";

const EachBand = ({ band, onBandSelection }) => {
  console.log(band);

  return (
    <div
      className={`flex gap-4 items-center justify-between`}
      onClick={() => onBandSelection(band)}
    >
      <div className={`flex gap-4 items-center`}>
        <img
          src={`${Url}/${band.image1}`}
          className={`w-[40px] h-[40px] rounded-md object-cover`}
        />

        <div className={`flex flex-col gap-0`}>
          <p className={`text-[#0A2259]`}>{band.name}</p>
          <span className={`text-[#C32FB4]`}>{band.genre_type}</span>
        </div>
      </div>

      <button>
        <GreaterThan />
      </button>
    </div>
  );
};

const SelectBand = ({ close, onBandSelection }) => {
  const [bands, setBands] = useState([]); // State to hold band data
  const [filteredData, setFilteredData] = useState([]); // state that holds the filtered data
  const [loading, setLoading] = useState(true); // State to show a loader while fetching data
  const [error, setError] = useState(null); // State to handle errors

  // Fetch Bands from the API
  const getAllUserBandData = async () => {
    try {
      const res = await api.get("/api/v1/band");
      console.log(res.data);
      setBands(res.data); // Update state with fetched data
      setError(null);
    } catch (error) {
      setError("Failed to fetch bands");
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to fetch data on component mount
  useEffect(() => {
    getAllUserBandData();
  }, []);

  const handleSearch = (query) => {
    if (query === "") return setFilteredData(bands);
    const queryLowercase = query.toLowerCase();
    const filtered = bands.filter(
      (band) =>
        band.name.includes(queryLowercase) ||
        band.genre_type.includes(queryLowercase)
    );

    setFilteredData(filtered);
  };

  return (
    <div className={`${styles.cardContainer}`}>
      <div className={`flex justify-between items-center`}>
        <p>Select Band</p>

        <button onClick={close}>
          <Close />
        </button>
      </div>
      <AdminSearch onSearch={handleSearch} />

      {/* Content Section */}
      <div className={`${styles.allBands}`}>
        {loading ? (
          <Loader /> // Loader while data is fetching
        ) : error ? (
          <p className="text-red-500">{error}</p> // Display error if any
        ) : bands.length === 0 ? (
          <p>No bands available</p> // Message when no bands are found
        ) : (
          filteredData.map((band) => (
            <React.Fragment key={band.id}>
              <EachBand band={band} onBandSelection={onBandSelection} />
              {/* Pass band data to the child component */}
              <div className={`${styles.hr}`}></div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default SelectBand;
