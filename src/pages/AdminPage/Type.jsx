import React from "react";
import { typePageData } from "../../data/data";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import { useModal } from "../../Layout/AdminDashboardLayout";
import Modal from "../../components/general/Modal";
import AddType from "../../components/Dashboard/AddType";

const Type = () => {
  const { modal, modalHandler } = useModal();
  return (
    <section className={` adminSection pageContainer`}>
      <TitleAndStatus
        title={`Venue Type`}
        buttonText={`Add Type`}
        modalHandler={modalHandler}
        data={typePageData}
      />

      <TablesAndCards pageData={typePageData} pageType={`cardList`} />
      {modal ? (
        <Modal modalHandler={modalHandler} component={""}>
          <AddType />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default Type;
