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
      `https://collectionapi.metmuseum.org/public/collection/v1/objects`
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
    // return {
    //   title: data.title,
    //   artist: data.artistDisplayName,
    //   objectDate: data.objectDate,
    //   primaryImage: data.primaryImage,
    //   description: data.objectDescription, // Assuming you want this data
    //   dimensions: data.dimensions, // Add dimensions if available
    // };
  } catch (error) {
    console.error("Error fetching object details:", error);
    return null;
  }
};

// Fetching departments from the Metropolitan Museum of Art API
// export const fetchDepartments = async () => {
//   try {
//     const response = await fetch(
//       "https://collectionapi.metmuseum.org/public/collection/v1/departments"
//     );
//     if (!response.ok) {
//       throw new Error("Failed to fetch departments");
//     }
//     const data = await response.json();
//     return data.departments; // Assuming 'departments' is the key containing the department data
//   } catch (error) {
//     console.error("Error fetching departments:", error);
//     throw error; // Rethrow error so that the caller can handle it
//   }
// };

// Fetching departments from the Metropolitan Museum of Art API.
export const fetchDepartments = async () => {
  try {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/departments`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    const data = await response.json();
    return data.departments;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

// Fetch artworks by department ID and then fetch full details for each artwork., I would need CORS enabled to make it possible, so I bypassed CORS by making the GET request simplified.
export const fetchArtworksByDepartment = async (
  departmentId,
  page = 1,
  limit = 20,
  artist = "",
  timePeriod = ""
) => {
  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${departmentId}&q=${artist}&dateBegin=${timePeriod}&hasImages=true&limit=${limit}&page=${page}`
  );
  const data = await response.json();
  return data.objectIDs; // These are the IDs of artworks in the department
};

//w.I.P (Can probably create a new page for department details for this purpose)
export const fetchArtworkDetails = async (objectId) => {
  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?isPublicDomain=true&hasImages=true`
  );
  const data = await response.json();
  return data;
};

// This would work with CORS enabled.
//     const artworksPromises = objectIDs.map(async (objectID) => {
//       const artworkResponse = await fetch(
//         `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
//       );
//       if (!artworkResponse.ok) {
//         throw new Error(`Failed to fetch artwork with objectID ${objectID}`);
//       }
//       const artworkData = await artworkResponse.json();
//       return artworkData; // Return the full details of each artwork
//     });

//     // Wait for all artwork details to be fetched
//     const artworks = await Promise.all(artworksPromises);
//     return artworks; // Return the array of artwork details
//   } catch (error) {
//     console.error("Error fetching artworks by department:", error);
//     throw error; // Rethrow error to be handled by the caller
//   }
// };

// WIP

// export const fetchArtistDetails = async (artistID) => {
//   try {
//     const response = await fetch(
//       `https://collectionapi.metmuseum.org/public/collection/v1/artists/${artistID}`
//     );
//     const data = await response.json();
//     return {
//       artistName: data.displayName,
//       biography: data.biography,
//       nationality: data.nationality,
//     };
//   } catch (error) {
//     console.error("Error fetching artist details:", error);
//     throw error;
//   }
// };
