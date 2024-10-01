import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import "./Map.css";
import {
  wine, resturant, Bar, night, outdoorStage, brewery
} from "../../assets";

const apiKey = import.meta.env.REACT_APP_MAP_API_KEY;

const LocationPin = ({ text, image }) => (
  <div className="pin">
    <img src={image || ''} className="pin-icon" alt="Venue icon" />
    <p className="pin-text">{text}</p>
  </div>
);

const Map = ({ venues }) => {
  const [locations, setLocations] = useState([]);
  const [failedAddresses, setFailedAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(2); // Default world zoom level
  const [bounds, setBounds] = useState(null); // Store bounds for fitBounds

  const getLatLngFromAddress = async (address, venue_type) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.length > 0) {
        const location = data[0];
        return {
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lon),
          name: address,
          image: venue_type === "Winery" ? wine :
            venue_type === "Resturant" ? resturant :
            venue_type === "Brewery" ? brewery :
            venue_type === "Bar" ? Bar :
            venue_type === "Night" ? night :
            venue_type === "Outdoor" ? outdoorStage : "",
        };
      } else {
        console.error(`No results found for address: ${address}`);
      }
    } catch (error) {
      console.error(`Error fetching geocode data for ${address}:`, error);
    }
    return null;
  };

  useEffect(() => {
    const fetchLatLngs = async () => {
      setLocations([]); // Clear locations on new venue data
      setFailedAddresses([]);
      setLoading(true);

      const locationsData = [];
      const failedData = [];

      for (const venue of venues) {
        const latLng = await getLatLngFromAddress(venue.address, venue.venue_type);
        if (latLng) {
          locationsData.push(latLng);
        } else {
          failedData.push(venue.address);
        }
      }

      setLocations(locationsData);
      setFailedAddresses(failedData);
      setLoading(false);

      // Calculate map bounds for all locations
      if (locationsData.length > 0) {
        const lats = locationsData.map(loc => loc.lat);
        const lngs = locationsData.map(loc => loc.lng);

        const northEast = { lat: Math.max(...lats), lng: Math.max(...lngs) };
        const southWest = { lat: Math.min(...lats), lng: Math.min(...lngs) };

        setBounds({ northEast, southWest });
        setCenter({
          lat: (northEast.lat + southWest.lat) / 2,
          lng: (northEast.lng + southWest.lng) / 2,
        });

        const zoomLevel = locationsData.length === 1 ? 10 : 5; 
        setZoom(zoomLevel);
      }
    };

    if (venues.length > 0) {
      fetchLatLngs();
    } else {
      setLocations([]);
      setLoading(true);
      setCenter({ lat: 0, lng: 0 });
      setZoom(2);
    }
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
            zoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
              if (bounds) {
                const googleBounds = new maps.LatLngBounds();
                googleBounds.extend(new maps.LatLng(bounds.northEast.lat, bounds.northEast.lng));
                googleBounds.extend(new maps.LatLng(bounds.southWest.lat, bounds.southWest.lng));
                map.fitBounds(googleBounds); // Fit all locations within the map
              }
            }}
          >
            {locations.map((loc, index) => (
              <LocationPin
                key={index}
                lat={loc.lat}
                lng={loc.lng}
                text={loc.name}
                image={loc.image}
              />
            ))}
          </GoogleMapReact>
        </>
      )}
    </div>
  );
};

export default Map;
