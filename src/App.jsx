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
  DashBoard,
  AdminVenue,
  AdminBand,
  Ads,
  EmailTemplates,
  AdminGenre,
  Location,
  Type,
} from "./pages";
import MainLayout from "./Layout/MainLayout";
import AdminDashboardLayout from "./Layout/AdminDashboardLayout";

const App = () => {
  return (
    <BrowserRouter>
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
          <Route path="location" element={<Location />} />
          <Route path="type" element={<Type />} />
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
