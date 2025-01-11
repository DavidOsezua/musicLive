import React, { useEffect, useState } from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import Modal from "../../components/general/Modal";
import AddAds from "../../components/Dashboard/AddAds";
import useAds from "@/CustomHooks/useAds";

const Ads = () => {
  const {
    modalHandler,
    modal,
    adsPageData,
    setLocationPageData,
    settrackAdsChanges,
    setTotalData,
    setTotalApprove,
    allAdsModalHandler,
    setAdsShowResultModal,
    AdsShowResultModal,
    getAlladsData,
  } = useAds();

  return (
    <section className={` adminSection pageContainer transition`}>
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
        settrackChanges={settrackAdsChanges}
        setTotalData={setTotalData}
        setTotalApprove={setTotalApprove}
      />
      {modal ? (
        <Modal modalHandler={allAdsModalHandler}>
          <AddAds
            cancel={allAdsModalHandler}
            setShowResultModal={setAdsShowResultModal}
            ShowResultModal={AdsShowResultModal}
            getAllData={getAlladsData}
          />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default Ads;
