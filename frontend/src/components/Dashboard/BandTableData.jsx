/* eslint-disable react/prop-types */
import React from "react";
import styles from "./Table.module.css";
import Settings from "../SVGcomponent/Settings";
import Delete from "../SVGcomponent/Delete";
import Preview from "../SVGcomponent/Preview";

const BandTableData = ({ item, rowNumber, index, handleDelete }) => {
  return (
    <>
      <td className={`${styles.tdStyle}`}>{rowNumber + index + 1}</td>

      <td className={`${styles.tdStyle}`}>
        <div className="flex gap-3 items-center">
          <img src={item.image} className={`w-[40px] rounded-md`} />
          <div>
            <h2>{item.venueOrBandName}</h2>
            <span>{item.genreOrType}</span>
          </div>
        </div>
      </td>

      <td className={`${styles.tdStyle}`}>
        <div className="flex gap-3 items-center">
          {item.socials.map((social, i) => (
            <img key={i} src={social} />
          ))}
        </div>
      </td>

      <td className={`${styles.tdStyle}`}>
        <p>{item.email}</p>
      </td>
      <td className={`${styles.tdStyle}`}>
        <p>{item.date}</p>
      </td>

      <td className={`${styles.tdStyle} text-[#FF6665]`}>{item.status}</td>

      <td className={`${styles.tdStyle} text-[#FF6665]`}>
        <div className="flex items-center gap-3">
          <button>
            <Settings />
          </button>
          <button onClick={() => handleDelete(item.ID)}>
            <Delete />
          </button>
          <button>
            <Preview />
          </button>
        </div>
      </td>
    </>
  );
};

export default BandTableData;
