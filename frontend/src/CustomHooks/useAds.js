import React, { useEffect, useState } from "react";
import { useModal } from "@/App";
import { api, Url } from "@/services/api.route";

const useAds = () => {
  const { modal, modalHandler } = useModal() || {};

  const [locationPageData, setLocationPageData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [totalApprove, setTotalApprove] = useState(0);
  const [trackChanges, settrackAdsChanges] = useState(false);
  const [AdsShowResultModal, setAdsShowResultModal] = useState(false);
  const getAlladsData = async () => {
    try {
      const res = await api.get("/api/v1/ads");
      const adsData = res.data;
      let totalAddsApproved = 0;
      const totalAdsData = res.data.map((ads) => {
        if (ads.is_admin_approved) {
          totalAddsApproved++;
        }
        return {
          ID: ads.id,
          image: ads.image ? Url + "/" + ads.image : "",
          status: ads.is_admin_approved ? "Approved" : "Inactive",
        };
      });
      setTotalData(adsData.length);
      setTotalApprove(totalAddsApproved);
      setLocationPageData(totalAdsData);
      console.log(adsData);
      console.log("SUCESSFULL");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAlladsData();
  }, [totalData, trackChanges]);

  let inactive = totalData - totalApprove;

  const adsPageData = {
    statusData: [
      { status: "Total", numbers: totalData, colorID: "total" },
      { status: "Approve", numbers: totalApprove, colorID: "approve" },
      { status: "Inactive", numbers: inactive, colorID: "inactive" },
    ],

    status: ["All", "Approved", "Inactive"],

    tableOrCardData: locationPageData,
    numberOfItem: 12,
    size: "ads",
  };

  const allAdsModalHandler = () => {
    modalHandler();
    setAdsShowResultModal((prev) => !prev);
  };
  return {
    modalHandler,
    modal,
    adsPageData,
    setLocationPageData,
    settrackAdsChanges,
    setTotalData,
    setTotalApprove,
    allAdsModalHandler,
    setAdsShowResultModal,
    AdsShowResultModal,
    getAlladsData,
  };
};

export default useAds;
