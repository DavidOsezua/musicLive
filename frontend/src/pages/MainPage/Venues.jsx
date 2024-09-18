import { useEffect, useState } from "react";
import { TipJar } from "../../components";
import Search from "../../components/general/Search";
import styles from "./Venues.module.css";
import Button from "../../components/general/Button";
// import { desktopMap } from "../../assets";
import Map from "../../components/VenueBrand/Map";
import Dropdown from "../../components/general/Dropdown";
import { facebook,instagram,website } from "../../assets";
import {Url,api} from "../../services/api.route"

const Venues = () => {
  const [dropdown, setDropDown] = useState(false);
  const [tokenState, setTokenState] = useState("USDT");
  const [venues, setVenues] = useState([])

  useEffect(()=>{
    const getAlluserVenue = async ()=>{
      try{
        const response = await api.get("/api/v1/venue/approved")
        console.log(response.data)
        setVenues(response.data)
       
      }catch (error) {
        console.error("Error occur when getting the user venue:", error);
        // toast.error(error|| "An unexpected error occurred");
      }
    }
    getAlluserVenue()
  }, [])

  const showDropdown = () => {
    setDropDown((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropDown(false);
  };

  const tokenStateHandler = (currentToken) => {
    setTokenState(currentToken);
  };
  return (
    <>
      <section className={`${styles.venueSection} transition`}>
        <div className={`${styles.search} px-[1rem] `}>
          <Search showDropdown={showDropdown} />
          {dropdown && (
            <Dropdown
              tokenStateHandler={tokenStateHandler}
              closeDropdown={closeDropdown}
            />
          )}
        </div>

        <div className={`${styles.map} px-0 `}>
          <Map />
        </div>

        {/******** BANDS DETAILS  *********/}
        {/* <div className={`${styles.bandDetailsContainer}`}>
          {bands.map((band) => (
            <div key={``} className={`${styles.bandDetail}`}>
              <img src={band.image} className={`${styles.image}`} />

              <span>{band.genre}</span>
              <h1 className={`${styles.bandName}`}>{band.bandName}</h1>
              <div className={`${styles.socials}`}>
                {band.socials.map((social, i) => (
                  <img src={social} key={i} />
                ))}
              </div>
            </div>
          ))}
        </div> */}
            <div className={`${styles.bandDetailsContainer}`}>
            {venues.map((venue) => (
              <div key={venue.id} className={`${styles.bandDetail}`}>
                <a href={`${venue.homepage}`} target="_blank" rel="noopener noreferrer">
                <img
                  src={`${Url}/${venue.image1}`}
                  alt={`${venue.name} image 1`}
                  className={`${Url}/${styles.image}`}
                />
                 </a>

                <span>{venue.venue_type}</span>
                <h1 className={`${styles.bandName}`}>{String(venue.name).charAt(0).toUpperCase() + String(venue.name.slice(1))}</h1>

                <div className={`${styles.socials}`}>
                  <a href={venue.facebook_url} target="_blank" rel="noopener noreferrer">
                    <img src={facebook} alt="Facebook" key={1} />
                  </a>
                  <a href={venue.instagram_url} target="_blank" rel="noopener noreferrer">
                    <img src={instagram} alt="Instagram" key={2} />
                  </a>
                  <a href={venue.youtube_url} target="_blank" rel="noopener noreferrer">
                    <img src={website} alt="YouTube" key={3}/>
                  </a>
                </div>
              </div>
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
