import React, { useState, useEffect } from "react";
import { fetchObjectIDs, fetchObjectDetails } from "../services/ArtworkService";
import ArtworkCard from "../components/ArtworkCard";
import { Link } from "react-router-dom"; // Use Link to navigate

const HomePage = () => {
  const [objectIDs, setObjectIDs] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [artworksPerPage] = useState(50); // Number of artworks per page

  // Fetch the artwork details for each page
  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const ids = await fetchObjectIDs(); // Fetch a list of object IDs
        setObjectIDs(ids); // Set all IDs to state

        // Determine the range of IDs to fetch for the current page
        const startIndex = (currentPage - 1) * artworksPerPage;
        const endIndex = startIndex + artworksPerPage;
        const idsForCurrentPage = ids.slice(startIndex, endIndex);

        // Fetch details for the artworks in the current page
        const artworkPromises = idsForCurrentPage.map((id) =>
          fetchObjectDetails(id)
        );
        const artworksData = await Promise.all(artworkPromises);

        // Filter out any artworks without images
        const filteredArtworks = artworksData.filter(
          (artwork) => artwork.primaryImage
        );

        setArtworks(filteredArtworks); // Set the filtered artworks to state
      } catch (error) {
        setError("Error fetching artworks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks(); // Trigger the artwork fetch
  }, [currentPage]); // Fetch artworks whenever the page changes

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Go to the next page
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Go to the previous page
    }
  };

  // Calculate total pages based on the object IDs length
  const totalPages = Math.ceil(objectIDs.length / artworksPerPage);

  return (
    <div className="homepage-container">
      <h1>The Met Collection</h1>

      {loading && <p>Loading artworks...</p>}
      {error && <p>{error}</p>}

      <div className="masonry-grid">
        {artworks.map((artwork) => (
          <Link to={`/details/${artwork.objectID}`} key={artwork.objectID}>
            <img
              className="masonry-item"
              src={artwork.primaryImageSmall}
              alt={artwork.title}
            />
            <div className="masonry-item-info">
              <h3 className="artwork-title">{artwork.title}</h3>
              {artwork.artistDisplayName && (
                <p className="artwork-artist">
                  Artist: {artwork.artistDisplayName}
                </p>
              )}
              {artwork.objectDate && (
                <p className="artwork-period">Period: {artwork.objectDate}</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
