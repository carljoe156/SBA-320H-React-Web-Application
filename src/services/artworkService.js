// import axios from "axios";

// // API base URL
// const API_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

// // Function to fetch object IDs (this will be used for the homepage display)
// export const fetchObjectIDs = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/objects`);
//     return response.data.objectIDs; // Array of object IDs
//   } catch (error) {
//     console.error("Error fetching object IDs", error);
//     throw error;
//   }
// };

// // Function to fetch details for a specific object by its ID
// export const fetchObjectDetails = async (objectId) => {
//   try {
//     const response = await axios.get(`${API_URL}/objects/${objectId}`);
//     return response.data; // Detailed data for a specific object
//   } catch (error) {
//     console.error("Error fetching object details", error);
//     throw error;
//   }
// };
// export default fetchObjectIDs;

export const fetchObjectIDs = async () => {
  try {
    const response = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/objects"
    );
    const data = await response.json();
    return data.objectIDs || [];
  } catch (error) {
    console.error("Error fetching object IDs:", error);
    return [];
  }
};

export const fetchObjectDetails = async (objectID) => {
  try {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching object details:", error);
    return null;
  }
};
