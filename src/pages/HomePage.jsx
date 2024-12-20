// import React, { useState, useEffect } from "react";
// import { fetchObjectIDs, fetchObjectDetails } from "../services/artworkService";
// import ArtworkCard from "../components/ArtworkCard";
// import { Link } from "react-router-dom"; // Import Link for navigation

// const HomePage = () => {
//   const [objectIDs, setObjectIDs] = useState([]);
//   const [artworks, setArtworks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch object IDs when component mounts
//     const fetchArtworks = async () => {
//       try {
//         const ids = await fetchObjectIDs();
//         console.log("Fetched Object IDs: ", ids);
//         setObjectIDs(ids); // Store object IDs

//         // Fetch the artwork details using the object IDs
//         const artworkPromises = ids
//           .slice(0, 10)
//           .map((id) => fetchObjectDetails(id));
//         const artworksData = await Promise.all(artworkPromises);
//         setArtworks(artworksData); // Store artwork details
//       } catch (error) {
//         setError("Error fetching artworks.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArtworks(); // Fetch the data when the component mounts
//   }, []);

//   return (
//     <div>
//       <h1>The Met Collection</h1>

//       {loading && <p>Loading artworks...</p>}
//       {error && <p>{error}</p>}

//       <div className="card-container">
//         {artworks.map((artwork) => (
//           <Link to={`/details/${artwork.objectID}`} key={artwork.objectID}>
//             {" "}
//             {/* Using Link to navigate */}
//             <ArtworkCard artwork={artwork} />
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from "react";
import { fetchObjectIDs, fetchObjectDetails } from "../services/ArtworkService";
import ArtworkCard from "../components/ArtworkCard";
import { Link } from "react-router-dom"; // Use Link to navigate

const HomePage = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const ids = await fetchObjectIDs(); // Get a list of object IDs
        const artworksData = await Promise.all(
          ids.slice(0, 50).map((id) => fetchObjectDetails(id)) // Fetch details for each artwork
          //   ids.map((id) => fetchObjectDetails(id))
        );
        setArtworks(artworksData); // Store all artwork data
      } catch (error) {
        setError("Error fetching artworks.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks(); // Fetch data when component mounts
  }, []);

  return (
    <div>
      <h1>The Met Collection</h1>
      {loading && <p>Loading artworks...</p>}
      {error && <p>{error}</p>}

      <div className="card-container">
        {artworks.map((artwork) => (
          <Link to={`/details/${artwork.objectID}`} key={artwork.objectID}>
            <ArtworkCard artwork={artwork} />{" "}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
