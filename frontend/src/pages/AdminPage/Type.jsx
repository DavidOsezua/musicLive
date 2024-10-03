import React from "react";
// import { typePageData } from "../../data/data";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import Modal from "../../components/general/Modal";
import AddType from "../../components/Dashboard/AddType";
import { useState, useEffect } from "react";
import { useModal } from "../../App";
import { api } from "../../services/api.route";
import {
  wine,
  resturant,
  Bar,
  night,
  outdoorStage,
  brewery
} from "../../assets";

const Type = () => {
  const { modal, modalHandler } = useModal() || {};
  const [locationPageData, setLocationPageData] = useState([])
  const [totalData, setTotalData] = useState(0)
  const [totalApprove, setTotalApprove] = useState(0)
  const [trackChanges, settrackChanges] = useState(false)

  const getAllVenueData = async () => {
    try {
      const res = await api.get("/api/v1/venue");
      const adsData = res.data;

      let approvedCount = 0;
      const uniqueVenueTypes = [];

      const formattedData = res.data.map((venue) => {
        if (true) {
          // uniqueVenueTypes.push(venue.venue_type);

          if (venue.is_admin_approved) {
            approvedCount++;
          }

          const image = venue.venue_type === "Winery" ? wine :
            venue.venue_type === "Resturant" ? resturant :
              venue.venue_type === "Brewery" ? brewery :
                venue.venue_type === "Bar" ? Bar :
                  venue.venue_type === "Night" ? night :
                    venue.venue_type === "Outdoor" ? outdoorStage : "";

          return {
            ID: venue.id,
            image: image,
            genreOrType: venue.venue_type || "",
            status: venue.is_admin_approved ? "Approved" : "Inactive"
          };
        }
        return null;
      }).filter(Boolean);
      setTotalData(adsData.length);
      setTotalApprove(approvedCount)
      setLocationPageData(formattedData)
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    getAllVenueData();
  }, [totalData, trackChanges]);

  let inactive = totalData - totalApprove

  const venueFormData = {
    statusData: [
      { status: "Total", numbers: totalData, colorID: "total" },
      { status: "Approve", numbers: totalApprove, colorID: "approve" },
      { status: "Inactive", numbers: inactive, colorID: "inactive" },
    ],

    status: ["All", "Approved", "Inactive"],

    tableOrCardData: locationPageData,
    numberOfItem: 12,
  };



  return (
    <section className={` adminSection pageContainer`}>
      <TitleAndStatus
        title={`Venue Type`}
        buttonText={`Add Type`}
        modalHandler={modalHandler}
        data={venueFormData}
      />

      <TablesAndCards pageData={venueFormData}
        pageType={`cardList`}
        musicType="venue"
        setUserData={setLocationPageData}
        settrackChanges={settrackChanges}
        setTotalData={setTotalData}
        setTotalApprove={setTotalApprove} />
      {modal ? (
        <Modal modalHandler={modalHandler} component={""}>
          <AddType />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default Type;
