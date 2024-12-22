import React, { useState, useEffect } from "react";
import { fetchObjectIDs, fetchObjectDetails } from "../services/ArtworkService";
import ArtworkCard from "../components/ArtworkCard";
import { Link } from "react-router-dom"; // Use Link to navigate

const HomePage = () => {
  const [objectIDs, setObjectIDs] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // let's see the current page
  const [artworksPerPage] = useState(50); // Number of artworks to load per page, lets od 50 for now

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const ids = await fetchObjectIDs(); // Get a list of object IDs
        setObjectIDs(ids);

        // Get the artworks for the current page, we slice the ids array based on the current page and artworksPerPage,
        // and then fetch the details for each artwork.
        const startIndex = (currentPage - 1) * artworksPerPage;
        const endIndex = startIndex + artworksPerPage;
        const idsForCurrentPage = ids.slice(startIndex, endIndex);

        // Fetch the details for each artwork in the current page.
        const artworkPromises = idsForCurrentPage.map((id) =>
          fetchObjectDetails(id)
        );
        const artworksData = await Promise.all(artworkPromises);
        // const artworksData = await Promise.all(
        //   ids.slice(0, 50).map((id) => fetchObjectDetails(id)) // Fetch details for each artwork
        //   ids.map((id) => fetchObjectDetails(id))

        const filteredArtworks = artworksData.filter(
          (artwork) => artwork.primaryImage
        );

        setArtworks(filteredArtworks); // Store filtered artworks with images
      } catch (error) {
        setError("Error fetching artworks.");
      } finally {
        setLoading(false);
      }
    };

    //     setArtworks(artworksData); // Store all artwork data
    //   } catch (error) {
    //     setError("Error fetching artworks.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchArtworks();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1); // Go to the next page
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Go to the previous page
    }
  };

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
            {/* Artwork Information */}
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
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default HomePage;
