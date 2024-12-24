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
          <p>
            <strong>Artist:</strong>
            {artwork.artistDisplayName || "Unknown Artist"}{" "}
          </p>
          <p>
            <strong>Date:</strong>
            {artwork.objectDate || "Unknown Date"}
          </p>
          <p>
            <strong>Period:</strong> {artwork.objectDate}
          </p>
          <p>
            <strong>Medium:</strong>
            {artwork.medium || "Unknown Medium"}
          </p>
          <p>
            <strong>Dimensions:</strong>
            {artwork.dimensions || "Unknown Dimensions"}
          </p>
          <p>
            <strong>Classification:</strong>
            {artwork.classification || "Unknown Classification"}
          </p>
          <p>
            <strong>Location:</strong> {artwork.gallery || "Not specified"}
          </p>
          <p>
            <strong>Culture:</strong> {artwork.culture || "Not specified"}
          </p>

          {artwork.objectDescription && (
            <p>Description: {artwork.objectDescription}</p>
          )}
          <p>
            <a
              href={artwork.objectURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on the Met's Website
            </a>
          </p>
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
