import React, { useState } from "react";
import TitleAndStatus from "../../components/Dashboard/TitleAndStatus";
import {  genrePageData } from "../../data/data";
import Switch from "../../components/general/Switch";
import SomeFunctionality from "../../components/SomeFunctionality";

const AdminGenre = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <section className={` adminSection adminContainer`}>
      <TitleAndStatus
        title={`Genre`}
        buttonText={`Add genre`}
        data={genrePageData}
      />

      <div>
        {isToggled ? <p>Active</p> : <p>Inactive</p>}
        <Switch isOn={isToggled} handleToggle={handleToggle} />
      </div>



      <SomeFunctionality/>
    </section>
  );
};

export default AdminGenre;
