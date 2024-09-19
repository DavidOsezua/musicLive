// /* eslint-disable react/prop-types */
import React from "react";
// import { useEffect, useState } from "react";

// import styles from "./Table.module.css";

// const Table = ({ tableHead, tableBody, currentPage, itemsPerPage }) => {
//   // Calculate the correct row number based on the current page and page size
//   const rowNumber = (currentPage - 1) * itemsPerPage;
//   return (
//     <div className="table-responsive ">
//       <table className={`${styles.tableStyle}`}>
//         <thead>
//           <tr>
//             {tableHead.map((th, index) => (
//               <th className={`${styles.thStyle}`} key={index}>
//                 {th}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {tableBody.map((item, index) => (
//             <tr key={item.id} className={"bg-[#ffffff] "}>
//               <td className={`${styles.tdStyle}`}> {rowNumber + index + 1}</td>

//               <td className={`${styles.tdStyle}`}>
//                 <div className="flex gap-3 items-center">
//                   <img src={item.image} className={`w-[40px] rounded-md`} />
//                   <div>
//                     <h2>{item.bandName}</h2>
//                     <span>{item.genre}</span>
//                   </div>
//                 </div>
//               </td>

//               <td className={`${styles.tdStyle} `}>{item.pay_amount}</td>

//               <td className={`${styles.tdStyle}`}></td>

//               <td className={`${styles.tdStyle} text-[#FF6665]`}></td>
//               <td className={`${styles.tdStyle} text-[#FF6665]`}>
//                 {item.status}
//               </td>
//               <td className={`${styles.tdStyle} text-[#FF6665]`}>
//                 {item.action}
//               </td>
//               <td className={`${styles.tdStyle} text-[#FF6665]`}>
//                 {item.action}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

/* eslint-disable react/prop-types */

import styles from "./Table.module.css";
import BandTableData from "./BandTableData";
import LocationTableData from "./LocationTableData";

const Table = ({
  tableHead,
  tableBody,
  currentPage,
  itemsPerPage,
  columnCount,
  handleDelete,
}) => {
  // Calculate the correct row number based on the current page and page size
  const rowNumber = (currentPage - 1) * itemsPerPage;

  return (
    <div className="table-responsive">
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
            <tr key={item.id} className={"bg-[#ffffff]"}>
              {columnCount === 7 ? (
                <BandTableData
                  item={item}
                  rowNumber={rowNumber}
                  index={index}
                  handleDelete={handleDelete}
                />
              ) : (
                <LocationTableData
                  item={item}
                  rowNumber={rowNumber}
                  index={index}
                  handleDelete={handleDelete}
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
