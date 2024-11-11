import React from "react";
import { logo } from "../../assets";
import styles from "./Navbar.module.css";

const LogoComponent = () => {
  return (
    <>
      <img src={logo} className="w-[40px]" />

      <h1 className={`text-[#000000]`}>
        Find Me <span className={`text-[#C32FB4]`}>Live Music</span>
      </h1>
    </>
  );
};

export default LogoComponent;
