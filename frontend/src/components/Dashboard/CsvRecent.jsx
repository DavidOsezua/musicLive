import React, { useEffect, useState } from "react";
import styles from "./CsvRecent.module.css";
import { api } from "@/services/api.route";

const CsvRecent = ({ title, numberOfRequests, buttonText }) => {
  const [data, setData] = useState([]);
  const [errorMessage, seterrorMessage] = useState()
  useEffect(() => {
    const fetchData = async () => {
      let endpoint = ""
      if (title.trim() === "Venue") {
        endpoint = "api/v1/venue";
      } else if (title.trim() === "Bands") {
        endpoint = "api/v1/band";
      }
      try {
        const response = await api.get(endpoint);
        if (!response.data) {
          throw new Error("no data found for this endpoint");
        }
        const jsonData = await response.data;
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        seterrorMessage(error.response.data)
      }
    };

    fetchData();
  }, []);


  const handleExport = () => {
    const csvRows = [];
    const headers = Object.keys(data[0] || {}).join(",");
    csvRows.push(headers);
    data.forEach(item => {
      const values = Object.values(item).join(",");
      csvRows.push(values);
    });
    console.log(csvRows)

    // Create a Blob from the CSV string
    const csvContent = csvRows.join("\n");
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
