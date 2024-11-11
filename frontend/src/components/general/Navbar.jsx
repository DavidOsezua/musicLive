import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import "../../App.css";
import { close, hamburgermenu, logo } from "../../assets";
import { navLinks } from "../../data/data";
import LogoComponent from "./LogoComponent";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };
  return (
    <header className={styles.navbar}>
      <nav className={styles.navContainer}>
        {/*************  NavLogo ******************/}
        <NavLink to="/">
          <div className={styles.navLogo}>
            <LogoComponent />
          </div>
        </NavLink>

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
      </nav>
    </header>
  );
};

export default Navbar;
