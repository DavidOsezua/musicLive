import React from "react";
import { TipJar } from "../components";
import Search from "../components/general/Search";
import styles from "./Venues.module.css";
import { bands } from "../data/data";
import Button from "../components/general/Button";
import { desktopMap } from "../assets";
import Map from "../components/VenueBrand/Map";

const Venues = () => {
  return (
    <>
      <section className={`${styles.venueSection} transition`}>
        <div className={`${styles.search} pl-[1rem]`}>
          <Search />
          <p>GENRE</p>
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
