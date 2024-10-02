import React, { useEffect, useState } from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
// import { adsPageData } from "../../data/data";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import Modal from "../../components/general/Modal";
import AddAds from "../../components/Dashboard/AddAds";

import { Url, api } from "@/services/api.route";
import { useModal } from "@/App";

const Ads = () => {
  const { modal, modalHandler } = useModal() || {};

  const [locationPageData, setLocationPageData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [totalApprove, setTotalApprove] = useState(0);
  const [trackChanges, settrackChanges] = useState(false);
  const getAlladsData = async () => {
    try {
      const res = await api.get("/api/v1/ads");
      const adsData = res.data;
      let totalAddsApproved = 0;
      const totalAdsData = res.data.map((ads) => {
        if (ads.is_admin_approved) {
          totalAddsApproved++;
        }
        return {
          ID: ads.id,
          image: ads.image ? Url + "/" + ads.image : "",
          status: ads.is_admin_approved ? "Approved" : "Inactive",
        };
      });
      setTotalData(adsData.length);
      setTotalApprove(totalAddsApproved);
      setLocationPageData(totalAdsData);
      console.log("SUCESSFULL");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAlladsData();
  }, [totalData, trackChanges]);

  let inactive = totalData - totalApprove;

  const adsPageData = {
    statusData: [
      { status: "Total", numbers: totalData, colorID: "total" },
      { status: "Approve", numbers: totalApprove, colorID: "approve" },
      { status: "Inactive", numbers: inactive, colorID: "inactive" },
    ],

    status: ["All", "Approved", "Inactive"],

    tableOrCardData: locationPageData,
    numberOfItem: 12,
    size: "ads",
  };

  return (
    <section className={` adminSection pageContainer`}>
      <TitleAndStatus
        title={`Ads`}
        buttonText={`Add Banner`}
        modalHandler={modalHandler}
        data={adsPageData}
      />

      <TablesAndCards
        pageData={adsPageData}
        pageType={`cardList`}
        musicType={`ads`}
        from={`ads`}
        setUserData={setLocationPageData}
        settrackChanges={settrackChanges}
        setTotalData={setTotalData}
        setTotalApprove={setTotalApprove}
      />
      {modal ? (
        <Modal modalHandler={modalHandler}>
          <AddAds />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default Ads;
