import React, { useEffect, useState } from "react";

import { useModal } from "@/App";
import { api, Url } from "@/services/api.route";
import { facebook, instagram, youtube } from "@/assets";

const useBands = () => {
  const [locationPageData, setLocationPageData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [trackChanges, settrackChanges] = useState(false);
  const [totalApprove, setTotalApprove] = useState(0);
  const { modal, modalHandler } = useModal() || {};
  const [showResultModal, setShowResultModal] = useState(false);

  const getAllUserBandData = async () => {
    try {
      const res = await api.get("/api/v1/band");
      const resultData = res.data.length;
      console.log(res.data);

      let approvedCount = 0;

      const formattedData = res.data.map((band) => {
        if (band.is_admin_approved) {
          approvedCount += 1;
        }

        console.log(band);

        return {
          ID: band.id,
          image1: band.image1 ? Url + "/" + band.image1 : "",
          image2: band.image2 ? Url + "/" + band.image2 : "",
          bandTag: band.band_tag,
          venueOrBandName: band.name || "",
          genreOrType: band.genre_type || "",
          socials: [band.homepage, facebook, instagram, youtube],
          changeStatus: ["Approve", "Pending"],
          email: band.email || "",
          facebook: band.facebook_url || "",
          youtube: band.youtube_url || "",
          instagram: band.instagram_url || "",
          homepage: band.homepage || "",
          date: band.venue_date
            ? dayjs(band.venue_date).format("DD MMM YYYY")
            : "",
          status: band.is_admin_approved ? "Approved" : "Pending",
        };
      });

      setTotalApprove(approvedCount);
      setTotalData(resultData);
      setLocationPageData(formattedData);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   console.log("Updated locationPageData", locationPageData);
  //   // setpending(totalBand - approvedCount)
  // }, [locationPageData]);

  let pending = totalData - totalApprove;

  const getuserBandData = {
    statusData: [
      { status: "Total", numbers: totalData, colorID: "total" },
      { status: "Approve", numbers: totalApprove, colorID: "approve" },
      { status: "Pending", numbers: pending, colorID: "pending" },
      // { status: "Inactive", numbers: 0, colorID: "inactive" },
    ],
    status: ["All", "Approved", "Pending"],
    tableHead: [
      "ID",
      "Band name/Genre",
      "Socials",
      "Email",
      "Date",
      "Status",
      "Actions",
    ],

    tableOrCardData: locationPageData,
    numberOfItem: 10,
  };

  useEffect(() => {
    getAllUserBandData();
    console.log("Updated locationPageData", locationPageData);
  }, [totalData, trackChanges]);

  const allModalHandler = () => {
    modalHandler();
    setShowResultModal((prev) => !prev);
  };
  return {
    getuserBandData,
    setLocationPageData,
    setTotalData,
    setTotalApprove,
    settrackChanges,
    allModalHandler,
    setShowResultModal,
    showResultModal,
    modal,
    modalHandler,
    getAllUserBandData,
  };
};

export default useBands;
