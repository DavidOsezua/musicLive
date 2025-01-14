import React, { useEffect, useState } from "react";
import { useModal } from "@/App";
import { ads, Bands, genreImg, venueImg } from "@/assets";
import AddAds from "@/components/Dashboard/AddAds";
import AddBand from "@/components/Dashboard/AddBand";
import AddGenre from "@/components/Dashboard/AddGenre";
import AddLocation from "@/components/Dashboard/AddLocation";
import AddType from "@/components/Dashboard/AddType";
import { api } from "@/services/api.route";
import useBands from "./useBands";
import useAds from "./useAds";
import useVenues from "./useVenues";
import useType from "./useType";

const useDashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [totalResultData, setTotalResultData] = useState({});
  const [totalresultAdsData, setTotalResultAdsData] = useState({});
  const [totalresultBandData, setTotalResultBandData] = useState({});
  const [totalresultVenueData, setTotalResultVenueData] = useState({});
  const [totalresultVenueTypeData, setTotalResultVenueTypeData] = useState({});
  const [totalresultGenreData, setTotalResultGenreData] = useState({});
  const [totalSubscribers, setTotalSubcribers] = useState([]);
  const { modal, modalHandler } = useModal() || {};

  //
  const handleSelection = (card) => {
    setSelectedCard((curr) => (curr?.ID === card.ID ? "" : card));
  };

  //
  const cardHandler = () => {
    setSelectedCard(null);
  };

  //UseBands

  const { setShowResultModal } = useBands();

  const allBandModalHandler = () => {
    cardHandler();
    setShowResultModal((prev) => !prev);
  };

  //useVenue
  const { setVenueShowResultModal } = useVenues();
  const allVenueModalHandler = () => {
    cardHandler();
    setVenueShowResultModal((prev) => !prev);
  };

  //useAds
  const {
    allAdsModalHandler,
    setAdsShowResultModal,
    AdsShowResultModal,
    getAlladsData,
  } = useAds();

  //useType
  const {
    allTypeModalHandler,
    setTypeShowResultModal,
    TypeShowResultModal,
    getAllVenueTypeData,
  } = useType();

  //
  const getAllSubcribers = async () => {
    try {
      const res = await api.get("/api/v1/subscribers");
      const data = res.data;

      setTotalSubcribers(data);
    } catch (error) {
      console.log(error);
    }
  };

  //
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

  //
  useEffect(() => {
    fetchTotalResult();
  }, []);

  //
  useEffect(() => {
    getAllSubcribers();
  }, []);

  //
  const pendingVenue =
    totalresultVenueData.total - totalresultVenueData.is_verified;
  const pendingBand =
    totalresultBandData.total - totalresultBandData.is_verified;

  //
  const dashboardSummary = [
    {
      name: "Bands",
      ID: crypto.randomUUID(),
      path: "/admin/adminband",
      numbers: totalresultBandData.total || 0,
      image: Bands,
      component: <AddBand cancel={allBandModalHandler} />,
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
      component: <AddLocation cancel={allVenueModalHandler} />,
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
      component: (
        <AddAds
          cancel={allAdsModalHandler}
          setShowResultModal={setAdsShowResultModal}
          showResultModal={AdsShowResultModal}
          getAlladsData={getAlladsData}
        />
      ),
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
      component: (
        <AddType
          cancel={allTypeModalHandler}
          setShowResultModal={setTypeShowResultModal}
          showResultModal={TypeShowResultModal}
          getAllVenueTypeData={getAllVenueTypeData}
        />
      ),
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
      ],
      colorID: "venue",
      buttonText: "Add Venue +",
    },
  ];

  console.log(selectedCard);
  return {
    dashboardSummary,
    selectedCard,
    handleSelection,
    totalSubscribers,
    pendingBand,
    pendingVenue,
    modalHandler,
    modal,
    cardHandler,
  };
};

export default useDashboard;
