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
  Location,
  Type,
} from "./pages";
import MainLayout from "./Layout/MainLayout";
import AdminDashboardLayout from "./Layout/AdminDashboardLayout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
  return (
    <BrowserRouter>
<<<<<<< HEAD:src/App.jsx
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
=======
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
>>>>>>> 6fab4b4e87ac2b1e3f6c33df75dee9ede6675d3e:frontend/src/App.jsx

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
      </LocalizationProvider>
    </BrowserRouter>
  );
};

export default App;
