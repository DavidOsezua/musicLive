import React from "react";
import { typePageData } from "../../data/data";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";

const Type = () => {
  return (
    <section className={` adminSection pageContainer`}>
      <TitleAndStatus
        title={`Venue Type`}
        buttonText={`Add Type`}
        data={typePageData}
      />

      <h2 className="text-[red] font-semibold ">! DATA NOT ADDED YET</h2>

      <TablesAndCards pageData={typePageData} pageType={`cardList`} />
    </section>
  );
};

export default Type;
