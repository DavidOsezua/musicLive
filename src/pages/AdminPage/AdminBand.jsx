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

      <h2 className="text-[red] font-semibold ">! DATA NOT ADDED YET</h2>

      <TablesAndCards pageData={bandPageData} pageType={`bands`} />
    </section>
  );
};

export default AdminBand;
