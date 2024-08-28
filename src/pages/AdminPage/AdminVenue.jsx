import React from "react";
import { Outlet } from "react-router-dom";

const AdminVenue = () => {
  return (
    <section className={` adminSection pageContainer`}>
      <h2 className="text-[red] font-[2rem] font-semibold ">
        ! STILL WORKING ON THIS PAGE
      </h2>

      <Outlet />
    </section>
  );
};

export default AdminVenue;
