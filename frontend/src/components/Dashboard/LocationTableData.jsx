/* eslint-disable react/prop-types */
import React from "react";
import styles from "./Table.module.css";
import Delete from "../SVGcomponent/Delete";
import Settings from "../SVGcomponent/Settings";
import Preview from "../SVGcomponent/Preview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LocationTableData = ({
  item,
  rowNumber,
  index,
  handleDelete,
  handleSelectChange,
  getBackgroundColor,
  status,
}) => {
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
        <p>{item.address}</p>
      </td>
      <td className={`${styles.tdStyle}`}>
        <p>{item.email}</p>
      </td>
      <td className={`${styles.tdStyle}`}>
        <p>{item.date}</p>
      </td>
      <td className={`${styles.tdStyle}`}>
        <p>{item.time}</p>
      </td>

      <td className={`${styles.tdStyle} text-[#FF6665]`}>
        <Select onValueChange={handleSelectChange} className="">
          <SelectTrigger className={`${getBackgroundColor()} p-2 rounded-md`}>
            <SelectValue placeholder={status} />
          </SelectTrigger>
          <SelectContent className="bg-[#E6ECF8]">
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </td>

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

export default LocationTableData;
