import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, FooterTwo, Navbar } from "../components";

const MainLayout = () => {
  return (
    <div className="transition">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FooterTwo />
    </div>
  );
};

export default MainLayout;
