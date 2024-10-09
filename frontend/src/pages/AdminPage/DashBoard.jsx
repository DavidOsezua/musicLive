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

const DashBoard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const { modal, modalHandler } = useModal() || {};
  const [totalResultData, setTotalResultData] = useState({});
  const [totalresultAdsData, setTotalResultAdsData] = useState({});
  const [totalresultBandData, setTotalResultBandData] = useState({});
  const [totalresultVenueData, setTotalResultVenueData] = useState({});
  const [totalresultVenueTypeData, setTotalResultVenueTypeData] = useState({});
  const [totalresultGenreData, setTotalResultGenreData] = useState({});

  console.log(totalresultVenueTypeData);

  console.log(modal);

  const fetchTotalResult = async () => {
    try {
      const res = await api.get("/api/v1/tables_verified_lengths");
      const total = res.data;

      console.log(total);
      setTotalResultData(total);
      setTotalResultAdsData(total["Ads"] || {});
      setTotalResultBandData(total["Band"] || {});
      setTotalResultVenueData(total["Venue"] || {});
      setTotalResultVenueTypeData(total["Venuetype"]);
      setTotalResultGenreData(total["Genre"]);
    } catch (e) {
      console.error("Error fetchtotal:", e);
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
      component: <AddBand />,
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
      component: <AddLocation />,
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
      numbers: totalresultGenreData.total || 0,
      image: genreImg,
      component: <AddGenre />,
      status: [
        {
          state: "active",
          number: totalresultGenreData.admin_approved || 0,
          colorID: "active",
        },
        {
          state: "inactive",
          number:
            (totalresultGenreData.total || 0) -
            (totalresultGenreData.admin_approved || 0),
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
      component: <AddAds />,
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
      numbers: totalresultVenueTypeData.total || 0,
      image: venueImg,
      component: <AddType />,
      status: [
        {
          state: "active",
          number: totalresultVenueTypeData.admin_approved || 0,
          colorID: "active",
        },
        {
          state: "Pending",
          number:
            (totalresultVenueTypeData.total || 0) -
            (totalresultVenueTypeData.admin_approved || 0),
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

  console.log(selectedCard);

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
            <p className="text-[2rem] font-semibold">0</p>
            <p className="text-[#437CF3]">+0</p>
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
            numberOfRequests={`+0 new request`}
          />
          <CsvRecent
            title={`Venue`}
            buttonText={`Send Details`}
            numberOfRequests={`+0 new request`}
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
