import React, { useContext, useState } from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import { genrePageData } from "../../data/data";
import Switch from "../../components/general/Switch";

import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import { useModal } from "../../Layout/AdminDashboardLayout";
import Modal from "../../components/general/Modal";
import AddGenre from "../../components/Dashboard/AddGenre";

const AdminGenre = () => {
  const { modal, modalHandler } = useModal();
  return (
    <section className={` adminSection pageContainer`}>
      <TitleAndStatus
        title={`Genre`}
        buttonText={`Add genre`}
        modalHandler={modalHandler}
        data={genrePageData}
      />

      <TablesAndCards pageData={genrePageData} pageType={`cardList`} />
      {modal ? (
        <Modal modalHandler={modalHandler}>
          <AddGenre />
        </Modal>
      ) : (
        ""
      )}
    </section>
  );
};

export default AdminGenre;
