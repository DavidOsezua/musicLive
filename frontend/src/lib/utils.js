import { Url } from "@/services/api.route";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



export const getLatLngFromAddress = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const info = data.at(0)

      if(!info) return null
      
      return {
            lat : Number(info.lat), 
            lng : Number(info.lon)
        }

    } catch (error) {
      console.log(error)
      return null
    
    }

  };

export const getFullImageUrl = (path) => {
  return `${Url}/${path}`
}