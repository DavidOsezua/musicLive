import React, { useEffect, useState } from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import { genrePageData } from "../../data/data";
import Switch from "../../components/general/Switch";
import { api, Url } from "../../services/api.route";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";

import Modal from "../../components/general/Modal";
import AddGenre from "../../components/Dashboard/AddGenre";
import { useModal } from "../../App";

const AdminGenre = () => {
  const { modal, modalHandler } = useModal() || {};
  const [locationPageData, setLocationPageData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [totalApprove, setTotalApprove] = useState(0);
  const [trackChanges, settrackChanges] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  const getAllGenreData = async (genre) => {
    try {
      const res = await api.get("/api/v1/genre");
      const genreData = res.data;

      // Custom sort order
      const sortOrder = [
        "Rock",
        "Country",
        "Jazz",
        "Blues",
        "Pop",
        "Acoustic",
        "Metal",
        "Dance",
        "Reggae",
        "Urban",
      ];

      // Sort the data based on the custom order
      genreData.sort((a, b) => {
        const indexA = sortOrder.indexOf(a.name);
        const indexB = sortOrder.indexOf(b.name);

        // If the name is not in the sortOrder array, place it at the end
        return (
          (indexA === -1 ? sortOrder.length : indexA) -
          (indexB === -1 ? sortOrder.length : indexB)
        );
      });

      let approvedCount = 0;

      console.log(genreData);

      const formattedData = genreData
        .map((genre) => {
          if (genre.is_admin_approved) {
            approvedCount++;
          }

          return {
            ID: genre.id,
            image: genre.image ? Url + "/" + genre.image : "",
            genreOrType: genre.name || "",
            status: genre.is_admin_approved ? "Approved" : "Inactive",
          };
        })
        .sort((a, b) => b.created_at - a.created_at);

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

  const allModalHandler = () => {
    modalHandler();
    setShowResultModal((prev) => !prev);
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
        <Modal modalHandler={allModalHandler}>
          <AddGenre
            cancel={allModalHandler}
            setShowResultModal={setShowResultModal}
            showResultModal={showResultModal}
            getAllGenreData={getAllGenreData}
          />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default AdminGenre;
