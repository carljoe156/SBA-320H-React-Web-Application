// import React from "react";

// function Details() {
//   return <div>Details</div>;
// }

// export default Details;

//This works
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; // Import useParams to access URL params
// import { fetchObjectDetails } from "../services/artworkService";

// const Details = () => {
//   const { objectID } = useParams(); // Retrieve objectID from the URL
//   const [artwork, setArtwork] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const data = await fetchObjectDetails(objectID); // Fetch artwork details by objectID
//         setArtwork(data); // Store the fetched data
//       } catch (error) {
//         setError("Error fetching artwork details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails(); // Fetch details on mount
//   }, [objectID]); // Re-fetch if objectID changes

//   return (
//     <div>
//       <h1>Artwork Details</h1>

//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}

//       {artwork && (
//         <div>
//           <h2>{artwork.title}</h2>
//           <p>{artwork.artistDisplayName}</p>
//           <p>{artwork.objectDate}</p>
//           <p>{artwork.medium}</p>
//           <p>{artwork.dimensions}</p>
//           <p>{artwork.creditLine}</p>
//           {artwork.primaryImage && (
//             <img src={artwork.primaryImage} alt={artwork.title} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Details;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the objectID from the met api url
import { fetchObjectDetails } from "../services/ArtworkService";

const Details = () => {
  const { objectID } = useParams(); // Get objectID from the URL params
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchObjectDetails(objectID); // Fetch detailed artwork data
        setArtwork(data);
      } catch (error) {
        setError("Error fetching artwork details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [objectID]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {artwork && (
        <div className="artwork-details">
          <h2>{artwork.title}</h2>
          <p>Artist: {artwork.artistDisplayName || "Unknown Artist"} </p>
          <p>Date: {artwork.objectDate || "Unknown Date"}</p>
          <p>Medium: {artwork.medium || "Unknown Medium"}</p>
          <p>Dimensions: {artwork.dimensions || "Unknown Dimensions"}</p>
          <p>
            Classification: {artwork.classification || "Unknown Classification"}
          </p>
          {artwork.objectDescription && (
            <p>Description: {artwork.objectDescription}</p>
          )}
          <img
            src={artwork.primaryImage}
            alt={artwork.title}
            style={{ maxWidth: "80%", height: "auto", marginTop: "20px" }}
          />
        </div>
      )}
    </div>
  );
};

export default Details;
