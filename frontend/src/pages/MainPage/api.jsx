// Corrected import
import {api} from "../../service/api.route"

export const uploadUservenue = async (formData) => {
  try {
    const response = await api.post("/api/v1/venue", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading profile images:", error);
    throw error|| "An unexpected error occurred";
  }
};


export const uploadUserbrand = async (formData)=>{
    try {
        const response = await api.post("/api/v1/band", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
    
        return response.data;
      } catch (error) {
        console.error("Error uploading profile images:", error);
        throw error|| "An unexpected error occurred";
      }
}

export const getAlluserBand = async ()=>{
  try{
    const response = await api.get("/api/v1/band")
    console.log(response.data)
    return response.data
   
  }catch (error) {
    console.error("Error uploading profile images:", error);
    throw error|| "An unexpected error occurred";
  }
}



export const getAlluserVenue = async ()=>{
  try{
    const response = await api.get("/api/v1/venue")
    console.log(response.data)
    return response.data
   
  }catch (error) {
    console.error("Error uploading profile images:", error);
    throw error|| "An unexpected error occurred";
  }
}



