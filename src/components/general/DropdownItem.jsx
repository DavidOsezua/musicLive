import React from "react";
const DropdownItem = ({ img, closeDropdown }) => {
  return (
    <div onClick={closeDropdown}>
      <div
        className={`flex gap-4 items-center cursor-pointer text-[#C8A2D6] border-b-[1px] py-[10px] border-[#7B548D99]`}
      >
        <img src={img} className="w-[15px]" />

        <p>Genre</p>
      </div>
    </div>
  );
};

export default DropdownItem;
