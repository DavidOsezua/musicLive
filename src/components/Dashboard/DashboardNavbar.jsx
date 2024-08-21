import React from "react";
import styles from "./DashboardNavbar.module.css";
import { hamburgermenu } from "../../assets";

const DashboardNavbar = ({toggleHandler}) => {
  return (
    <header className={`${styles.dashboardHeader}`}>
      <nav className={styles.dashboardNav}>
      <button onClick={toggleHandler} >
         <img src={hamburgermenu} className={styles.ham}  />
      </button>
       
        <div>Navbar</div>
      </nav>
    </header>
  );
};

export default DashboardNavbar;
