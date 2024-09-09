import React from "react";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import { locationPageData } from "../../data/data";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import Modal from "../../components/general/Modal";
import { useModal } from "../../Layout/AdminDashboardLayout";
import AddLocation from "../../components/Dashboard/AddLocation";

const Location = () => {
  const { modal, modalHandler } = useModal();
  return (
    <section className={` adminSection pageContainer `}>
      <TitleAndStatus
        title={`Venue Location`}
        buttonText={`Add Location`}
        modalHandler={modalHandler}
        data={locationPageData}
      />

      <TablesAndCards
        pageData={locationPageData}
        pageType={`venue`}
        columnCount={8}
      />
      {modal ? (
        <Modal modalHandler={modalHandler}>
          <AddLocation />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default Location;
