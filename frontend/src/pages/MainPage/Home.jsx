import React, { useEffect, useState } from "react";
import "../../App.css";
import styles from "./Home.module.css";
import LocationAndDates from "../../components/Homepage/LocationAndDates";
import Share from "../../components/SVGcomponent/Share";
import { mobileHeroImage } from "../../assets";
import { TipJar } from "../../components";
import Button from "../../components/general/Button";
import Hero from "../../components/Homepage/Hero";
import SelectGenre from "../../components/SVGcomponent/SelectGenre";
import GenreScroll from "../../components/general/GenreScroll";
import Advert from "@/components/general/Advert";
import { createSubcriber } from "./router";
import { api } from "@/services/api.route";

const Home = () => {
  const [data, setData] = useState({ email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setData({ ...data, email: e.target.value });
  };

  const subcribeHandler = async (e) => {
    e.preventDefault();

    if (!data.email) {
      setMessage("Email is required");
      return;
    }

    const formdata = {
      email: data.email,
    };

    try {
      setIsSubmitting(true);
      await createSubcriber(formdata);
      setMessage("Subscription successful! Thank you.");
      setData({ email: "" }); // Clear the input field
    } catch (error) {
      setMessage(error || "Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("Data being sent:", data);

  console.log(message);

  return (
    <section className={`section pt-0 ${styles.homeSection} transition`}>
      <div className={`${styles.ellipse1}`}></div>
      <div className={`${styles.ellipse2}`}></div>
      <div className={`${styles.ellipse3}`}></div>
      {/**************************** mobile  ****************************/}
      <div className={`sectionContainer ${styles.homeContainerMobile}`}>
        <div className={`${styles.textContent}`}>
          <h1>
            Find Me <span>Live Music</span>
          </h1>
          <p className={`${styles.textContentText}`}>
            HELPING UNITE BANDS AND FANS
          </p>
        </div>

        <LocationAndDates />

        {/******************* GENERE *******************/}

        <div className={`${styles.genreContainer}`}>
          {/******************* GENERE BUTTON *******************/}
          <div className="flex justify-center">
            <button className={`${styles.genrebtn}`}>
              <SelectGenre />
              Select Genre
            </button>
          </div>
          {/******************* GENERE ICONS *******************/}
          <GenreScroll />
        </div>

        <div>
          <Advert />
        </div>

        {/* <div className={`${styles.placeOrder}`}></div> */}

        <div className={`${styles.findContainer}`}>
          <p className={`${styles.findText}`}>Find your best live music.</p>
          <button className={`${styles.findButton}`}>
            <Share />
            Share to family & friends
          </button>
        </div>

        <div className="flex justify-center">
          <img src={mobileHeroImage} />
        </div>

        {/* <img src={mobileHeroImage} className="flex justify-center" /> */}

        <TipJar />

        <div className={`${styles.subscribeContainer}`}>
          <div className={`${styles.subscribeInput}`}>
            <input
              placeholder="Enter Email here"
              value={data.email}
              onChange={handleInputChange}
              className={`bg-transparent w-full py-2 px-3 outline-none`}
            />
            <Button
              width={`w-[101px]`}
              colored
              clickFunction={subcribeHandler}
              type={`submit`}
              text={isSubmitting ? "Submitting..." : "Subscribe"}
              radius={`rounded-md`}
            />
          </div>
        </div>
      </div>

      {/**************************** Desktop  ****************************/}
      <div className={`sectionContainer ${styles.homeContainerDesktop}`}>
        <Hero />

        <LocationAndDates />

        {/******************* GENERE *******************/}

        <div className={`${styles.genreContainer}`}>
          {/******************* GENERE BUTTON *******************/}
          <div className="">
            <button className={`${styles.genrebtn}`}>
              <SelectGenre />
              Select Genre
            </button>
          </div>
          {/******************* GENERE ICONS *******************/}

          <GenreScroll />
        </div>

        <div>
          <Advert />
        </div>

        {/* <div className={`${styles.placeOrder}`}></div> */}

        {/*  */}
        <div className={`${styles.desktopFindContainer}`}>
          <p className={`${styles.findText}`}>Find your best live music.</p>

          <div className={`${styles.buttonAndSubscribe}`}>
            <button className={`${styles.findButton}`}>
              <Share />
              Share to family & friends
            </button>

            <div className={`${styles.subscribeContainer}`}>
              <div className={`${styles.subscribeInput}`}>
                <input
                  placeholder="Enter Email here"
                  value={data.email}
                  onChange={handleInputChange}
                  className={`bg-transparent w-full py-2 px-3 outline-none`}
                />
                <Button
                  width={`w-[101px]`}
                  colored
                  clickFunction={subcribeHandler}
                  text={isSubmitting ? "Submitting..." : "Subscribe"}
                  type={`submit`}
                  radius={`rounded-md`}
                />
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <TipJar />
      </div>
    </section>
  );
};

export default Home;
