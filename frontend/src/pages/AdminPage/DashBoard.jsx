import React from "react";
import styles from "./DashBoard.module.css";
import { dashboardSummary } from "../../data/data";
import Button from "../../components/general/Button";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import CsvRecent from "../../components/Dashboard/CsvRecent";
import Mail from "../../components/SVGcomponent/Mail";

const DashBoard = () => {
  return (
    <section
      className={`${styles.dashboardSection} adminSection adminContainer`}
    >
      <div className={`${styles.dashboardSummary}`}>
        {dashboardSummary.map((summary) => (
          <DashboardCard key={``} summary={summary} />
        ))}
      </div>

      <div className={`${styles.emailCard}`}>
        <div className={`${styles.emailcontainer}`}>
          <div className="flex justify-between items-center">
            <h3>Email Subscriber</h3>
            <Mail />
          </div>

          <div className="flex items-center gap-2">
            <p className="text-[2rem] font-semibold">5000</p>
            <p className="text-[#437CF3]">+30</p>
            <p className="text-[#437CF3]">New</p>
          </div>

          <div className="flex gap-3 w-full">
            <Button
              text={`Export Email`}
              width={`w-full`}
              radius={`rounded-[5px]`}
            />
            <Button
              colored
              text={`See Details`}
              width={`w-full`}
              radius={`rounded-[5px]`}
            />
          </div>
        </div>

        <div className={`${styles.csvRecent}`}>
          <h3>CSV</h3>
          <CsvRecent title={`Bands`} buttonText={`Export File`} />
          <CsvRecent title={`Venue`} buttonText={`Export File`} />
        </div>

        <div className={`${styles.csvRecent}`}>
          <h3>Recents</h3>
          <CsvRecent
            title={`Bands`}
            buttonText={`Send Details`}
            numberOfRequests={`+42 new request`}
          />
          <CsvRecent
            title={`Venue`}
            buttonText={`Send Details`}
            numberOfRequests={`+42 new request`}
          />
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
