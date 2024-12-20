import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchObjectDetails, fetchObjectIDs } from "../services/ArtworkService";
import ArtworkCard from "../components/ArtworkCard";

const SearchResults = () => {
  const { searchTerm } = useParams();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // Fetch all object IDs
        const ids = await fetchObjectIDs();

        // Fetch artwork details for all the object IDs
        const artworkPromises = ids.map((id) => fetchObjectDetails(id));
        const artworksData = await Promise.all(artworkPromises);

        // Filter the artworks based on the search term ( like  artist name, title, or description)
        const filteredArtworks = artworksData.filter((artwork) => {
          return (
            artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            artwork.artistDisplayName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            (artwork.objectDescription &&
              artwork.objectDescription
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
          );
        });

        setArtworks(filteredArtworks);
      } catch (error) {
        setError("Error fetching search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Results for "{searchTerm}"</h1>
      {loading && <p>Loading search results...</p>}
      {error && <p>{error}</p>}
      <div className="card-container">
        {artworks.length > 0 ? (
          artworks.map((artwork) => (
            <ArtworkCard key={artwork.objectID} artwork={artwork} />
          ))
        ) : (
          <p>No artworks found matching "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
