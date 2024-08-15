import React from "react";
import styles from "./Button.module.css";

const Button = ({
  text,
  colored,
  width,
  radius,
  clickFunction,
  type,
  svg,
  svg2,
}) => {
  return (
    <button
      className={` flex gap-2 justify-center ${
        colored ? styles.colored : styles.transparent
      } ${width} ${radius}`}
      onClick={clickFunction}
      type={type}
    >
      {svg2}
      {text}
      {svg}
    </button>
  );
};

export default Button;
