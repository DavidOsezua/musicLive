import React from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import { adsPageData } from "../../data/data";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import Modal from "../../components/general/Modal";
import { useModal } from "../../Layout/AdminDashboardLayout";
import AddAds from "../../components/Dashboard/AddAds";

const Ads = () => {
  const { modal, modalHandler } = useModal();
  return (
    <section className={` adminSection pageContainer`}>
      <TitleAndStatus
        title={`Ads`}
        buttonText={`Add Banner`}
        modalHandler={modalHandler}
        data={adsPageData}
      />

      <TablesAndCards pageData={adsPageData} pageType={`cardList`} />
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
