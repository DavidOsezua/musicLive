import React, { useState } from "react";
import { TipJar } from "../../components";
import Search from "../../components/general/Search";
import styles from "./Venues.module.css";
import { venues } from "../../data/data";
import Button from "../../components/general/Button";
import { desktopMap } from "../../assets";
import Map from "../../components/VenueBrand/Map";
import Dropdown from "../../components/general/Dropdown";
import { facebook,instagram,website } from "../../assets";
import {Url} from "../../service/api.route"

const Venues = () => {
  const [dropdown, setDropDown] = useState(false);
  const [tokenState, setTokenState] = useState("USDT");

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
            {venues.map((band) => (
              <div key={band.id} className={`${styles.bandDetail}`}>
                <a href={`${band.homepage}`} target="_blank" rel="noopener noreferrer">
                <img
                  src={`${Url}/${band.image1}`}
                  alt={`${band.name} image 1`}
                  className={`${Url}/${styles.image}`}
                />
                 </a>

                <span>{band.venue_type}</span>
                <h1 className={`${styles.bandName}`}>{String(band.name).charAt(0).toUpperCase() + String(band.name.slice(1))}</h1>

                <div className={`${styles.socials}`}>
                  <a href={band.facebook_url} target="_blank" rel="noopener noreferrer">
                    <img src={facebook} alt="Facebook" key={1} />
                  </a>
                  <a href={band.instagram_url} target="_blank" rel="noopener noreferrer">
                    <img src={instagram} alt="Instagram" key={2} />
                  </a>
                  <a href={band.youtube_url} target="_blank" rel="noopener noreferrer">
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
