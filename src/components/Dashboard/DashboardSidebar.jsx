import React from "react";
import LogoComponent from "../general/LogoComponent";
import styles from "./DashboardSidebar.module.css";
import { sideBarLinks } from "../../data/data";
import { NavLink } from "react-router-dom";

const DashboardSidebar = ({ toggle, toggleHandler }) => {
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
            <li
              key={sidebarLink.link}
              className={styles.navItems}
              onClick={toggleHandler}
            >
              <NavLink to={sidebarLink.path} className={styles.link}>
                <a className={`${styles.navLink}`}>{sidebarLink.link}</a>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
