import React, { useState } from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import { genrePageData } from "../../data/data";
import Switch from "../../components/general/Switch";
import SomeFunctionality from "../../components/SomeFunctionality";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";

const AdminGenre = () => {


  return (
    <section className={` adminSection pageContainer`}>
      <TitleAndStatus
        title={`Genre`}
        buttonText={`Add genre`}
        data={genrePageData}
      />

      <TablesAndCards pageData={genrePageData} pageType={`cardList`} />


      {/* <SomeFunctionality /> */}
    </section>
  );
};

export default AdminGenre;
