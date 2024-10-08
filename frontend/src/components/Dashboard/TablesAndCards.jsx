import React, { useState, useEffect } from "react";
import FilterAndSearch from "./FilterAndSearch";
import Table from "./Table";
import DoubleNext from "../SVGcomponent/DoubleNext";
import Next from "../SVGcomponent/Next";
import Previous from "../SVGcomponent/Previous";
import DoublePrevious from "../SVGcomponent/DoublePrevious";
import CardList from "./CardList";
import { api } from "../../services/api.route";
import { useModal } from "../../App";

const TablesAndCards = ({
  pageData,
  pageType,
  columnCount,
  setUserData,
  from,
  setTotalData,
  setTotalApprove,
  settrackChanges,
  musicType,
}) => {
  const { tableOrCardData, status, tableHead, numberOfItem } = pageData;
  const [data, setData] = useState(tableOrCardData || []);
  const [active, setActive] = useState("All");
  const [filteredData, setFilteredData] = useState(tableOrCardData || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [venueStatus, setvenueStatus] = useState({
    venue_type: "",
    status: "",
    ID: "",
  });
  const [resultData, setResultData] = useState([]);

  const itemsPerPage = numberOfItem || 10;

  useEffect(() => {
    setData(tableOrCardData || []);
    setFilteredData(tableOrCardData || []);
  }, [tableOrCardData]);

  // Calculate total number of pages
  let totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  if (totalPages === 0 && currentPage === 1) {
    totalPages = 1;
  }

  console.log(tableOrCardData);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Next and Double Next buttons
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDoubleNext = () => {
    if (currentPage + 2 <= totalPages) setCurrentPage(currentPage + 2);
    else setCurrentPage(totalPages);
  };

  // Previous and Double Previous buttons
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDoublePrevious = () => {
    if (currentPage - 2 >= 1) setCurrentPage(currentPage - 2);
    else setCurrentPage(1);
  };

  // Filtering functionality
  const handleFilter = (status) => {
    if (status === "All") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.status === status));
    }
    setCurrentPage(1); // Reset to first page after filtering
    setActive(status);
  };

  const handleDelete = async (id) => {
    if (!id) {
      return;
    }
    try {
      let endpoint = "";
      if (from === "Band") {
        endpoint = "/api/v1/band/";
      } else if (from === "ads") {
        endpoint = "/api/v1/ads/";
      } else if (from === "venue") {
        endpoint = "/api/v1/venue/";
      }

      await api.delete(`${endpoint}${id}`);
      const newData = data.filter((item) => item.ID !== id);
      setData(newData);
      setFilteredData(newData);
      setTotalData(newData.length);
      setUserData((prevData) => prevData.filter((item) => item.ID !== id));
      settrackChanges(true);
    } catch (err) {
      console.log(err);
      setTotalData(0);
      settrackChanges(false);
    }
  };

  useEffect(() => {
    console.log(venueStatus);
    console.log(musicType);
    if (!venueStatus.status || !venueStatus.ID) {
      return;
    }
    const setMusicStatus = async () => {
      try {
        let endpoint = "";
        if (musicType === "genre") {
          endpoint = "api/v1/band/approved/";
        } else if (musicType === "venue") {
          endpoint = "api/v1/venue/approved/";
        } else if (musicType === "ads") {
          endpoint = "api/v1/ads/approved/";
        }
        console.log(endpoint);
        if (endpoint) {
          const res = await api.put(endpoint, null, {
            params: {
              venue_type: venueStatus.ID,
              Status: venueStatus.status,
            },
          });
          const uniqueTypes = [];
          let approvedCount = 0;
          res.data.map((data) => {
            if (!uniqueTypes.includes(data.venue_type)) {
              uniqueTypes.push(data.venue_type);

              if (data.is_admin_approved) {
                approvedCount++;
              }
            }
          });
          setTotalData(uniqueTypes.length);
          setTotalApprove(approvedCount);
          settrackChanges(true);
          console.log("result", res.data);
          setResultData(res.data);
        }
      } catch (e) {
        console.log(e);
        settrackChanges(false);
      }
    };
    setMusicStatus();
  }, [venueStatus, musicType]);

  const updateItemStatus = (type, newStatus, id) => {
    setvenueStatus((prevState) => ({
      ...prevState,
      venue_type: type,
    }));
    setvenueStatus((prevState) => ({
      ...prevState,
      status: newStatus,
    }));
    setvenueStatus((prevState) => ({
      ...prevState,
      ID: id,
    }));
    setData((prevData) =>
      prevData.map((item) =>
        item.genreOrType === type ? { ...item, status: newStatus } : item
      )
    );
    setFilteredData((prevFilteredData) =>
      prevFilteredData.map((item) =>
        item.genreOrType === type ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <section className="tableAndCards">
      {/* RENDERING FILTER BUTTONS */}
      <FilterAndSearch
        data={pageData}
        pageType={pageType}
        handleFilter={handleFilter}
        active={active}
      />

      {/* RENDERING TABLES OR CARDS BASED ON THE PAGE TYPE */}
      {pageType === "venue" || pageType === "bands" ? (
        <div className="tableContainer">
          <Table
            tableHead={tableHead}
            tableBody={currentItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            columnCount={columnCount}
            handleDelete={handleDelete}
            data={data}
            setUserData={setUserData}
            setTotalData={setTotalData}
            setData={setData}
            setFilteredData={setFilteredData}
            setTotalApprove={setTotalApprove}
            // setpending={setpending}
          />
        </div>
      ) : (
        <CardList
          data={currentItems}
          updateItemStatus={updateItemStatus}
          handleDelete={handleDelete}
        />
      )}

      {/* Pagination controls */}
      <div className="flex justify-center gap-2">
        <div>
          <button onClick={handleDoublePrevious} disabled={currentPage <= 2}>
            <DoublePrevious />
          </button>
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            <Previous />
          </button>
        </div>

        <p>
          {currentPage} of {totalPages}
        </p>

        <div>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            <Next />
          </button>
          <button
            onClick={handleDoubleNext}
            disabled={currentPage >= totalPages - 1}
          >
            <DoubleNext />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TablesAndCards;
