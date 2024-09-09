// import React, { useState } from "react";
import { TipJar } from "../../components";
import Search from "../../components/general/Search";
import styles from "./Venues.module.css";
import { bands } from "../../data/data";
import Button from "../../components/general/Button";
import { desktopMap } from "../../assets";
import Map from "../../components/VenueBrand/Map";
import Dropdown from "../../components/general/Dropdown";

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
        <div className={`${styles.bandDetailsContainer}`}>
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
