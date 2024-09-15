import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Home,
  AboutUs,
  ContactUs,
  Bands,
  Venues,
  AddYourBand,
  AddYourVenue,
  DashBoard,
  AdminVenue,
  AdminBand,
  Ads,
  EmailTemplates,
  AdminGenre,
} from "./pages";
import MainLayout from "./Layout/MainLayout";
import AdminDashboardLayout from "./Layout/AdminDashboardLayout";

const App = () => {
  return (
    <BrowserRouter>
     <ToastContainer />
      <Routes>
        {/*********************** MAIN WEBSITE   ******************************/}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="bands" element={<Bands />} />
          <Route path="venues" element={<Venues />} />
          <Route path="addyourband" element={<AddYourBand />} />
          <Route path="addyourvenue" element={<AddYourVenue />} />
        </Route>

        {/*********************** ADMIN DASHBOARD   ******************************/}
        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="adminvenue" element={<AdminVenue />} />
          <Route path="adminband" element={<AdminBand />} />
          <Route path="admingenre" element={<AdminGenre />} />
          <Route path="ads" element={<Ads />} />
          <Route path="emailtemplates" element={<EmailTemplates />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
