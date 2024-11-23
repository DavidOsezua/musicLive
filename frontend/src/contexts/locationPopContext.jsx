import { api } from "@/services/api.route";

import { createContext, useState, useEffect } from "react";


export const LocationPopUpContext = createContext({})

export const LocationPopUpContextProvider = ({ children }) => {
  
    const [popUp, setPopup] = useState(false)
    const [events, setEvents] = useState([])
    const [venueId, setVenueId]  = useState(undefined)
    const [venueData, setVenueData] = useState({})
    const [loading, setLoading] = useState(false)
    

    useEffect(() => {
      // console.log(venueData)
      // return   
      if(!venueData) {
            setEvents([])
            return 
        }

        setLoading(true) 

        api.get(`/api/v1/events`, {
          params: { venue_id: venueData.id }, // Pass venue-specific params
        }).then((res) => {
            console.log(res.data)
            setEvents(res.data);
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        });

    }, [venueData])
  

  return (
    <LocationPopUpContext.Provider value={{popUp, setPopup, setVenueId, events, loading, venueData, setVenueData }}>
      {children}
    </LocationPopUpContext.Provider>
  );
};


