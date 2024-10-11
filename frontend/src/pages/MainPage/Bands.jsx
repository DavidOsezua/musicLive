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

const Bands = () => {
  const [dropdown, setDropDown] = useState(false);
  const [form, setForm] = useState({
    venue_type: "",
  });
  const [bands, setBands] = useState([]);
  const [isInputempty, setisInputempty] = useState(false);
  const [searchData, setSearchData] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSearchData((prevFormData) => ({
      ...prevFormData,
      name: value,
    }));
    if (value === "") {
      console.log("Input is empty");
      setisInputempty(true);
      return;
    } else {
      setisInputempty(false);
    }
  };

  const handleGenre = (selectedGenres) => {
    setForm((prevData) => ({
      ...prevData,
      venue_type: selectedGenres[0].genreOrType,
    }));
    closeDropdown();
  };

  useEffect(() => {
    console.log("The search data is:", searchData);
    console.log("The form state has been updated:", form);

    const getAllUserBandsWithAdminApproved = async () => {
      try {
        const response = await api.get("/api/v1/band/search", {
          params: {
            name: searchData.name || "",
            genre_type: form.venue_type || "",
          },
        });
        console.log(response.data);
        setBands(response.data);
      } catch (error) {
        console.error("Error occurred when getting the user band:", error);
        console.error(error || "An unexpected error occurred");
        setBands([]);
      }
    };

    getAllUserBandsWithAdminApproved();
  }, [searchData, form]);

  useEffect(() => {
    const getAlluserBand = async () => {
      try {
        const response = await api.get("/api/v1/band/approved");
        console.log(response.data);
        setBands(response.data);
      } catch (error) {
        console.error("Error occur when getting the user band:", error);
        console.error(error || "An unexpected error occurred");
      }
    };
    getAlluserBand();
  }, [isInputempty]);

  const showDropdown = () => {
    setDropDown((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropDown(false);
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
                setGenre={handleGenre}
                closeDropdown={closeDropdown}
              />
            </div>
          )}
        </div>
      </div>
      <div className={`sectionContainer ${styles.bandContainer}`}>
        {/******** GRENE  *********/}
        <GenreScroll />

        {/******** BANDS  *********/}

        <div>
          <p className={`${styles.text} text-[#0A2259] pb-[1rem]`}>
            Highlighted Live Bands Near Sacramento, CA
          </p>

          <div className={`${styles.bandDetailsContainer}`}>
            {bands.length === 0 ? (
              <p>No bands found</p>
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
