import React from "react";
import GoogleMapReact from "google-map-react";

const Map = () => {
  return (
    <div className="w-full h-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCHCIgRRoiy6hdZYC-9zjRsgaSYPUnwEz8" }}
        defaultCenter={{ lat: 46.195042108660154, lng: 25.136718750000004 }}
        center={{ lat: 46.195042108660154, lng: 25.136718750000004 }}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
