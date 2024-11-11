import React from "react";

const SearchIcon = ({ width, height }) => {
  return (
    <span>
      <svg
        width={width}
        height={height}
        viewBox="0 0 31 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.1752 21.5866L30.5 27.9115L28.4115 30L22.0866 23.6752C19.8124 25.4946 16.9283 26.583 13.7915 26.583C6.4546 26.583 0.5 20.6284 0.5 13.2915C0.5 5.9546 6.4546 0 13.7915 0C21.1284 0 27.083 5.9546 27.083 13.2915C27.083 16.4283 25.9946 19.3124 24.1752 21.5866ZM21.2122 20.4908C23.0181 18.6297 24.1294 16.091 24.1294 13.2915C24.1294 7.57986 19.5032 2.95367 13.7915 2.95367C8.07986 2.95367 3.45367 7.57986 3.45367 13.2915C3.45367 19.0032 8.07986 23.6294 13.7915 23.6294C16.591 23.6294 19.1297 22.5181 20.9908 20.7122L21.2122 20.4908Z"
          fill="#001033"
          fill-opacity="0.3"
        />
      </svg>
    </span>
  );
};

export default SearchIcon;
