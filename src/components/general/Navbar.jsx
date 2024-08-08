import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import "../../App.css";
import { close, hamburgermenu, logo } from "../../assets";
import { navLinks } from "../../data/data";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/*************  NavLogo ******************/}
        <div className={styles.navLogo}>
          <NavLink to="/">
            <img src={logo} className="w-[40px]" />
          </NavLink>
          <h1 className={`text-[#000000]`}>
            Find Me <span className={`text-[#C32FB4]`}>Live Music</span>
          </h1>
        </div>

        {/******************  Menu Items *********************/}
        <ul className={`${styles.navMenu} ${toggle && styles.showMenu} `}>
          {/********************* Menu close button *******************/}
          <img
            src={close}
            onClick={toggleHandler}
            className={styles.closeToggle}
          />

          {/********************* Menu Lists *******************/}

          {navLinks.map((navLink) => (
            <li
              className={styles.navItems}
              key={navLink.link}
              onClick={toggleHandler}
            >
              <NavLink to={navLink.path} className={`${styles.link}`}>
                {navLink.link}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={`${styles.toggle}`} onClick={toggleHandler}>
          <img src={hamburgermenu} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
