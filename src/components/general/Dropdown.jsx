import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import { token } from "../Data/data";
import Token from "./Token";
import { genre } from "../../data/data";

const Dropdown = ({
  tokenStateHandler,
  closeDropdown,
  setToken,
  isUpdatingRef,
}) => {
  return (
    <div className={`${styles.card}`}>
      {genre.map((token, i) => (
        <DropdownItem
          key={i}
          img={token.image}
          token={token.token}
          value={token.value}
          network={token.network}
          closeDropdown={closeDropdown}
          tokenStateHandler={tokenStateHandler}
          setToken={setToken}
          isUpdatingRef={isUpdatingRef}
        />
      ))}
    </div>
  );
};

export default Dropdown;
