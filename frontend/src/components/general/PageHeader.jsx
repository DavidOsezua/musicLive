import React from "react";
import styles from "./PageHeader.module.css";

const PageHeader = ({ page }) => {
  return <div className={styles.pageHeader}>{page}</div>;
};

export default PageHeader;
