import React, { useEffect, useState } from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import { genrePageData } from "../../data/data";
import Switch from "../../components/general/Switch";
import { api } from "../../services/api.route";
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
  const { modal, modalHandler } = useModal() || {};
  const [locationPageData, setLocationPageData] = useState([])
  const [totalData, setTotalData] = useState(0)
  const [totalApprove, setTotalApprove] = useState(0)
  const [trackChanges, settrackChanges] = useState(false)


  const getAllBandData = async () => {
    try {
      const res = await api.get("/api/v1/band"); 
      const adsData = res.data;
      let approvedCount = 0;
      const uniqueTypes = [];

      const formattedData = res.data
        .map((band) => {
          if (!uniqueTypes.includes(band.genre_type)) {
            uniqueTypes.push(band.genre_type);

            if (band.is_admin_approved) {
              approvedCount++;
            }

            const image =
              band.genre_type === "Rock"
                ? rock
                : band.genre_type === "Jazz"
                ? jazz
                : band.genre_type === "Blues"
                ? blues
                : band.genre_type === "Pop"
                ? pop
                : band.genre_type === "Urban"
                ? urban
                : band.genre_type === "Acoustic"
                ? Acoustic
                : band.genre_type === "Raggae"
                ? raggae
                : band.genre_type === "Country"
                ? country
                : band.genre_type === "Metal"
                ? metal
                : band.genre_type === "Dance"
                ? dance
                : "";

            return {
              ID: band.id,
              image: image,
              genreOrType: band.genre_type || "",
              status: band.is_admin_approved ? "Approved" : "Inactive",
            };
          }
          return null; // Return null for duplicate entries
        })
        .filter(Boolean); // Remove null entries
        setTotalData(adsData.length);
        setTotalApprove(approvedCount)
        setLocationPageData(formattedData)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllBandData();
  }, [totalData,trackChanges]);



  let inactive = totalData - totalApprove

  const getAllGenre = {
    statusData: [
      { status: "Total", numbers: totalData, colorID: "total" },
      { status: "Approve", numbers: totalApprove, colorID: "approve" },
      { status: "Inactive", numbers: inactive, colorID: "inactive" },
    ],

    status: ["All", "Approved", "Inactive"],

    tableOrCardData: locationPageData,
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

      <TablesAndCards
        pageData={getAllGenre}
        pageType={`cardList`}
        musicType="genre"
        setUserData={setLocationPageData}
        settrackChanges = {settrackChanges}
        setTotalData={setTotalData}
        setTotalApprove={setTotalApprove}
      />
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
