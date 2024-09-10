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
  disableFn,
  style,
}) => {
  return (
    <button
      className={` flex gap-2 justify-center ${
        colored ? styles.colored : styles.transparent
      } ${width} ${radius} ${style}`}
      onClick={clickFunction}
      type={type}
      disabled={disableFn}
    >
      {svg2}
      {text}
      {svg}
    </button>
  );
};

export default Button;
