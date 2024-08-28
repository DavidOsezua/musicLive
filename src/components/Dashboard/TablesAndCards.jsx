/* eslint-disable react/prop-types */
import React, { useState } from "react";
import FilterAndSearch from "./FilterAndSearch";
import Table from "./Table";
import DoubleNext from "../SVGcomponent/DoubleNext";
import Next from "../SVGcomponent/Next";
import Previous from "../SVGcomponent/Previous";
import DoublePrevious from "../SVGcomponent/DoublePrevious";
import CardList from "./CardList";

const TablesAndCards = ({ pageData, pageType }) => {
  const { tableOrCardData, status, tableHead, numberOfItem } = pageData;
  const [data, setData] = useState(tableOrCardData);
  const [active, setActive] = useState("All");
  const [filteredData, setFilteredData] = useState(tableOrCardData);
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [previewItem, setPreviewItem] = useState(null);
  const [editDetails, setEditDetails] = useState("");
  const [isEditingPreview, setIsEditingPreview] = useState(false);

  const itemsPerPage = numberOfItem;

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
    else setCurrentPage(totalPages); // Move to the last page if less than 2 pages left
  };

  // Previous and Double Previous buttons
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDoublePrevious = () => {
    if (currentPage - 2 >= 1) setCurrentPage(currentPage - 2);
    else setCurrentPage(1); // Move to the first page if less than 2 pages left
  };

  // Filtering functionality
  const handleFilter = (status) => {
    if (status === "All") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) => {
          console.log(item);
          return item.status === status;
        })
      );
    }

    console.log(status);
    setCurrentPage(1); // Reset to first page after filtering
    setActive(status);
  };

  // Delete functionality
  const handleDelete = (id) => {
    const newData = data.filter((item) => item.ID !== id);
    setData(newData);
    setFilteredData(newData);
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

  // Save edited name and details in preview modal
  const handleSavePreview = () => {
    const newData = data.map((item) =>
      item.id === previewItem.id
        ? { ...item, name: editName, details: editDetails }
        : item
    );
    setData(newData);
    setFilteredData(newData);
    setPreviewItem({ ...previewItem, name: editName, details: editDetails }); // Update the preview item
    setIsEditingPreview(false); // Exit editing mode
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

        {/* {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))} */}

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
