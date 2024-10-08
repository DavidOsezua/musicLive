// /* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
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
import { api } from "../../services/api.route";
import { control } from "leaflet";

const Table = ({
  tableHead,
  tableBody,
  setData,
  setTotalData,
  setUserData,
  data,
  currentPage,
  itemsPerPage,
  columnCount,
  handleDelete,
  setFilteredData,
  setTotalApprove,
  // setpending
}) => {
  const rowNumber = (currentPage - 1) * itemsPerPage;
  const [statuses, setStatuses] = useState({});
  const [itemID, setItemId] = useState();
  const [tableType, setTableType] = useState();

  const handleSelectChange = (value, item, pageType) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [item.ID]: value,
    }));
    setItemId(item.ID);
    setTableType(pageType);
  };

  useEffect(() => {
    const updateVenue = async () => {
      if (!itemID || !statuses[itemID]) return;

      try {
        let endpoint = "";
        if (tableType === "location") {
          endpoint = "api/v1/venue/";
        } else if (tableType === "band") {
          endpoint = "api/v1/band/";
        }

        if (endpoint) {
          const res = await api.put(endpoint, null, {
            params: {
              ID: itemID,
              Status: statuses[itemID],
            },
          });

          if (res.data && Array.isArray(res.data)) {
            console.log("data", res.data);
            const totalApproved = res.data.length || 0;
            setTotalApprove(totalApproved);

            const totalDataCount = data.length || 0;
            setTotalData(totalDataCount);

            const pendingCount = totalDataCount - totalApproved;
            // setpending(pendingCount >= 0 ? pendingCount : 0);
          } else {
            console.error("No valid data returned from the server.");
            setTotalApprove(0);
            // setpending(data.length || 0);
          }
        }
      } catch (err) {
        console.error("Error updating venue:", err);
        setTotalApprove(0);
        // setpending(data.length || 0);
      }
    };

    updateVenue();
  }, [itemID, statuses[itemID], tableType]);

  const getBackgroundColor = (status) => {
    console.log("status", status);
    console.log("itemID", itemID);
    switch (status) {
      case "Approved":
        return "bg-[#5BE97326] text-[#27993A]"; // Green for Approved
      case "Pending":
        return "bg-[#FFAC1C1A] text-[#FFAC1C]"; // Yellow for Pending
      // case "Inactive":
      //   return "bg-[#FC9C9E26] text-[#FF1316]"; // Gray for Inactive
      default:
        return "bg-white"; // Default color
    }
  };

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
                  data={data}
                  item={item}
                  rowNumber={rowNumber}
                  index={index}
                  handleDelete={handleDelete}
                  getBackgroundColor={() =>
                    getBackgroundColor(statuses[item.ID] || item.status)
                  }
                  status={statuses[item.ID] || item.status}
                  handleSelectChange={handleSelectChange}
                />
              ) : (
                <LocationTableData
                  item={item}
                  rowNumber={rowNumber}
                  index={index}
                  handleDelete={handleDelete}
                  getBackgroundColor={() =>
                    getBackgroundColor(statuses[item.ID] || item.status)
                  }
                  handleSelectChange={handleSelectChange}
                  status={statuses[item.ID] || item.status}
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
