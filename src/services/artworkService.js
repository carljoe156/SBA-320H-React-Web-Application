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
  limit = 200,
  artist = "",
  timePeriod = ""
) => {
  try {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${departmentId}&q=${artist}&dateBegin=${timePeriod}&hasImages=true&limit=${limit}&page=${page}`
    );
    const data = await response.json();
    if (data.objectIDs && data.objectIDs.length > 0) {
      return data.objectIDs; // Return the IDs if found
    } else {
      return []; // Return an empty array if no artworks are found
    }
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return []; // Return empty array in case of error
  }
};

//w.I.P (Can probably create a new page for department details for this purpose)
export const fetchArtworkDetails = async (objectId) => {
  try {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch artwork details");
    }
    const data = await response.json();
    return data; // Return the full artwork details
  } catch (error) {
    console.error("Error fetching artwork details:", error);
    throw error;
  }
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

// Our Search
// ArtworkService.js
// export const fetchSearchResults = async (searchTerm) => {
//   try {
//     const res = await fetch(
//       `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}&hasImages=true`
//     );
//     const data = await res.json();

//     if (data.objectIDs && data.objectIDs.length > 0) {
//       // Fetch artwork details for each object ID (limited to 40 for performance)
//       const artworkPromises = data.objectIDs.slice(0, 40).map(async (id) => {
//         const artworkRes = await fetch(
//           `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
//         );
//         const artwork = await artworkRes.json();
//         return artwork.primaryImage ? artwork : null; // Filter out items without images
//       });

//       const artworks = await Promise.all(artworkPromises);
//       return artworks.filter(Boolean); // Remove null values
//     }

//     return [];
//   } catch (error) {
//     throw new Error("Error fetching search results");
//   }
// };
