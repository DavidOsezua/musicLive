import styles from "./Table.module.css";
import BandTableData from "./BandTableData";
import LocationTableData from "./LocationTableData";
// import AnotherTableData from "./AnotherTableData";
import { api } from "../../services/api.route";
import { useState, useEffect } from "react";
import EventTable from "./EventTable";

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
  }, [itemID, statuses, tableType]);

  const getBackgroundColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-[#5BE97326] text-[#27993A]"; // Green for Approved
      case "Pending":
        return "bg-[#FFAC1C1A] text-[#FFAC1C]"; // Yellow for Pending
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
              ) : columnCount === 8 ? (
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
              ) : columnCount === 9 ? (
                <EventTable
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
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
