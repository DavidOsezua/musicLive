import React, { useEffect,useState } from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
// import { bandPageData } from "../../data/data";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import { useModal } from "../../Layout/AdminDashboardLayout";
import Modal from "../../components/general/Modal";
import AddBand from "../../components/Dashboard/AddBand";
import { facebook,youtube,website,instagram } from "../../assets";
import { api, Url } from "../../services/api.route";
import dayjs from 'dayjs';
const AdminBand = () => {
  const [locationPageData, setLocationPageData] = useState([]);
  const [totalBand, setTotalBand] = useState(0)
  const [totalApprove, setTotalApprove] = useState(0)
  const [pending, setpending] = useState(0)
  const { modal, modalHandler } = useModal();

  const getAllUserBandData = async () => {
    try {
      const res = await api.get("/api/v1/band");
      setTotalBand(res.data.length);
      console.log(res.data);
  
      let approvedCount = 0; 
  
      const formattedData = res.data.map((band) => {
        if (band.is_verified) {
          approvedCount += 1; 
        }
  
        return {
          ID: band.id,
          image: band.image1 ? Url + '/' + band.image1 : "",
          venueOrBandName: band.name || "",
          genreOrType: band.genre_type || "",
          socials: [website, facebook, instagram, youtube],
          changeStatus: ["Approve", "Pending", "Inactive"],
          email: band.email || "",
          date: band.venue_date ? dayjs(band.venue_date).format('DD MMM YYYY') : "",
          status: band.is_verified ? "Approved" : "Pending"
        };
      });
  
      setTotalApprove(approvedCount); 
      setpending(totalBand - totalApprove)
      setLocationPageData(formattedData);
    } catch (err) {
      console.log(err);
      console.log("hi");
    }
  };
  useEffect(() => {
    console.log("Updated locationPageData", locationPageData);
    // setpending(totalBand - approvedCount)
  }, [locationPageData]);

  const getuserBandData = {
    statusData: [
      { status: "Total", numbers: totalBand, colorID: "total" },
      { status: "Approve", numbers: totalApprove, colorID: "approve" },
      { status: "Pending", numbers: pending, colorID: "pending" },
      { status: "Inactive", numbers: 0, colorID: "inactive" },
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

  useEffect(() => {
    getAllUserBandData();
    console.log("Updated locationPageData", locationPageData);
  }, [totalBand]);

  return (
    <section className={` adminSection pageContainer`}>
      <TitleAndStatus
        title={`Bands`}
        buttonText={`Add band`}
        modalHandler={modalHandler}
        data={getuserBandData}
      />

      

      <TablesAndCards
        pageData={getuserBandData}
        pageType={`bands`}
        columnCount={7}
        setUserData = {setLocationPageData}
        from={`Band`}
        totalBand={setTotalBand}
      />
      {modal ? (
        <Modal modalHandler={modalHandler}>
          <AddBand />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default AdminBand;
