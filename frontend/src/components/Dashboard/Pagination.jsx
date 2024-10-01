import React from 'react';
import DoubleNext from "../SVGcomponent/DoubleNext";
import Next from "../SVGcomponent/Next";
import Previous from "../SVGcomponent/Previous";
import DoublePrevious from "../SVGcomponent/DoublePrevious";

// Pagination Component
const Pagination = ({ currentPage, totalPages, handleNext, handlePrevious, handleDoubleNext, handleDoublePrevious }) => {
  return (
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
        <button onClick={handleDoubleNext} disabled={currentPage >= totalPages - 1}>
          <DoubleNext />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
