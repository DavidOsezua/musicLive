import GoogleMapReact from "google-map-react";

export const GoogleMap = ({ children, ...props }) => (
  
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_MAP_KEY,
      }}
      {...props}
    >
      {children}
    </GoogleMapReact>
  
);