/**************************** WithOut The Filtering logic  ****************************************/

// import React, { useState } from "react";

// // Sample data for the table (20 items as an example)
// const initialData = Array.from({ length: 20 }, (_, i) => ({
//   id: i + 1,
//   name: `Item ${i + 1}`,
//   details: `This is the detailed information for Item ${i + 1}.`,
// }));

// const SomeFunctionality = () => {
//   const [data, setData] = useState(initialData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editId, setEditId] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [editDetails, setEditDetails] = useState("");
//   const [previewItem, setPreviewItem] = useState(null);
//   const itemsPerPage = 5;

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   // Get the current items to be displayed
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Handler for the Next and Double Next buttons
//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleDoubleNext = () => {
//     if (currentPage + 2 <= totalPages) {
//       setCurrentPage(currentPage + 2);
//     } else {
//       setCurrentPage(totalPages); // Move to the last page if only one page is left
//     }
//   };

//   // Delete functionality
//   const handleDelete = (id) => {
//     const newData = data.filter((item) => item.id !== id);
//     setData(newData);

//     // Adjust pagination if the last item of the last page is deleted
//     if (currentItems.length === 1 && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Edit functionality
//   const handleEdit = (item) => {
//     setEditId(item.id);
//     setEditName(item.name);
//     setEditDetails(item.details);
//   };

//   const handleSave = (id) => {
//     const newData = data.map((item) =>
//       item.id === id ? { ...item, name: editName, details: editDetails } : item
//     );
//     setData(newData);
//     setEditId(null); // Close edit mode
//   };

//   // Preview functionality
//   const handlePreview = (item) => {
//     setPreviewItem(item);
//   };

//   const closePreview = () => {
//     setPreviewItem(null);
//   };

//   return (
//     <div>
//       {/* Table displaying paginated data */}
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map((item) => (
//             <tr key={item.id}>
//               <td>{item.id}</td>
//               <td>
//                 {editId === item.id ? (
//                   <input
//                     type="text"
//                     value={editName}
//                     onChange={(e) => setEditName(e.target.value)}
//                   />
//                 ) : (
//                   item.name
//                 )}
//               </td>
//               <td>
//                 {editId === item.id ? (
//                   <>
//                     <button onClick={() => handleSave(item.id)}>Save</button>
//                     <button onClick={() => setEditId(null)}>Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => handlePreview(item)}>Preview</button>
//                     <button onClick={() => handleEdit(item)}>Edit</button>
//                     <button onClick={() => handleDelete(item.id)}>
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination controls */}
//       <div>
//         <button
//           onClick={() => paginate(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>

//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => paginate(i + 1)}
//             className={currentPage === i + 1 ? "active" : ""}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button onClick={handleNext} disabled={currentPage === totalPages}>
//           Next
//         </button>

//         <button
//           onClick={handleDoubleNext}
//           disabled={currentPage === totalPages}
//         >
//           Double Next
//         </button>
//       </div>

//       {/* Preview Modal */}
//       {previewItem && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>Preview of {previewItem.name}</h3>
//             <p>{previewItem.details}</p>
//             <button onClick={closePreview}>Close</button>
//           </div>
//         </div>
//       )}

//       {/* Edit Mode for Details */}
//       {editId && (
//         <div className="edit-section">
//           <h3>Edit Details</h3>
//           <textarea
//             value={editDetails}
//             onChange={(e) => setEditDetails(e.target.value)}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default SomeFunctionality;

/**************************** PREVIEW, EDIT AND SAVE AND THE FILTERING FUNCTION  ****************************************/

// import React, { useState } from "react";

// // Sample data for the table
// const initialData = Array.from({ length: 20 }, (_, i) => ({
//   id: i + 1,
//   name: `Item ${i + 1}`,
//   status: i % 2 === 0 ? "approved" : i % 3 === 0 ? "pending" : "inactive",
//   details: `Detailed info for Item ${i + 1}`,
// }));

// const SomeFunctionality = () => {
//   const [data, setData] = useState(initialData);
//   const [filteredData, setFilteredData] = useState(initialData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editId, setEditId] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [previewItem, setPreviewItem] = useState(null);
//   const itemsPerPage = 5;

//   // Calculate total number of pages
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   // Get current items for the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Next and Double Next buttons
//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handleDoubleNext = () => {
//     if (currentPage + 2 <= totalPages) setCurrentPage(currentPage + 2);
//     else setCurrentPage(totalPages); // Move to the last page if less than 2 pages left
//   };

//   // Previous and Double Previous buttons
//   const handlePrevious = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleDoublePrevious = () => {
//     if (currentPage - 2 >= 1) setCurrentPage(currentPage - 2);
//     else setCurrentPage(1); // Move to the first page if less than 2 pages left
//   };

//   // Filtering functionality
//   const handleFilter = (status) => {
//     if (status === "all") {
//       setFilteredData(data);
//     } else {
//       setFilteredData(data.filter((item) => item.status === status));
//     }
//     setCurrentPage(1); // Reset to first page after filtering
//   };

//   // Delete functionality
//   const handleDelete = (id) => {
//     const newData = data.filter((item) => item.id !== id);
//     setData(newData);
//     setFilteredData(newData);
//   };

//   // Edit functionality
//   const handleEdit = (id, name) => {
//     setEditId(id);
//     setEditName(name);
//   };

//   const handleSave = (id) => {
//     const newData = data.map((item) =>
//       item.id === id ? { ...item, name: editName } : item
//     );
//     setData(newData);
//     setFilteredData(newData);
//     setEditId(null); // Exit edit mode
//   };

//   // Preview functionality
//   const handlePreview = (item) => {
//     setPreviewItem(item);
//   };

//   const closePreview = () => {
//     setPreviewItem(null);
//   };

//   return (
//     <div>
//       {/* Filtering buttons */}
//       <div>
//         <button onClick={() => handleFilter("all")}>All Status</button>
//         <button onClick={() => handleFilter("approved")}>Approved</button>
//         <button onClick={() => handleFilter("pending")}>Pending</button>
//         <button onClick={() => handleFilter("inactive")}>Inactive</button>
//       </div>

//       {/* Table displaying paginated data */}
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map((item) => (
//             <tr key={item.id}>
//               <td>{item.id}</td>
//               <td>
//                 {editId === item.id ? (
//                   <input
//                     type="text"
//                     value={editName}
//                     onChange={(e) => setEditName(e.target.value)}
//                   />
//                 ) : (
//                   item.name
//                 )}
//               </td>
//               <td>{item.status}</td>
//               <td>
//                 {editId === item.id ? (
//                   <>
//                     <button onClick={() => handleSave(item.id)}>Save</button>
//                     <button onClick={() => setEditId(null)}>Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => handleEdit(item.id, item.name)}>
//                       Edit
//                     </button>
//                     <button onClick={() => handleDelete(item.id)}>
//                       Delete
//                     </button>
//                     <button onClick={() => handlePreview(item)}>Preview</button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination controls */}
//       <div>
//         <button onClick={handleDoublePrevious} disabled={currentPage <= 2}>
//           Double Previous
//         </button>
//         <button onClick={handlePrevious} disabled={currentPage === 1}>
//           Previous
//         </button>

//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => paginate(i + 1)}
//             className={currentPage === i + 1 ? "active" : ""}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button onClick={handleNext} disabled={currentPage === totalPages}>
//           Next
//         </button>
//         <button
//           onClick={handleDoubleNext}
//           disabled={currentPage >= totalPages - 1}
//         >
//           Double Next
//         </button>
//       </div>

//       {/* Preview Modal */}
//       {previewItem && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>Preview of {previewItem.name}</h3>
//             <p>{previewItem.details}</p>
//             <button onClick={closePreview}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SomeFunctionality;

/**************************** EDIT PREVIEW DETAILS  ****************************************/

// import React, { useState } from "react";

// // Sample data for the table
// const initialData = Array.from({ length: 20 }, (_, i) => ({
//   id: i + 1,
//   name: `Item ${i + 1}`,
//   status: i % 2 === 0 ? "approved" : i % 3 === 0 ? "pending" : "inactive",
//   details: `Detailed info for Item ${i + 1}`,
// }));

// const SomeFunctionality = () => {
//   const [data, setData] = useState(initialData);
//   const [filteredData, setFilteredData] = useState(initialData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editId, setEditId] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [previewItem, setPreviewItem] = useState(null);
//   const [editDetails, setEditDetails] = useState("");
//   const [isEditingDetails, setIsEditingDetails] = useState(false);
//   const itemsPerPage = 5;

//   // Calculate total number of pages
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   // Get current items for the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Next and Double Next buttons
//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handleDoubleNext = () => {
//     if (currentPage + 2 <= totalPages) setCurrentPage(currentPage + 2);
//     else setCurrentPage(totalPages); // Move to the last page if less than 2 pages left
//   };

//   // Previous and Double Previous buttons
//   const handlePrevious = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleDoublePrevious = () => {
//     if (currentPage - 2 >= 1) setCurrentPage(currentPage - 2);
//     else setCurrentPage(1); // Move to the first page if less than 2 pages left
//   };

//   // Filtering functionality
//   const handleFilter = (status) => {
//     if (status === "all") {
//       setFilteredData(data);
//     } else {
//       setFilteredData(data.filter((item) => item.status === status));
//     }
//     setCurrentPage(1); // Reset to first page after filtering
//   };

//   // Delete functionality
//   const handleDelete = (id) => {
//     const newData = data.filter((item) => item.id !== id);
//     setData(newData);
//     setFilteredData(newData);
//   };

//   // Edit functionality
//   const handleEdit = (id, name) => {
//     setEditId(id);
//     setEditName(name);
//   };

//   const handleSave = (id) => {
//     const newData = data.map((item) =>
//       item.id === id ? { ...item, name: editName } : item
//     );
//     setData(newData);
//     setFilteredData(newData);
//     setEditId(null); // Exit edit mode
//   };

//   // Preview functionality
//   const handlePreview = (item) => {
//     setPreviewItem(item);
//     setEditDetails(item.details); // Set initial details for editing
//     setIsEditingDetails(false); // Start in non-edit mode
//   };

//   const closePreview = () => {
//     setPreviewItem(null);
//     setIsEditingDetails(false); // Reset editing state when closing
//   };

//   // Save edited details in preview modal
//   const handleSaveDetails = () => {
//     const newData = data.map((item) =>
//       item.id === previewItem.id ? { ...item, details: editDetails } : item
//     );
//     setData(newData);
//     setFilteredData(newData);
//     setPreviewItem({ ...previewItem, details: editDetails }); // Update the preview item
//     setIsEditingDetails(false); // Exit editing mode
//   };

//   return (
//     <div>
//       {/* Filtering buttons */}
//       <div>
//         <button onClick={() => handleFilter("all")}>All Status</button>
//         <button onClick={() => handleFilter("approved")}>Approved</button>
//         <button onClick={() => handleFilter("pending")}>Pending</button>
//         <button onClick={() => handleFilter("inactive")}>Inactive</button>
//       </div>

//       {/* Table displaying paginated data */}
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map((item) => (
//             <tr key={item.id}>
//               <td>{item.id}</td>
//               <td>
//                 {editId === item.id ? (
//                   <input
//                     type="text"
//                     value={editName}
//                     onChange={(e) => setEditName(e.target.value)}
//                   />
//                 ) : (
//                   item.name
//                 )}
//               </td>
//               <td>{item.status}</td>
//               <td>
//                 {editId === item.id ? (
//                   <>
//                     <button onClick={() => handleSave(item.id)}>Save</button>
//                     <button onClick={() => setEditId(null)}>Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => handleEdit(item.id, item.name)}>
//                       Edit
//                     </button>
//                     <button onClick={() => handleDelete(item.id)}>
//                       Delete
//                     </button>
//                     <button onClick={() => handlePreview(item)}>Preview</button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination controls */}
//       <div>
//         <button onClick={handleDoublePrevious} disabled={currentPage <= 2}>
//           Double Previous
//         </button>
//         <button onClick={handlePrevious} disabled={currentPage === 1}>
//           Previous
//         </button>

//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => paginate(i + 1)}
//             className={currentPage === i + 1 ? "active" : ""}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button onClick={handleNext} disabled={currentPage === totalPages}>
//           Next
//         </button>
//         <button
//           onClick={handleDoubleNext}
//           disabled={currentPage >= totalPages - 1}
//         >
//           Double Next
//         </button>
//       </div>

//       {/* Preview Modal with editable details */}
//       {previewItem && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>Preview of {previewItem.name}</h3>

//             {isEditingDetails ? (
//               <>
//                 <textarea
//                   value={editDetails}
//                   onChange={(e) => setEditDetails(e.target.value)}
//                   rows="5"
//                   cols="50"
//                 />
//                 <button onClick={handleSaveDetails}>Save Details</button>
//                 <button onClick={() => setIsEditingDetails(false)}>
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <p>{previewItem.details}</p>
//                 <button onClick={() => setIsEditingDetails(true)}>
//                   Edit Details
//                 </button>
//               </>
//             )}

//             <button onClick={closePreview}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SomeFunctionality;

/**************************** EDIT ITEMS ON THE TABLE  ****************************************/

import React, { useState } from "react";

// Sample data for the table
const initialData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  status: i % 2 === 0 ? "approved" : i % 3 === 0 ? "pending" : "inactive",
  details: `Detailed info for Item ${i + 1}`,
}));

const SomeFunctionality = () => {
  const [data, setData] = useState(initialData);
  const [active, setActive] = useState("all");
  const [filteredData, setFilteredData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [previewItem, setPreviewItem] = useState(null);
  const [editDetails, setEditDetails] = useState("");
  const [isEditingPreview, setIsEditingPreview] = useState(false);
  const itemsPerPage = 5;

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
    if (status === "all") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.status === status));
    }

    setCurrentPage(1); // Reset to first page after filtering
    setActive(status);
  };

  // Delete functionality
  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
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

  return (
    <div>
      {/* Filtering buttons */}
      <div>
        <button
          onClick={() => handleFilter("all")}
          className={`${active === "all" ? "text-[#0E3386]" : ""}`}
        >
          All Status
        </button>
        <button
          onClick={() => handleFilter("approved")}
          className={`${active === "approved" ? "text-[#0E3386]" : ""}`}
        >
          Approved
        </button>
        <button
          onClick={() => handleFilter("pending")}
          className={`${active === "pending" ? "text-[#0E3386]" : ""}`}
        >
          Pending
        </button>
        <button
          onClick={() => handleFilter("inactive")}
          className={`${active === "inactive" ? "text-[#0E3386]" : ""}`}
        >
          Inactive
        </button>
      </div>

      {/* Table displaying paginated data */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.status}</td>
              <td>
                <button onClick={() => handlePreview(item)}>Preview</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div>
        <button onClick={handleDoublePrevious} disabled={currentPage <= 2}>
          Double Previous
        </button>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
        <button
          onClick={handleDoubleNext}
          disabled={currentPage >= totalPages - 1}
        >
          Double Next
        </button>
      </div>

      {/* Preview Modal with editable name and details */}
      {previewItem && (
        <div className="modal">
          <div className="modal-content">
            <h3>Preview of {previewItem.name}</h3>

            {isEditingPreview ? (
              <>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Details:</label>
                  <textarea
                    value={editDetails}
                    onChange={(e) => setEditDetails(e.target.value)}
                    rows="5"
                    cols="50"
                  />
                </div>
                <button onClick={handleSavePreview}>Save</button>
                <button onClick={() => setIsEditingPreview(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p>
                  <strong>Name:</strong> {previewItem.name}
                </p>
                <p>
                  <strong>Details:</strong> {previewItem.details}
                </p>
                <button onClick={() => setIsEditingPreview(true)}>Edit</button>
              </>
            )}

            <button onClick={closePreview}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SomeFunctionality;
