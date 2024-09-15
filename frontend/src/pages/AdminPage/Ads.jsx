import React from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import { adsPageData } from "../../data/data";

const Ads = () => {
  return (
    <section className={` adminSection adminContainer`}>
      <TitleAndStatus
        title={`Ads`}
        buttonText={`Add Banner`}
        data={adsPageData}
      />
    </section>
  );
};

export default Ads;
