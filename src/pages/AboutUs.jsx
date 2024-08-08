import React from "react";
import "../App.css";
import styles from "./AboutUs.module.css";
import { TipJar } from "../components";
import AboutComponent from "../components/Aboutpage.jsx/AboutComponent";
import { happyPeople, mission } from "../assets";
import { about } from "../data/data";

const AboutUs = () => {
  return (
    <section className={`section`}>
      <div className={`sectionContainer ${styles.aboutContainer}`}>
        {" "}
        <AboutComponent
          Image={happyPeople}
          title={`Our Vision`}
          title2={`Music Makes People Happy`}
          content={`Our vision is to create a vibrant online platform where music enthusiasts can easily discover and connect with live band venues across the country for free. By providing users with up-to-date information on local gigs and performances, we aim to support live music communities and bring people closer to the music they love.`}
          switched
        />
        {/*  */}
        <section className={`section px-0`}>
          <AboutComponent
            Image={mission}
            title={`Our Mission`}
            content={`We envision a world where live music is accessible to everyone, regardless of location or budget. Our website will empower users to explore and experience live band performances by offering a user-friendly, interactive map that showcases nearby venues and events at no cost.`}
          />
        </section>
        {/*  */}
        <div className={`section px-0`}>
          {about.map((item) => (
            <div key={item.title}>
              <h1>
                <span>{item.title}</span>
              </h1>
              <img src={item.image} className={`${styles.image}}`} />
              <p>{item.content}</p>
            </div>
          ))}
        </div>
        <TipJar />
        <div></div>
      </div>
    </section>
  );
};

export default AboutUs;
