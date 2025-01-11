import React, { useEffect, useState } from "react";
import { useModal } from "@/App";
import { api, Url } from "@/services/api.route";

const useType = () => {
  const { modal, modalHandler } = useModal() || {};
  const [typePageData, settypePageData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [totalApprove, setTotalApprove] = useState(0);
  const [trackChanges, settrackTypeChanges] = useState(false);
  const [TypeShowResultModal, setTypeShowResultModal] = useState(false);

  const getAllVenueTypeData = async () => {
    try {
      const res = await api.get("/api/v1/type");
      const venueTypesData = res.data;

      console.log(venueTypesData);

      let approvedCount = 0;

      const formattedData = venueTypesData.map((venue) => {
        if (venue.is_admin_approved) {
          approvedCount++;
        }

        return {
          ID: venue.id,
          image: venue.image ? `${Url}/${venue.image}` : "",
          genreOrType: venue.name || "",
          status: venue.is_admin_approved ? "Approved" : "Inactive",
        };
      });
      setTotalData(venueTypesData.length);
      setTotalApprove(approvedCount);
      settypePageData(formattedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllVenueTypeData();
  }, [totalData, trackChanges]);

  let inactive = totalData - totalApprove;

  const venueFormData = {
    statusData: [
      { status: "Total", numbers: totalData, colorID: "total" },
      { status: "Approve", numbers: totalApprove, colorID: "approve" },
      { status: "Inactive", numbers: inactive, colorID: "inactive" },
    ],

    status: ["All", "Approved", "Inactive"],

    tableOrCardData: typePageData,
    numberOfItem: 12,
  };

  const allTypeModalHandler = () => {
    modalHandler();
    setTypeShowResultModal((prev) => !prev);
  };

  console.log(typePageData);
  return {
    modalHandler,
    venueFormData,
    settypePageData,
    settrackTypeChanges,
    setTotalData,
    setTotalApprove,
    allTypeModalHandler,
    setTypeShowResultModal,
    TypeShowResultModal,
    getAllVenueTypeData,
    modal,
  };
};

export default useType;
