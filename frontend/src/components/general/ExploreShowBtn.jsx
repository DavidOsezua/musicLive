import React from "react";
import Button from "./Button";

const ExploreShowBtn = () => {
  return (
    <div className="flex gap-2 w-full justify-center ">
      <Button
        text={"Explore bands"}
        width={`w-[236px]`}
        radius={`rounded-full`}
      />
      <Button
        text={"See venues"}
        width={`w-[236px]`}
        colored
        radius={`rounded-full`}
      />
    </div>
  );
};

export default ExploreShowBtn;
