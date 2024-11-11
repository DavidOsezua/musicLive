import React, { useEffect, useState } from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import { genrePageData } from "../../data/data";
import Switch from "../../components/general/Switch";
import { api, Url } from "../../services/api.route";
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
  const [locationPageData, setLocationPageData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [totalApprove, setTotalApprove] = useState(0);
  const [trackChanges, settrackChanges] = useState(false);

  const getAllGenreData = async () => {
    try {
      const res = await api.get("/api/v1/genre");
      const genreData = res.data;
      let approvedCount = 0;

      const formattedData = genreData.map((genre) => {
        if (genre.is_admin_approved) {
          approvedCount++;
        }

        return {
          ID: genre.id,
          image: genre.image ? Url + "/" + genre.image : "",
          genreOrType: genre.name || "",
          status: genre.is_admin_approved ? "Approved" : "Inactive",
        };
      });
      setTotalData(genreData.length);
      setTotalApprove(approvedCount);
      setLocationPageData(formattedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllGenreData();
  }, [totalData, trackChanges]);

  let inactive = totalData - totalApprove;

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

  console.log(locationPageData);
  return (
    <section className={` adminSection pageContainer transition`}>
      <TitleAndStatus
        title={`Genre`}
        buttonText={`Add genre`}
        modalHandler={modalHandler}
        data={getAllGenre}
      />

      <TablesAndCards
        pageData={getAllGenre}
        pageType={`cardList`}
        musicType="genreType"
        from={`Genre`}
        setUserData={setLocationPageData}
        settrackChanges={settrackChanges}
        setTotalData={setTotalData}
        setTotalApprove={setTotalApprove}
      />
      {modal ? (
        <Modal modalHandler={modalHandler}>
          <AddGenre getAllGenreData={getAllGenreData} />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default AdminGenre;
