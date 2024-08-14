// import React from "react";
// import "./Map.css";
// import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

// export default function Map() {
//   return (
//     <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={[51.505, -0.09]}>
//         <Popup>This is a popup</Popup>
//       </Marker>
//     </MapContainer>
//   );
// }

import React from "react";
import GoogleMapReact from "google-map-react";

const Map = () => {
  return (
    <div className="w-full h-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={{ lat: 46.195042108660154, lng: 25.136718750000004 }}
        center={{ lat: 46.195042108660154, lng: 25.136718750000004 }}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
