import React, { useEffect, useState } from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
// import { bandPageData } from "../../data/data";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import Modal from "../../components/general/Modal";
import AddBand from "../../components/Dashboard/AddBand";
import { useModal } from "../../App";

import { facebook, youtube, website, instagram } from "../../assets";
import { api, Url } from "../../services/api.route";
import dayjs from "dayjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConfirmDelete from "../../components/general/ConfirmDelete";
import Success from "@/components/general/Success";

const AdminBand = () => {
  const [locationPageData, setLocationPageData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [trackChanges, settrackChanges] = useState(false);
  const [totalApprove, setTotalApprove] = useState(0);
  // const [pending, setpending] = useState(0);
  const { modal, modalHandler } = useModal() || {};

  const getAllUserBandData = async () => {
    try {
      const res = await api.get("/api/v1/band");
      const resultData = res.data.length;
      console.log(res.data);

      let approvedCount = 0;

      const formattedData = res.data.map((band) => {
        if (band.is_verified) {
          approvedCount += 1;
        }

        return {
          ID: band.id,
          image: band.image1 ? Url + "/" + band.image1 : "",
          venueOrBandName: band.name || "",
          genreOrType: band.genre_type || "",
          socials: [website, facebook, instagram, youtube],
          changeStatus: ["Approve", "Pending", "Inactive"],
          email: band.email || "",
          date: band.venue_date
            ? dayjs(band.venue_date).format("DD MMM YYYY")
            : "",
          status: band.is_verified ? "Approved" : "Pending",
        };
      });

      setTotalApprove(approvedCount);
      setTotalData(resultData);
      setLocationPageData(formattedData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log("Updated locationPageData", locationPageData);
    // setpending(totalBand - approvedCount)
  }, [locationPageData]);

  let pending = totalData - totalApprove;

  const getuserBandData = {
    statusData: [
      { status: "Total", numbers: totalData, colorID: "total" },
      { status: "Approve", numbers: totalApprove, colorID: "approve" },
      { status: "Pending", numbers: pending, colorID: "pending" },
      // { status: "Inactive", numbers: 0, colorID: "inactive" },
    ],
    status: ["All", "Approved", "Pending", "Inactive"],
    tableHead: [
      "ID",
      "Band name/Genre",
      "Socials",
      "Email",
      "Date",
      "Status",
      "Actions",
    ],

    tableOrCardData: locationPageData,
    numberOfItem: 5,
  };

  useEffect(() => {
    getAllUserBandData();
    console.log("Updated locationPageData", locationPageData);
  }, [totalData, trackChanges]);

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
        setUserData={setLocationPageData}
        from={`Band`}
        setTotalData={setTotalData}
        setTotalApprove={setTotalApprove}
        settrackChanges={settrackChanges}
      />
      {modal ? (
        <Modal modalHandler={modalHandler}>
          <AddBand settrackChanges={settrackChanges} />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default AdminBand;
