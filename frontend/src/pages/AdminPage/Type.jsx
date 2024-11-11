import React from "react";
// import { typePageData } from "../../data/data";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import Modal from "../../components/general/Modal";
import AddType from "../../components/Dashboard/AddType";
import { useState, useEffect } from "react";
import { useModal } from "../../App";
import { api, Url } from "../../services/api.route";
import {
  wine,
  resturant,
  Bar,
  night,
  outdoorStage,
  brewery,
} from "../../assets";

const Type = () => {
  const { modal, modalHandler } = useModal() || {};
  const [typePageData, settypePageData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [totalApprove, setTotalApprove] = useState(0);
  const [trackChanges, settrackChanges] = useState(false);

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

  console.log(typePageData);

  return (
    <section className={` adminSection pageContainer transition`}>
      <TitleAndStatus
        title={`Venue Type`}
        buttonText={`Add Type`}
        modalHandler={modalHandler}
        data={venueFormData}
      />

      <TablesAndCards
        pageData={venueFormData}
        pageType={`cardList`}
        musicType="venueType"
        from={`Type`}
        setUserData={settypePageData}
        settrackChanges={settrackChanges}
        setTotalData={setTotalData}
        setTotalApprove={setTotalApprove}
      />
      {modal ? (
        <Modal modalHandler={modalHandler} component={""}>
          <AddType getAllVenueTypeData={getAllVenueTypeData} />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default Type;
