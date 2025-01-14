import React from "react";
import styles from "./Footer.module.css";
import "../../App.css";
import { NavLink } from "react-router-dom";

const FooterLink = ({
  footerLink,
  num,
  curr,
  plus,
  onOpen,
  onToggle,
  toggle,
}) => {
  const isOpen = num === curr;
  const openHandler = () => {
    onOpen(isOpen ? null : num);
  };
  return (
    <div onClick={openHandler}>
      <div className={styles.titleContent}>
        <h4 className={`${styles.footerTitle}`}>{footerLink.title}</h4>
        <img src={plus} className={styles.plus} />
      </div>

      {/*******************   **************************/}
      <ul className={`${styles.footerSubMenu} ${isOpen && styles.showMenu}`}>
        {footerLink.links.map((link) => (
          <li key={link.name} className={`${styles.footerLink}`}>
            {link.link ? (
              <a href={link.link} className={`${styles.link}`}>
                {link.name}
              </a>
            ) : (
              <NavLink to={link.path} className={`${styles.link}`}>
                {link.name}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLink;
