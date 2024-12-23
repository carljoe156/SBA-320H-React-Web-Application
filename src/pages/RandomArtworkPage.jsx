import React, { useState, useEffect } from "react";
import { fetchObjectDetails } from "../services/ArtworkService"; // pulls from  our Services

const RandomArtworkPage = () => {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRandomArtwork = async () => {
      try {
        const randomId = Math.floor(Math.random() * 400000); // Random number within the range of objects available(Did you there are over 400,000 objects in the MET API? :') )
        const artworkDetails = await fetchObjectDetails(randomId); // For Fetching the details of random object
        setArtwork(artworkDetails);
      } catch (error) {
        setError("Error fetching random artwork");
      } finally {
        setLoading(false);
      }
    };

    getRandomArtwork(); // Call the function to fetch random artwork on page load
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="random-artwork-container">
      {artwork ? (
        <div className="random-artwork-details">
          <h1>{artwork.title}</h1>
          <img src={artwork.primaryImage} alt={artwork.title} />
          <p>Artist: {artwork.artistDisplayName}</p>
          <p>Period: {artwork.objectDate}</p>
          <p>{artwork.objectDescription}</p>
        </div>
      ) : (
        <p>No artwork found.</p>
      )}
    </div>
  );
};

export default RandomArtworkPage;
