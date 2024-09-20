import React, { useState, useEffect } from "react";
import FilterAndSearch from "./FilterAndSearch";
import Table from "./Table";
import DoubleNext from "../SVGcomponent/DoubleNext";
import Next from "../SVGcomponent/Next";
import Previous from "../SVGcomponent/Previous";
import DoublePrevious from "../SVGcomponent/DoublePrevious";
import CardList from "./CardList";
import { api } from "../../services/api.route";

// const TablesAndCards = ({ pageData, pageType, columnCount }) => {
//   const { tableOrCardData, status, tableHead, numberOfItem } = pageData;
//   const [data, setData] = useState(tableOrCardData);
//   const [active, setActive] = useState("All");
//   const [filteredData, setFilteredData] = useState(tableOrCardData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editId, setEditId] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [previewItem, setPreviewItem] = useState(null);
//   const [editDetails, setEditDetails] = useState("");
//   const [isEditingPreview, setIsEditingPreview] = useState(false);

//   const itemsPerPage = numberOfItem;

const TablesAndCards = ({
  pageData,
  pageType,
  columnCount,
  setUserData,
  from,
  totalBand,
}) => {
  const { tableOrCardData, status, tableHead, numberOfItem } = pageData;
  const [data, setData] = useState(tableOrCardData || []);
  const [active, setActive] = useState("All");
  const [filteredData, setFilteredData] = useState(tableOrCardData || []);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = numberOfItem || 10;

  useEffect(() => {
    setData(tableOrCardData || []);
    setFilteredData(tableOrCardData || []);
  }, [tableOrCardData]);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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
    try {
      if (from !== "Band") {
        await api.delete(`/api/v1/venue/${id}`);
        const newData = data.filter((item) => item.ID !== id);
        setData(newData);
        setFilteredData(newData);
        totalBand(newData.length);
        setUserData((prevData) => prevData.filter((item) => item.ID !== id));
      } else {
        await api.delete(`/api/v1/band/${id}`);
        const newData = data.filter((item) => item.ID !== id);
        setData(newData);
        setFilteredData(newData);
        totalBand(newData.length);
        setUserData((prevData) => prevData.filter((item) => item.ID !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Preview functionality
  const handlePreview = (item) => {
    setPreviewItem(item);
    setEditName(item.name); // Set initial name for editing
    setEditDetails(item.details); // Set initial details for editing
    setIsEditingPreview(false); // Start in non-edit mode
  };

  const closePreview = () => {
    setPreviewItem(null);
    setIsEditingPreview(false); // Reset editing state when closing
  };

  // const updateItemStatus = (id, newStatus) => {
  //   setData((prevData) =>
  //     prevData.map((item) =>
  //       item.ID === id ? { ...item, status: newStatus } : item
  //     )
  //   );
  //   setFilteredData((prevFilteredData) =>
  //     prevFilteredData.map((item) =>
  //       item.ID === id ? { ...item, status: newStatus } : item
  //     )
  //   );
  // };

  // Save edited name and details in preview modal
  const handleSavePreview = () => {
    const newData = data.map((item) =>
      item.ID === previewItem.ID
        ? { ...item, name: editName, details: editDetails }
        : item
    );
    setData(newData);
    setFilteredData(newData);
    setPreviewItem({ ...previewItem, name: editName, details: editDetails });
    setIsEditingPreview(false);
  };

  // const updateItemStatus = (id, newStatus) => {
  //   console.log(`Updating item with id: ${id} to status: ${newStatus}`);
  //   setData((prevData) =>
  //     prevData.map((item) =>
  //       item.ID === id ? { ...item, status: newStatus } : item
  //     )
  //   );
  // };

  const updateItemStatus = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.ID === id ? { ...item, status: newStatus } : item
      )
    );
    setFilteredData((prevFilteredData) =>
      prevFilteredData.map((item) =>
        item.ID === id ? { ...item, status: newStatus } : item
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
