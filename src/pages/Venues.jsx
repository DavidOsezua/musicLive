import React from "react";
import { TipJar } from "../components";
import Search from "../components/general/Search";
import styles from "./Venues.module.css";
import { bands } from "../data/data";
import Button from "../components/general/Button";

const Venues = () => {
  return (
    <section className={`section ${styles.venueSection} transition`}>
      <div className={`px-[1rem] `}>
        <Search />
      </div>

      <div>GENRE</div>

      <div className={`${styles.map}`}>MAP</div>

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

      <div className={`flex flex-col items-center`}>
        <p className={`text-[#0A2259] pb-4`}>Continue exploring Live Bands!!</p>
        <Button
          text={`Show more`}
          width={`w-[236px]`}
          colored
          radius={`rounded-full`}
        />
      </div>

      <TipJar />
    </section>
  );
};

export default Venues;
