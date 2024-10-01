import React, { useEffect, useState } from "react";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import Modal from "../../components/general/Modal";
import AddLocation from "../../components/Dashboard/AddLocation";
import { api, Url } from "../../services/api.route";
import dayjs from 'dayjs';
import { useModal } from "../../App";

const Location = () => {
  const [locationPageData, setLocationPageData] = useState([]);
  const [totalData, setTotalData] = useState(0)
  const [totalApprove, setTotalApprove] = useState(0)
  // const [pending, setpending] = useState(0)
  const [trackChanges, settrackChanges] = useState(false)
  const { modal, modalHandler } = useModal();

  const getAllUserVenueData = async () => {
    try {
      const res = await api.get("/api/v1/venue");
      const resultData = res.data.length;
      let approvedCount = 0; 
  
      const formattedData = res.data.map((venue) => {
        if (venue.is_verified) {
          approvedCount += 1; 
        }
        return {
        ID: venue.id,
        image: venue.image1 ? Url +'/'+ venue.image1 : "",
        venueOrBandName: venue.name || "",
        genreOrType: venue.genre_type || "",
        changeStatus: ["Approve", "Pending", "Inactive"],
        address: venue.address || "",
        email: venue.email || "",
        date: dayjs(venue.venue_date).format('DD MMM YYYY') || "",
        time: dayjs(venue.venue_time, 'HH:mm:ss').format('h:mm A') || "",
        status: venue.is_verified ? "Approved" : "Pending"
      };
    });
    setTotalData(resultData)
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
  }, [totalData,trackChanges]);

  
 let pending = totalData - totalApprove


  const getuserVenueData = {
    statusData: [
      { status: "Total", numbers: totalData, colorID: "total" },
      { status: "Approve", numbers: totalApprove, colorID: "approve" },
      { status: "Pending", numbers: pending, colorID: "pending" },
      // { status: "Inactive", numbers: 0, colorID: "inactive" },
    ],
    status: ["All", "Approved", "Pending", "Inactive"],
    tableHead: [
      "ID",
      "Venue name/Genre",
      "Address",
      "Email",
      "Date",
      "Time",
      "Status",
      "Actions",
    ],
    
    tableOrCardData: locationPageData,
    numberOfItem: 5,
  };

  return (
    <section className={`adminSection pageContainer`}>
      <TitleAndStatus
        title={`Venue Location`}
        buttonText={`Add Location`}
        modalHandler={modalHandler}
        data={getuserVenueData}
      />

      <TablesAndCards
        pageData={getuserVenueData}
        pageType={`venue`}
        columnCount={8}
        setUserData = {setLocationPageData}
        setTotalData={setTotalData}
        setTotalApprove={setTotalApprove}
        settrackChanges = {settrackChanges}
        // setpending = {setpending}
        from = {`venue`}
      />
      {modal ? (
        <Modal modalHandler={modalHandler}>
          <AddLocation settrackChanges={settrackChanges}/>
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default Location;
