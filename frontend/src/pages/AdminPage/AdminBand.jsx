import React, { useEffect, useState } from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import Modal from "../../components/general/Modal";
import AddBand from "../../components/Dashboard/AddBand";
import { useModal } from "@/App";
import useBands from "@/CustomHooks/useBands";

const AdminBand = () => {
  const {
    getuserBandData,
    setLocationPageData,
    setTotalData,
    setTotalApprove,
    settrackChanges,
    setShowResultModal,
    modal,
    modalHandler,
    allModalHandler,
  } = useBands();

  // const { modal, modalHandler } = useModal() || {};

  // const allModalHandler = () => {
  //   modalHandler();
  //   setShowResultModal((prev) => !prev);
  // };

  console.log(modal, modalHandler);

  return (
    <section className={` adminSection pageContainer transition`}>
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
        musicType={"band"}
        setTotalData={setTotalData}
        setTotalApprove={setTotalApprove}
        settrackChanges={settrackChanges}
      />
      {modal ? (
        <Modal modalHandler={allModalHandler}>
          <AddBand cancel={allModalHandler} />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default AdminBand;
