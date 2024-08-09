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
   
      <BrowserRouter>
       <div className="transition">
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
        </div>
      </BrowserRouter>
    
  );
};

export default App;
