import React from "react";
import { TipJar } from "../components";
import PageHeader from "../components/general/PageHeader";
import Search from "../components/general/Search";
import { bands, genre } from "../data/data";
import Button from "../components/general/Button";
import Genre from "../components/general/Genre";
import styles from "./Bands.module.css";
import GenreScroll from "../components/general/GenreScroll";

const Bands = () => {
  return (
    <section className={`section py-0 px-0`}>
      <div>
        <PageHeader page={`Bands`} />

        <div className="mt-[-1rem] px-[1rem]">
          <Search />
        </div>
      </div>
      <div className={`sectionContainer ${styles.bandContainer}`}>
        {/******** GRENE  *********/}
        <GenreScroll />

        {/******** BANDS  *********/}

        <div>
          <p className={`${styles.text}`}>
            Highlighted Live Bands Near Sacramento, CA
          </p>

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
