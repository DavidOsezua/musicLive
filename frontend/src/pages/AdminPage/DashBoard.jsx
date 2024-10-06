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

const DashBoard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [totalResultData, setTotalResultData] = useState({});
  const [totalresultAdsData, setTotalResultAdsData] = useState({});
  const [totalresultBandData, setTotalResultBandData] = useState({});
  const [totalresultVenueData, setTotalResultVenueData] = useState({});

  const fetchTotalResult = async () => {
    try {
      const res = await api.get("/api/v1/tables_verified_lengths");
      setTotalResultData(res.data);
      setTotalResultAdsData(res.data["Ads"] || {});
      setTotalResultBandData(res.data["Band"] || {});
      setTotalResultVenueData(res.data["Venue"] || {});
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  useEffect(() => {
    fetchTotalResult();
  }, []);

  const dashboardSummary = [
    {
      name: "Bands",
      ID: crypto.randomUUID(),
      path: "/admin/adminband",
      numbers: totalresultBandData.total || 0,
      image: Bands,
      status: [
        {
          state: "active",
          number: totalresultBandData.is_verified || 0,
          colorID: "active",
        },
        {
          state: "Pending",
          number:
            (totalresultBandData.total || 0) -
            (totalresultBandData.is_verified || 0),
          colorID: "pending",
        },
        {
          state: "inactive",
          number: 0,
          colorID: "inactive",
        },
      ],
      colorID: "band",
      buttonText: "Add Band +",
    },
    {
      name: "Venue",
      ID: crypto.randomUUID(),
      path: "/admin/location",
      numbers: totalresultVenueData.total || 0,
      image: venueImg,
      status: [
        {
          state: "active",
          number: totalresultVenueData.is_verified || 0,
          colorID: "active",
        },
        {
          state: "Pending",
          number:
            (totalresultVenueData.total || 0) -
            (totalresultVenueData.is_verified || 0),
          colorID: "pending",
        },
        { state: "inactive", number: 0, colorID: "inactive" },
      ],
      colorID: "venue",
      buttonText: "Add Venue +",
    },
    {
      name: "Genre",
      ID: crypto.randomUUID(),
      path: "/admin/admingenre",
      numbers: totalresultBandData.is_verified || 0,
      image: genreImg,
      status: [
        {
          state: "active",
          number: totalresultBandData.admin_approved || 0,
          colorID: "active",
        },
        {
          state: "inactive",
          number:
            (totalresultBandData.total || 0) -
            (totalresultBandData.admin_approved || 0),
          colorID: "inactive",
        },
      ],
      colorID: "genre",
      buttonText: "Add Genre +",
    },
    {
      name: "Advertisment",
      ID: crypto.randomUUID(),
      path: "/admin/ads",
      numbers: totalresultAdsData.total || 0,
      image: ads,
      status: [
        {
          state: "active",
          number: totalresultAdsData.admin_approved || 0,
          colorID: "active",
        },
        {
          state: "Pending",
          number:
            (totalresultAdsData.total || 0) -
            (totalresultAdsData.admin_approved || 0),
          colorID: "pending",
        },
        { state: "inactive", number: 0, colorID: "inactive" },
      ],
      colorID: "band",
      buttonText: "Add Ads +",
    },
    {
      name: "Venue Type",
      ID: crypto.randomUUID(),
      path: "/admin/type",
      numbers: totalresultVenueData.total || 0,
      image: venueImg,
      status: [
        {
          state: "active",
          number: totalresultVenueData.admin_approved || 0,
          colorID: "active",
        },
        {
          state: "Pending",
          number:
            (totalresultVenueData.total || 0) -
            (totalresultVenueData.admin_approved || 0),
          colorID: "pending",
        },
        { state: "inactive", number: 0, colorID: "inactive" },
      ],
      colorID: "venue",
      buttonText: "Add Venue +",
    },
  ];

  const handleSelection = (card) => {
    setSelectedCard((curr) => (curr?.ID === card.ID ? "" : card));
  };

  const cardHandler = () => {
    setSelectedCard(null);
  };

  return (
    <section
      className={`${styles.dashboardSection} adminSection adminContainer transition`}
    >
      <div className={`${styles.dashboardSummary}`}>
        {dashboardSummary.map((summary) => (
          <DashboardCard
            summary={summary}
            modalHandler={cardHandler}
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
            <p className="text-[2rem] font-semibold">5000</p>
            <p className="text-[#437CF3]">+30</p>
            <p className="text-[#437CF3]">New</p>
          </div>

          <div className="flex gap-3 w-full">
            <Button
              text={`Export Email`}
              width={`w-full`}
              radius={`rounded-[5px]`}
            />
            <Button
              colored
              text={`See Details`}
              width={`w-full`}
              radius={`rounded-[5px]`}
            />
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
            title={`Bands`}
            buttonText={`Send Details`}
            numberOfRequests={`+42 new request`}
          />
          <CsvRecent
            title={`Venue`}
            buttonText={`Send Details`}
            numberOfRequests={`+42 new request`}
          />
        </div>
      </div>
      {selectedCard && (
        <Modal2 selectedCard={selectedCard} modalHandler={cardHandler} />
      )}
    </section>
  );
};

export default DashBoard;
