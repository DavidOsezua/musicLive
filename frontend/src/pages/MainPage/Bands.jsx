import React, { useEffect, useState } from "react";
import { TipJar } from "../../components";
import PageHeader from "../../components/general/PageHeader";
import Search from "../../components/general/Search";
import { genre } from "../../data/data";
import Button from "../../components/general/Button";
import Genre from "../../components/general/Genre";
import styles from "./Bands.module.css";
import GenreScroll from "../../components/general/GenreScroll";
import Dropdown from "../../components/general/Dropdown";
import { facebook, instagram, website } from "../../assets";
import { Url, api } from "../../services/api.route";
import { FaTimes } from "react-icons/fa";
import Loader from "@/components/general/Loader";
// import { set } from "react-datepicker/dist/date_utils";

const Bands = () => {
  const [dropdown, setDropDown] = useState(false);
  const [selectGenre, setSelectGenre] = useState([]); // Track selected bands
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [bands, setBands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState({
    name: "",
    genre_type: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSearchData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDropdownGenre = (selectedGenres) => {
    console.log(selectedGenres);
    const genres = selectedGenres.map((item) => item.genreOrType);
    console.log(genres);
    setSearchData((prevData) => ({
      ...prevData,
      genre_type: [genres],
    }));
    closeDropdown();
  };

  const handleGenre = (selectedGenres) => {
    const genre = selectedGenres.map((item) => item.name);
    console.log(selectedGenres);
    setSearchData((prevData) => ({
      ...prevData,
      genre_type: genre,
    }));
  };

  useEffect(() => {
    const getBands = async () => {
      setIsLoading(true);
      const searchParams = { ...searchData };
      searchParams.genre_type = searchParams.genre_type.join(",");

      try {
        const params = {};
        Object.entries(searchParams).forEach(([key, value]) => {
          if (value) params[key] = value;
        });

        const response = await api.get("/api/v1/band/search", {
          params: params,
        });

        console.log(response.data);
        setBands(response.data);
      } catch (error) {
        console.error("Error occurred when getting the user band:", error);
        console.error(error || "An unexpected error occurred");
        setBands([]);
      } finally {
        setIsLoading(false);
      }
    };

    getBands();
  }, [searchData]);

  const showDropdown = () => {
    setDropDown((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropDown(false);
  };

  const handleRemoveGenre = (id) => {
    console.log(id);
    const updatedSelectedGenres = selectedGenre.filter(
      (genre) => genre.id !== id
    );
    setSelectedGenre(updatedSelectedGenres);

    // If no more venues are selected, reset the search criteria to show all venues
    if (updatedSelectedGenres.length === 0) {
      setSearchData((prevData) => ({
        ...prevData,
        genre_type: [],
      }));
    } else {
      setSearchData((prevData) => ({
        ...prevData,
        selectedVenues: updatedSelectedGenres,
        types: updatedSelectedGenres.map((genre) => genre.name),
      }));
    }
  };

  // Removes a selected venue and resets the search to show all venues
  const handleRemoveSelectedGenre = (id) => {
    console.log(id);
    const updatedSelectedVenues = selectGenre.filter(
      (venue) => venue.ID !== id
    );
    setSelectGenre(updatedSelectedVenues);

    // If no more venues are selected, reset the search criteria to show all venues
    if (updatedSelectedVenues.length === 0) {
      setSearchData((prevData) => ({
        ...prevData,
        genre_type: [],
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
    <section className={`section py-0 px-0 transition`}>
      <div>
        <PageHeader page={`Bands`} />

        <div className="mt-[-1rem] px-[1rem] relative">
          <Search
            showDropdown={showDropdown}
            searchData={searchData}
            handleInputChange={handleInputChange}
          />
          {dropdown && (
            <div className="absolute top-0 w-full bg-[#F6F8FD] z-50 p-[1rem] border-[#2659C34D] border-[1px] rounded-md max-w-[500px] right-10">
              <Dropdown
                data={genre}
                setGenre={handleDropdownGenre}
                closeDropdown={closeDropdown}
                setSelectVenue={setSelectGenre}
              />
            </div>
          )}
        </div>
      </div>
      <div className={`sectionContainer ${styles.bandContainer}`}>
        <div className={`${styles.card} `}>
          {selectGenre.length > 0
            ? selectGenre.map((item) => (
                <div key={item.ID} className={`${styles.dropItem} relative`}>
                  <img
                    src={item.image}
                    alt={item.genreOrType}
                    className="w-[15px]"
                  />
                  <p className="text-[0.8rem]">{item.genreOrType}</p>

                  <button
                    onClick={() => handleRemoveSelectedGenre(item.ID)}
                    className="absolute top-[50%] transform translate-y-[-50%] right-[5%]"
                  >
                    <FaTimes className="font-light" />
                  </button>
                </div>
              ))
            : ""}
          {selectedGenre.length > 0
            ? selectedGenre.map((item) => (
                <div key={item.id} className={`${styles.dropItem} relative`}>
             
                  <p className="text-[0.9rem] font-bold ">{item.name}</p>

                  <button
                    onClick={() => handleRemoveGenre(item.id)}
                    className="absolute top-[50%] transform translate-y-[-50%] right-[5%]"
                  >
                    <FaTimes className="font-light" />
                  </button>
                </div>
              ))
            : ""}
        </div>

        {/******** GRENE  *********/}
        <GenreScroll
          handleGenre={handleGenre}
          setSelectedGenre={setSelectedGenre}
        />

        {/******** BANDS  *********/}

        <div>
          <p className={`${styles.text} text-[#0A2259] pb-[1rem]`}>
            Highlighted Live Bands Near Sacramento, CA
          </p>

          <div className={`${styles.bandDetailsContainer} w-full`}>
            {bands.length === 0 ? (
              <p className="text-center col-span-full">No bands found</p>
            ) : isLoading ? (
              <div className="col-span-full">
                <Loader />
              </div>
            ) : (
              bands.map((band) => (
                <div key={band.id} className={`${styles.bandDetail}`}>
                  <a href="#" rel="noopener noreferrer">
                    <img
                      src={`${Url}/${band.image1}`}
                      alt={`${band.name} image 1`}
                      className={`${Url}/ ${styles.image}`}
                    />
                    {console.log(Url, band.image1)}
                  </a>

                  <span>{band.genre_type}</span>
                  <h1 className={`${styles.bandName}`}>
                    {String(band.name).charAt(0).toUpperCase() +
                      String(band.name.slice(1))}
                  </h1>

                  <div className={`${styles.socials}`}>
                    {band.facebook_url === "" ? (
                      ""
                    ) : (
                      <a
                        href={band.facebook_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={facebook} alt="Facebook" key={1} />
                      </a>
                    )}
                    {band.instagram_url === "" ? (
                      ""
                    ) : (
                      <a
                        href={band.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={instagram} alt="Instagram" key={2} />
                      </a>
                    )}
                    {band.youtube_url === "" ? (
                      ""
                    ) : (
                      <a
                        href={band.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={website} alt="YouTube" key={3} />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={`flex flex-col items-center`}>
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

        <TipJar />
      </div>
    </section>
  );
};

export default Bands;
