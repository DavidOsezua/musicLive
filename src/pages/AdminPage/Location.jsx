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
    <section className={` adminSection pageContainer`}>
      <TitleAndStatus
        title={`Venue Location`}
        buttonText={`Add Location`}
        modalHandler={modalHandler}
        data={locationPageData}
      />
      <h2 className="text-[red] font-semibold ">! DATA NOT ADDED YET</h2>
      <TablesAndCards pageData={locationPageData} pageType={`venue`} />
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
