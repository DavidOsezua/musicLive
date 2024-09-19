import React, { useState, createContext, useContext, useEffect } from "react";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import styles from "./AdminDashboardLayout.module.css";
import { Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  const [toggle, setToggle] = useState(false);
  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className={`transistion ${styles.dashboard}`}>
      <DashboardSidebar toggle={toggle} toggleHandler={toggleHandler} />
      <DashboardNavbar toggleHandler={toggleHandler} />
      <main className="overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;