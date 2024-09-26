import React from "react";
// import { typePageData } from "../../data/data";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import Modal from "../../components/general/Modal";
import AddType from "../../components/Dashboard/AddType";
import { useState,useEffect} from "react";
import { useModal } from "../../App";
import { api} from "../../services/api.route";
import {
  wine,
  resturant,
  Bar,
  night,
  outdoorStage,
  brewery
} from "../../assets";

const Type = () => {
  const { modal, modalHandler } = useModal();
  const [approve, setApproved] = useState(0)
  const [inactive, setinactive] = useState(0)
  const [totalVenueType, settotalVenueType] = useState(0)
  const [totalVenueData, settotalVenueData] = useState()
  const [venue_type_exist, setVenueTypeExist] = useState([]);

  const getAllVenueData = async () => {
    try {
      const res = await api.get("/api/v1/venue");
      console.log(res.data); // Check API response
  
      let approvedCount = 0;
      const uniqueVenueTypes = [];

      const formattedData = res.data.map((venue) => {
        if (!uniqueVenueTypes.includes(venue.venue_type)) {
          uniqueVenueTypes.push(venue.venue_type);
  
          if (venue.is_admin_approved) {
            approvedCount += 1;
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
        getAllVenueData();
        console.log("Updated locationPageData", totalVenueData);
      }, [totalVenueType]);

  const venueFormData = {
    statusData: [
      { status: "Total", numbers:totalVenueType , colorID: "total" },
      { status: "Approve", numbers: approve, colorID: "approve" },
      { status: "Inactive", numbers: inactive, colorID: "inactive" },
    ],
  
    status: ["All", "Approved", "Inactive"],
  
    tableOrCardData:totalVenueData,
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

      <TablesAndCards pageData={venueFormData} pageType={`cardList`} musicType="venue" totalVenueType= {totalVenueType}
       setApproved={setApproved} setinactive={setinactive} settotalVenueType={settotalVenueType} />
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
