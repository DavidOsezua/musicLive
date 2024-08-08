import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  Home,
  AboutUs,
  ContactUs,
  Bands,
  Venues,
  AddYourBand,
  AddYourVenue,
} from "./pages";
import { Footer, Navbar } from "./components";
import FooterTwo from "./components/general/FooterTwo";

const App = () => {
  return (
    <div className="transition">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="bands" element={<Bands />} />
          <Route path="venues" element={<Venues />} />
          <Route path="addyourband" element={<AddYourBand />} />
          <Route path="addyourvenue" element={<AddYourVenue />} />
        </Routes>
        <Footer />
        <FooterTwo/>
      </BrowserRouter>
    </div>
  );
};

export default App;
