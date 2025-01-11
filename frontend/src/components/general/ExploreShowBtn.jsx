import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const ExploreShowBtn = () => {
  return (
    <div className="flex gap-2 w-full justify-center ">
      <Link to={"/bands"}>
        <Button
          text={"Explore bands"}
          width={`w-[236px]`}
          radius={`rounded-full`}
        />
      </Link>

      <Link to={"/venues"}>
        <Button
          text={"See venues"}
          width={`w-[236px]`}
          colored
          radius={`rounded-full`}
        />
      </Link>
    </div>
  );
};

export default ExploreShowBtn;
