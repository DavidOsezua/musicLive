import React from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import { adsPageData } from "../../data/data";
import TablesAndCards from "../../components/Dashboard/TablesAndCards";

const Ads = () => {
  return (
    <section className={` adminSection pageContainer`}>
      <TitleAndStatus
        title={`Ads`}
        buttonText={`Add Banner`}
        data={adsPageData}
      />

      <TablesAndCards pageData={adsPageData} pageType={`cardList`} />
    </section>
  );
};

export default Ads;
