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
    console.error("Error uploading user venue form:", error);
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
        console.error("Error uploading user brand form:", error);
        throw error|| "An unexpected error occurred";
      }
}

export const getAlluserBand = async ()=>{
  try{
    const response = await api.get("/api/v1/band")
    console.log(response.data)
    return response.data
   
  }catch (error) {
    console.error("Error occur when getting the user band:", error);
    throw error|| "An unexpected error occurred";
  }
}



export const getAlluserVenue = async ()=>{
  try{
    const response = await api.get("/api/v1/venue")
    console.log(response.data)
    return response.data
   
  }catch (error) {
    console.error("Error occur when getting the user venue:", error);
    throw error|| "An unexpected error occurred";
  }
}



export const SubmitContactinfo = async (contactForm)=>{
  console.log(contactForm)
  try{
    const response = await api.post("/api/v1/contact", contactForm,
     
     {
       headers: {
        "Content-Type": "application/json",
      },
    }
    )
    console.log(response)
    return response

  }catch (error) {
    console.error("Error occur when submitting the form:", error);
    throw error|| "An unexpected error occurred";
  }
}



