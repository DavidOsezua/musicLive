import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, colored, width,radius }) => {
  return (
    <button
      className={`${colored ? styles.colored : styles.transparent} ${width} ${radius}`}
    >
      {text}
    </button>
  );
};

export default Button;
