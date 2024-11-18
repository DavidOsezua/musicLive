// Corrected import
import { api } from "../../services/api.route";

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
    throw error || "An unexpected error occurred";
  }
};

export const uploadAdsimage = async (image) => {
  try {
    const response = await api.post("/api/v1/ads", image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading user venue form:", error);
    throw error || "An unexpected error occurred";
  }
};

export const uploadUserbrand = async (formData) => {
  try {
    const response = await api.post("/api/v1/band", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading user brand form:", error);
    throw error || "An unexpected error occurred";
  }
};

export const createEvent = async (formData) => {
  try {
    const response = await api.post("/api/v1/events", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error || "An unexpected error occured";
  }
};


// export const edit

// export const saveUserbrand = async (formData) => {
//   try {
//     const response = await api.put(`/api/v1/band/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error uploading user brand form:", error);
//     throw error || "An unexpected error occurred";
//   }
// };

export const SubmitContactinfo = async (contactForm) => {
  console.log(contactForm);
  try {
    const response = await api.post(
      "/api/v1/contact",
      contactForm,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error occur when submitting the form:", error);
    throw error || "An unexpected error occurred";
  }
};
