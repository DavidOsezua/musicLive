import React, { useEffect } from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import { bandPageData } from "../../data/data";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import Modal from "../../components/general/Modal";
import AddBand from "../../components/Dashboard/AddBand";
import { useModal } from "../../App";

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

      

      <TablesAndCards
        pageData={bandPageData}
        pageType={`bands`}
        columnCount={7}
      />
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
