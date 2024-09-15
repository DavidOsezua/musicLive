// import React from "react"
import { useEffect, useState } from "react";

import styles from "./Table.module.css";

const Table = ({ tableHead, tableBody, currentPage, itemsPerPage }) => {
  // Calculate the correct row number based on the current page and page size
  const rowNumber = (currentPage - 1) * itemsPerPage;
  return (
    <div className="table-responsive ">
      <table className={`${styles.tableStyle}`}>
        <thead>
          <tr>
            {tableHead.map((th, index) => (
              <th className={`${styles.thStyle}`} key={index}>
                {th}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableBody.map((item, index) => (
            <tr key={item.id} className={"bg-[#ffffff] "}>
              <td className={`${styles.tdStyle}`}> {rowNumber + index + 1}</td>

              <td className={`${styles.tdStyle}`}></td>

              <td className={`${styles.tdStyle} `}>{item.pay_amount}</td>

              <td className={`${styles.tdStyle}`}></td>

              <td className={`${styles.tdStyle} text-[#FF6665]`}></td>
              <td className={`${styles.tdStyle} text-[#FF6665]`}>
                {item.status}
              </td>
              <td className={`${styles.tdStyle} text-[#FF6665]`}>
                {item.action}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
