import React, { useEffect, useState } from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import { genrePageData } from "../../data/data";
import Switch from "../../components/general/Switch";
import { api} from "../../services/api.route";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";

import Modal from "../../components/general/Modal";
import AddGenre from "../../components/Dashboard/AddGenre";
import { useModal } from "../../App";
import {
  Acoustic,
  blues,
  country,
  dance,
  jazz,
  metal,
  pop,
  raggae,
  rock,
  urban,

} from "../../assets";

const AdminGenre = () => {
    const { modal, modalHandler } = useModal();

    const [approve, setApproved] = useState(0)
    const [inactive, setinactive] = useState(0)
    const [totalVenueType, settotalVenueType] = useState(0)
    const [totalVenueData, settotalVenueData] = useState()
    const [venue_type_exist, setVenueTypeExist] = useState([]);
    const getAllBandData = async () => {
      try {
        const res = await api.get("/api/v1/band"); // Check API response
    
        let approvedCount = 0;
        const uniqueVenueTypes = [];
  
        const formattedData = res.data.map((band) => {
          if (!uniqueVenueTypes.includes(band.genre_type)) {
            uniqueVenueTypes.push(band.genre_type);
    
            if (band.is_admin_approved) {
              approvedCount += 1;
            }
    
            const image = band.genre_type === "Rock" ? rock :
                          band.genre_type === "Jazz" ? jazz :
                          band.genre_type === "Blues" ? blues :
                          band.genre_type === "Pop" ? pop :
                          band.genre_type === "Urban" ? urban :
                          band.genre_type === "Acoustic" ? Acoustic :
                          band.genre_type === "Raggae" ? raggae :
                          band.genre_type === "Country" ? country :
                          band.genre_type === "Metal" ? metal :
                          band.genre_type === "Dance" ? dance : "";
    
            return {
              ID: band.id,
              image: image,
              genreOrType: band.genre_type || "",
              status: band.is_admin_approved ? "Approved" : "Inactive"
            };
          }
          return null; // Return null for duplicate entries
        }).filter(Boolean); // Remove null entries
        setVenueTypeExist(uniqueVenueTypes); 
        const totalVenueType = uniqueVenueTypes.length;
        settotalVenueType(totalVenueType);
        setApproved(approvedCount);
        setinactive(totalVenueType - approvedCount); 
        settotalVenueData(formattedData);
        console.log("Approved Count:", approvedCount);
        console.log("Total Venue Type:", totalVenueType);
        console.log("Total Venue Data:", formattedData);
      } catch (err) {
        console.log(err);
      }
    };




   useEffect(() => {
      getAllBandData();
      console.log("Updated locationPageData", totalVenueData);
    }, [totalVenueType,approve]);



  const getAllGenre = {
    statusData: [
      { status: "Total", numbers: totalVenueType, colorID: "total" },
      { status: "Approve", numbers: approve, colorID: "approve" },
      { status: "Inactive", numbers: inactive, colorID: "inactive" },
    ],
  
    status: ["All", "Approved", "Inactive"],
  
    tableOrCardData: totalVenueData,
    numberOfItem: 12,
    size: "genre",
  };
  return (
    <section className={` adminSection pageContainer`}>
      <TitleAndStatus
        title={`Genre`}
        buttonText={`Add genre`}
        modalHandler={modalHandler}
        data={getAllGenre}
      />

      <TablesAndCards pageData={getAllGenre} pageType={`cardList`} musicType="genre" 
                              totalVenueType= {totalVenueType} setApproved={setApproved}
                            setinactive={setinactive} 
                          settotalVenueType ={settotalVenueType}/>
      {modal ? (
        <Modal modalHandler={modalHandler}>
          <AddGenre />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default AdminGenre;
