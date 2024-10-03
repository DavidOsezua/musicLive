import React from "react";
import styles from "./CsvRecent.module.css";

const CsvRecent = ({ title, numberOfRequests, buttonText }) => {
  const handleExport = () => {
    const csvContent = "Title,Number of Requests\n" + `${title},${numberOfRequests}\n`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;

    link.setAttribute("download", "exported_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`${styles.card}`}>
      <h3>{title}</h3>
      <p className="text-[#437CF3]">{numberOfRequests}</p>
      <button className={`${styles.button}`} onClick={handleExport}>
        {buttonText}
      </button>
    </div>
  );
};

export default CsvRecent;
