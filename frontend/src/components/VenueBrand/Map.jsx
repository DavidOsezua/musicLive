import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from '@iconify/react';
import mapMarker from '@iconify/icons-mdi/map-marker';
import "./Map.css";

const apiKey = import.meta.env.REACT_APP_MAP_API_KEY;

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={mapMarker} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

const Map = ({ venues }) => {
  const [locations, setLocations] = useState([]);
  const [failedAddresses, setFailedAddresses] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState({ lat: 0, lng: 0 }); 

  const getLatLngFromAddress = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.length > 0) {
        const location = data[0];
        return { lat: parseFloat(location.lat), lng: parseFloat(location.lon), name: address };
      } else {
        console.error(`No results found for address: ${address}`);
      }
    } catch (error) {
      console.error(`Error fetching geocode data for ${address}: `, error);
    }
    return null;
  };

  useEffect(() => {
    const fetchLatLngs = async () => {
      const locationsData = [];
      const failedData = []; 
      for (const venue of venues) {
        const latLng = await getLatLngFromAddress(venue.address);
        if (latLng) {
          locationsData.push(latLng);
        } else {
          failedData.push(venue.address);
        }
      }
      setLocations(locationsData);
      setFailedAddresses(failedData);
      setLoading(false);
      
      // Calculate new center based on locations
      if (locationsData.length > 0) {
        const latSum = locationsData.reduce((sum, loc) => sum + loc.lat, 0);
        const lngSum = locationsData.reduce((sum, loc) => sum + loc.lng, 0);
        setCenter({ lat: latSum / locationsData.length, lng: lngSum / locationsData.length }); 
      }
    };

    if (venues.length > 0) {
      fetchLatLngs();
    }
    console.log("location data:",locations)
  }, [venues]);


  return (
    <div className="w-full h-full">
      {loading ? (
        <p>Loading venue locations...</p>
      ) : (
        <>
          {failedAddresses.length > 0 && (
            <div className="error-message">
              <p>The following addresses could not be located:</p>
              <ul>
                {failedAddresses.map((address, index) => (
                  <li key={index}>{address}</li>
                ))}
              </ul>
            </div>
          )}

          <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            center={center} 
            zoom={10}
            margin={[50, 50, 50, 50]}
          >
            {locations.map((loc, index) => (
              <LocationPin key={index} lat={loc.lat} lng={loc.lng} text={loc.name} />
            ))}
          </GoogleMapReact>
        </>
      )}
    </div>
  );
};

export default Map;
