import React, { useState } from "react";
import { footerLinks } from "../../data/data";
import styles from "./Footer.module.css";
import { logo, plus } from "../../assets";
import Button from "./Button";
import "../../App.css";
import FooterLink from "./FooterLink";
import Facebook from "../SVGcomponent/Facebook";
import Instagram from "../SVGcomponent/Instagram";

const Footer = () => {
  const [toggle, setToggle] = useState(false);
  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };
  const [curr, setIsOpen] = useState(null);
  return (
    <footer className={`section pt-[1rem] ${styles.footerSection}`}>
      <div className={`${styles.footerContainer} sectionContainer`}>
        {/*******************   **************************/}

        {/*******************   **************************/}
        <div className={styles.footerLogo}>
          <img src={logo} className={`${styles.image}`} />
          <h1>
            Find Me <span className={`text-[#C32FB4]`}>Live Music</span>
          </h1>
        </div>
        {/*******************   **************************/}

        {/*******************   **************************/}
        <ul className={`${styles.footerMenu}`}>
          {/*******************   **************************/}
          {footerLinks.map((footerLink, i) => (
            <FooterLink
              key={footerLink.title}
              footerLink={footerLink}
              num={i}
              curr={curr}
              plus={plus}
              onOpen={setIsOpen}
              onToggle={toggleHandler}
              toggle={toggle}
            />
          ))}
        </ul>

        <ul className={styles.socialMenu}>
          <li>
            <a href="http://facebook.com/findmelivemusic" target="_blank">
              <Facebook />
            </a>
          </li>

          <li>
            <a>
              <Instagram />
            </a>
          </li>
        </ul>

        <div></div>
      </div>
    </footer>
  );
};

export default Footer;
