import React from "react";
import "../App.css";
import styles from "./AboutUs.module.css";
import { TipJar } from "../components";
import AboutComponent from "../components/Aboutpage.jsx/AboutComponent";
import { happyPeople, mission } from "../assets";

const AboutUs = () => {
  return (
    <section className={`section`}>
      <div className={`sectionContainer`}>
        {" "}
        <AboutComponent
          Image={happyPeople}
          title={
            <h2 className="text-[1.7rem]">
              {" "}
              <span className="italic">Brief History of the</span>{" "}
              <span className="font-bold text-[#754FE2]">Department</span>
            </h2>
          }
          content={`The Industrial Design Programme is concerned with the development of creative strategies in the provision of technological solutions to problems that are related to the specific needs of industry and the society in general. The programme places emphasis on the development of high professional skills as well as exploration and development of indigenous materials in the areas of Ceramics, Graphics and Textiles Design. It also focuses on producing graduates of high quality with creative skill and entrepreneurial knowledge that can make them self reliant as well as employable by the Printing, Textiles and Ceramics industries.`}
          switched
        />
        <AboutComponent
          Image={mission}
          title={
            <h2 className="text-[1.7rem]">
              {" "}
              <span className="italic">Academic </span>{" "}
              <span className="font-bold text-[#fff]">Programs</span>
            </h2>
          }
          content={`The Industrial Design Programme is concerned with the development of creative strategies in the provision of technological solutions to problems that are related to the specific needs of industry and the society in general. The programme places emphasis on the development of high professional skills as well as exploration and development of indigenous materials in the areas of Ceramics, Graphics and Textiles Design. It also focuses on producing graduates of high quality with creative skill and entrepreneurial knowledge that can make them self reliant as well as employable by the Printing, Textiles and Ceramics industries.`}
          invert
        />
        <TipJar />


        <div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
