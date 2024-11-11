import React from "react";
import styles from "./DashboardNavbar.module.css";
import { hamburgermenu } from "../../assets";
import Notification from "../SVGcomponent/Notification";
import Profile from "../SVGcomponent/Profile";

const DashboardNavbar = ({ toggleHandler }) => {
  return (
    <header className={`${styles.dashboardHeader}`}>
      <nav className={styles.dashboardNav}>
        <button onClick={toggleHandler}>
          <img src={hamburgermenu} className={styles.ham} />
        </button>

        <div className="flex items-center gap-2">
          <button>
            <Notification />
          </button>

          <button>
            <Profile />
          </button>

          <p>Admin</p>
        </div>
      </nav>
    </header>
  );
};

export default DashboardNavbar;
