import React, { useState } from "react";
import LogoComponent from "../general/LogoComponent";
import styles from "./DashboardSidebar.module.css";
import { sideBarLinks } from "../../data/data";
import { NavLink } from "react-router-dom";
import ArrowDown from "../SVGcomponent/ArrowDown";

const DashboardSidebar = ({ toggle, toggleHandler }) => {
  const [dropdown, setDropDown] = useState(false);
  const [tokenState, setTokenState] = useState("USDT");

  const showDropdown = (e) => {
    e.preventDefault();
    setDropDown((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropDown(false);
  };

  return (
    <aside className={`${styles.sideBar} ${toggle && styles.showMenu}`}>
      <nav className={styles.sidebarNav}>
        <NavLink to="/">
          <div className="flex items-center gap-2">
            <LogoComponent />
          </div>
        </NavLink>

        <ul className={`${styles.navMenu}`}>
          {sideBarLinks.map((sidebarLink) => (
            <li key={sidebarLink.link} className={styles.navItems}>
              {/* If the link has a dropdown, handle the dropdown logic */}
              {sidebarLink.dropdownLink ? (
                <>
                  <a
                    href="#"
                    className={`${styles.link} flex gap-4 items-center`}
                    onClick={showDropdown}
                  >
                    {sidebarLink.icon}
                    {sidebarLink.link}
                    <ArrowDown />
                  </a>
                  {dropdown && (
                    <ul className={styles.dropdownMenu}>
                      {sidebarLink.dropdownLink.map((dropLink) => (
                        <li
                          key={dropLink.link}
                          className={`${styles.navItems} pl-[1.5rem] pt-3`}
                        >
                          <NavLink
                            to={dropLink.path}
                            className={styles.link}
                            onClick={toggleHandler}
                          >
                            {dropLink.link}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={sidebarLink.path}
                  className={styles.link}
                  onClick={toggleHandler}
                >
                  {sidebarLink.icon}
                  {sidebarLink.link}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
