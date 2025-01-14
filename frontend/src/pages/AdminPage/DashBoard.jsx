import React, { useEffect, useState } from "react";
import styles from "./DashBoard.module.css";
import Button from "../../components/general/Button";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import CsvRecent from "../../components/Dashboard/CsvRecent";
import Mail from "../../components/SVGcomponent/Mail";
import Modal2 from "@/components/general/Modal2";
import { api } from "@/services/api.route";
import { ads, Bands, genreImg, venueImg } from "../../assets";
import Loader from "@/components/general/Loader";
import { useModal } from "@/App";
import AddBand from "@/components/Dashboard/AddBand";
import AddLocation from "@/components/Dashboard/AddLocation";
import AddGenre from "@/components/Dashboard/AddGenre";
import AddAds from "@/components/Dashboard/AddAds";
import AddType from "@/components/Dashboard/AddType";
import Modal from "@/components/general/Modal";
import { CSVLink } from "react-csv";
import useDashboard from "@/CustomHooks/useDashboard";

const DashBoard = () => {
  const {
    dashboardSummary,
    selectedCard,
    handleSelection,
    totalSubscribers,
    pendingBand,
    pendingVenue,
    cardHandler,
  } = useDashboard();

  return (
    <section
      className={`${styles.dashboardSection} adminSection adminContainer transition`}
    >
      <div className={`${styles.dashboardSummary}`}>
        {dashboardSummary.map((summary) => (
          <DashboardCard
            summary={summary}
            // modalHandler={cardHandler}
            key={summary.ID}
            selectedCard={selectedCard}
            onSelection={handleSelection}
          />
        ))}
      </div>

      <div className={`${styles.emailCard}`}>
        <div className={`${styles.emailcontainer}`}>
          <div className="flex justify-between items-center">
            <h3>Email Subscriber</h3>
            <Mail />
          </div>

          <div className="flex items-center gap-2">
            <p className="text-[2rem] font-semibold">
              {totalSubscribers.length}
            </p>
            {/* <p className="text-[#437CF3]">+0</p>
            <p className="text-[#437CF3]">New</p> */}
          </div>

          <div className="flex gap-3 w-full">
            <button className={`${styles.colored}`}>
              <CSVLink data={totalSubscribers}>Export Email</CSVLink>
            </button>
          </div>
        </div>

        <div className={`${styles.csvRecent}`}>
          <h3>CSV</h3>
          <CsvRecent title={`Bands`} buttonText={`Export File`} />
          <CsvRecent title={`Venue`} buttonText={`Export File`} />
        </div>

        <div className={`${styles.csvRecent}`}>
          <h3>Recents</h3>
          <CsvRecent
            path={"/admin/adminband"}
            title={`Bands`}
            buttonText={`See Details`}
            numberOfRequests={`${pendingBand} Pending ${
              pendingBand > 1 ? "requests" : "request"
            }`}
          />
          <CsvRecent
            path={"/admin/location"}
            title={`Venue`}
            buttonText={`See Details`}
            numberOfRequests={`${pendingVenue} Pending ${
              pendingVenue > 1 ? "requests" : "request"
            }`}
          />
        </div>
      </div>
      {selectedCard && (
        <Modal modalHandler={cardHandler}>{selectedCard.component}</Modal>
      )}
    </section>
  );
};

export default DashBoard;
