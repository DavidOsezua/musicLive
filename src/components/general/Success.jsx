import React from "react";
import Check from "../SVGcomponent/Check";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import styles from "./Success.module.css";
import { useModal } from "../../Layout/AdminDashboardLayout";
import { TiTimes } from "react-icons/ti";
import Close from "./Close";

const Success = () => {
  const { modalHandler } = useModal();
  return (
    <div className={`${styles.successCard} relative`}>
      <button className={`absolute top-[20px] right-[20px]`} onClick={modalHandler}>
        <Close />
      </button>
      <Check />
      <p>Band created successfully</p>
      <p className="text-[0.8rem]">
        Band under review, you will be <br /> notify via email once it approved
      </p>

      <Button
        colored
        text={`Close`}
        width={`w-[165px]`}
        radius={`rounded-md`}
        clickFunction={modalHandler}
      />
      <NavLink to="/">
        <Button text={`Home`} width={`w-[165px]`} radius={`rounded-md`} />
      </NavLink>
    </div>
  );
};

export default Success;
