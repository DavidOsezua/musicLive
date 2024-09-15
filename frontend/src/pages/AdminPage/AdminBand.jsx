import React from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import { bandPageData } from "../../data/data";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";

const AdminBand = () => {
  return (
    <section className={` adminSection pageContainer`}>
      <TitleAndStatus
        title={`Bands`}
        buttonText={`Add band`}
        data={bandPageData}
      />

      <TablesAndCards pageData={bandPageData} pageType={`bands`} />
    </section>
  );
};

export default AdminBand;
