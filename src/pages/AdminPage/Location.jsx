import React from "react";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import { locationPageData } from "../../data/data";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";

const Location = () => {
  return (
    <section className={` adminSection pageContainer`}>
      <TitleAndStatus
        title={`Venue Location`}
        buttonText={`Add Location`}
        data={locationPageData}
      />

      <h2 className="text-[red] font-semibold ">! DATA NOT ADDED YET</h2>

      <TablesAndCards pageData={locationPageData} pageType={`venue`} />
    </section>
  );
};

export default Location;
