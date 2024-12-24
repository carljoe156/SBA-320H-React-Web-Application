import React, { useState, useEffect } from "react";
import { fetchObjectDetails } from "../services/ArtworkService"; // pulls from our Services
import SkeletonLoader from "../components/SkeletonLoader";

const RandomArtworkPage = () => {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRandomArtwork = async () => {
      try {
        let randomId;
        let artworkDetails;
        let attempts = 0;
        const maxAttempts = 5; // Maximum attempts to get a valid artwork

        // Keep trying until we get a valid artwork, but limit the number of attempts
        do {
          randomId = Math.floor(Math.random() * 400000); // Random number within the range of objects available
          artworkDetails = await fetchObjectDetails(randomId); // Fetch the artwork details
          attempts++;
          if (attempts > maxAttempts) {
            throw new Error(
              "Max attempts reached. Could not fetch valid artwork."
            );
          }
        } while (!artworkDetails.title); // If no title, retry with a new random ID

        setArtwork(artworkDetails); // Set artwork once we have a valid one
      } catch (error) {
        setError("Error fetching random artwork: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    getRandomArtwork(); // Call the function to fetch random artwork on page load
  }, []);

  if (loading) {
    return (
      <div className="random-artwork-container">
        <SkeletonLoader /> {/* Display Skeleton Loader */}
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="random-artwork-container">
      {artwork ? (
        <div className="random-artwork-content">
          <div className="artwork-left">
            {/* Displaying the random artwork image */}
            <img
              src={artwork.primaryImage}
              alt={artwork.title}
              className="artwork-image"
            />
          </div>

          <div className="artwork-right">
            {/* Artwork details */}
            <h1>{artwork.title}</h1>
            <p>
              <strong>Artist:</strong> {artwork.artistDisplayName}
            </p>
            <p>
              <strong>Medium:</strong> {artwork.medium}
            </p>
            <p>
              <strong>Period:</strong> {artwork.objectDate}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {artwork.objectDescription || "No description available."}
            </p>
            <p>
              <strong>Classification:</strong>{" "}
              {artwork.classification || "Not specified"}
            </p>
            <p>
              <strong>Dimensions:</strong> {artwork.dimensions || "N/A"}
            </p>
            <p>
              <strong>Location:</strong> {artwork.gallery || "Not specified"}
            </p>
            <p>
              <strong>Culture:</strong> {artwork.culture || "Not specified"}
            </p>
            <a
              href={artwork.objectURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on the Met's Website
            </a>
          </div>
        </div>
      ) : (
        <p>No artwork found.</p>
      )}
    </div>
  );
};

export default RandomArtworkPage;
