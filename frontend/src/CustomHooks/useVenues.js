import { useModal } from "@/App";
import { api, Url } from "@/services/api.route";
import React, { useEffect, useState } from "react";

const useVenues = () => {
  const [locationPageData, setLocationPageData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [totalApprove, setTotalApprove] = useState(0);
  const [venueShowResultModal, setVenueShowResultModal] = useState(false);
  const [trackChanges, settrackVenueChanges] = useState(false);
  const { modal, modalHandler } = useModal() || {};

  const getAllUserVenueData = async () => {
    try {
      const res = await api.get("/api/v1/venue");
      const resultData = res.data.length;
      let approvedCount = 0;

      const formattedData = res.data.map((venue) => {
        if (venue.is_verified) {
          approvedCount += 1;
        }

        console.log(venue);
        return {
          ID: venue.id,
          image: venue.image1 ? Url + "/" + venue.image1 : "",
          image2: venue.image2 ? Url + "/" + venue.image2 : "",
          venueOrBandName: venue.name || "",
          genreOrType: venue.venue_type || "",
          changeStatus: ["Approve", "Pending", "Inactive"],
          address: venue.address || "",
          venueType: venue.venue_type || "",
          instagram: venue.instagram_url || "",
          homepage: venue.homepage || "",
          facebook: venue.facebook_url || "",
          youtube: venue.youtube_url || "",
          email: venue.email || "",
          status: venue.is_verified ? "Approved" : "Pending",
        };
      });
      setTotalData(resultData);
      setTotalApprove(approvedCount);
      setLocationPageData(formattedData);
      // setpending(totalBand - totalApprove)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUserVenueData();
    console.log("Updated locationPageData", locationPageData);
  }, [totalData, trackChanges]);

  let pending = totalData - totalApprove;

  const getuserVenueData = {
    statusData: [
      { status: "Total", numbers: totalData, colorID: "total" },
      { status: "Approve", numbers: totalApprove, colorID: "approve" },
      { status: "Pending", numbers: pending, colorID: "pending" },
      // { status: "Inactive", numbers: 0, colorID: "inactive" },
    ],
    status: ["All", "Approved", "Pending"],
    tableHead: [
      "ID",
      "Venue name/Type",
      "Address",
      "Email",
      "Date",
      "Time",
      "Status",
      "Actions",
    ],

    tableOrCardData: locationPageData,
    numberOfItem: 10,
  };

  const allModalHandlerVenue = () => {
    modalHandler();
    setVenueShowResultModal((prev) => !prev);
  };

  return {
    modalHandler,
    getuserVenueData,
    getAllUserVenueData,
    setLocationPageData,
    allModalHandlerVenue,
    setTotalData,
    setTotalApprove,
    settrackVenueChanges,
    setVenueShowResultModal,
    venueShowResultModal,
    modal,
  };
};

export default useVenues;
