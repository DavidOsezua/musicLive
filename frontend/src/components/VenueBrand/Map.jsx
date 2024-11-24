import React, { useEffect, useState, useRef, useContext } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import { Icon } from "@iconify/react";
import mapMarker from "@iconify/icons-mdi/map-marker";
// import "./Map.css";
import "./Map.css";
import { getVenueImage } from "@/venueImages";
import { LocationPin } from "../Map/LocationPin";
import { getFullImageUrl, getLatLngFromAddress } from "@/lib/utils";
import { LocationPopUpContext } from "@/contexts/locationPopContext";

const apiKey = import.meta.env.REACT_APP_MAP_API_KEY;

const defaultCenter = {
  lat: 38.56,
  lng: -121.62,
};



const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map = ({ venues }) => {
  const [locations, setLocations] = useState([]);
  const [failedAddresses, setFailedAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState(defaultCenter); // Default center
  const [zoom, setZoom] = useState(8);
  const [map, setMap] = useState(null);
  const {setVenueData, setPopup} = useContext(LocationPopUpContext)

  const handleLocationClicked = (e) => {
    
    
    // const lat = e.latLng.lat();
    // const lng = e.latLng.lng();
    // setZoom((zoom) => zoom + 1);
    // setCenter({ lat, lng });
  };

  useEffect(() => {
    // console.log(venues)
    Promise.all(
      venues.map(async (venue) => {
        const latLng = await getLatLngFromAddress(venue.address);
        if (!latLng) return null;
        console.log(latLng);
        return { ...latLng, ...venue };
      })
    ).then((parsed) => {
      const filtered = parsed.filter((parse) => parse != null);
      // console.log(parsed)
      setLocations(filtered);
    });
    //  console.log(parsed)
  }, [venues]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onZoomChanged={() => {
        if (!map) return;
        const newZoom = map.getZoom();
        setZoom(newZoom);
      }}
      onLoad={(mapInstance) => setMap(mapInstance)}
      // onLoad={onLoad}
      // onUnmount={onUnmount}
    >
      {locations.map((marker) => (
        <MarkerF
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{
            url: getVenueImage(marker.venue_type),
            scaledSize: new window.google.maps.Size(20, 20),
            labelOrigin: new window.google.maps.Point(45, 45),
          }}
          onClick={() => {
            setVenueData(marker)
            setPopup(true)
          }}
          // label={{color : "blue", text : marker.name, fontSize : "16px"}}
          title={marker.name}
        ></MarkerF>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
