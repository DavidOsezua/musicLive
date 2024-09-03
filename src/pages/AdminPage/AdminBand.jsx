import React, { useEffect } from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import { bandPageData } from "../../data/data";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import { useModal } from "../../Layout/AdminDashboardLayout";
import Modal from "../../components/general/Modal";
import AddBand from "../../components/Dashboard/AddBand";

const AdminBand = () => {
  const { modal, modalHandler } = useModal();

  return (
    <section className={` adminSection pageContainer`}>
      <TitleAndStatus
        title={`Bands`}
        buttonText={`Add band`}
        modalHandler={modalHandler}
        data={bandPageData}
      />

      <h2 className="text-[red] font-semibold ">! DATA NOT ADDED YET</h2>

      <TablesAndCards pageData={bandPageData} pageType={`bands`} />
      {modal ? (
        <Modal modalHandler={modalHandler}>
          <AddBand />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default AdminBand;
