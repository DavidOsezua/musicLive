import React, { useEffect, useState } from "react";
import styles from "./SelectBand.module.css";
import AdminSearch from "../Dashboard/AdminSearch";
import Close from "../general/Close";
import Loader from "../general/Loader";
import { api, Url } from "@/services/api.route";
import GreaterThan from "../SVGcomponent/GreaterThan";

const EachBand = ({ band, onBandSelection }) => {
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
  const [bands, setBands] = useState([]); // Holds full band data
  const [filteredData, setFilteredData] = useState([]); // Holds filtered data
  const [loading, setLoading] = useState(true); // Loader state
  const [error, setError] = useState(null); // Error state

  // Fetch Bands from the API
  const getAllUserBandData = async () => {
    try {
      const res = await api.get("/api/v1/band");
      setBands(res.data); // Update bands
      setFilteredData(res.data); // Initialize filteredData with all bands
      setError(null);
    } catch (error) {
      setError("Failed to fetch bands");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getAllUserBandData();
  }, []);

  // Search handler
  const handleSearch = (query) => {
    if (query === "") {
      setFilteredData(bands); // Reset to all bands if query is empty
      return;
    }

    const queryLowercase = query.toLowerCase();
    const filtered = bands.filter(
      (band) =>
        band.name.toLowerCase().includes(queryLowercase) ||
        band.genre_type.toLowerCase().includes(queryLowercase)
    );

    setFilteredData(filtered); // Update filtered data
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
          <Loader />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredData.length === 0 ? (
          <p>No bands available</p>
        ) : (
          filteredData.map((band) => (
            <React.Fragment key={band.id}>
              <EachBand band={band} onBandSelection={onBandSelection} />
              <div className={`${styles.hr}`}></div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default SelectBand;
