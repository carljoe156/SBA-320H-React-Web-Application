import React, { useEffect, useState } from "react";
import {
  fetchDepartments,
  fetchArtworksByDepartment,
  fetchObjectDetails,
} from "../services/ArtworkService";

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(0); // Track total number of pages

  // Filters
  const [artist, setArtist] = useState(""); // Artist filter
  const [timePeriod, setTimePeriod] = useState(""); // Time period filter

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const departmentsData = await fetchDepartments();
        setDepartments(departmentsData);
      } catch (error) {
        setError("Error fetching departments.");
      } finally {
        setLoading(false);
      }
    };
    getDepartments();
  }, []);

  const handleDepartmentSelect = async (departmentId) => {
    setLoading(true);
    try {
      const artworkIDs = await fetchArtworksByDepartment(
        departmentId,
        currentPage,
        20,
        artist,
        timePeriod
      );

      if (artworkIDs.length === 0) {
        setError("No artworks found in this department.");
        return;
      }
      const artworksData = await Promise.all(
        artworkIDs.map((id) => fetchObjectDetails(id))
      );
      setArtworks(artworksData);
      setTotalPages(Math.ceil(artworksData.length / 20));
    } catch (error) {
      setError("Error fetching artworks.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (departments.length > 0) {
      handleDepartmentSelect(departments[0].departmentId); // Re-fetch artworks for the selected department
    }
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === "artist") {
      setArtist(value);
    } else if (filterType === "timePeriod") {
      setTimePeriod(value);
    }

    setCurrentPage(1);
    if (departments.length > 0) {
      handleDepartmentSelect(departments[0].departmentId); // Re-fetch artworks based on the new filter
    }
  };

  return (
    <div>
      <h1>Departments</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        {departments.map((department) => (
          <button
            key={department.departmentId}
            onClick={() => handleDepartmentSelect(department.departmentId)}
          >
            {department.displayName}
          </button>
        ))}
      </div>

      <h2>Artworks</h2>
      <div>
        {artworks.map((artwork) => (
          <div key={artwork.objectID} className="department-details">
            <h3>{artwork.title}</h3>
            <img src={artwork.primaryImage} alt={artwork.title} />
            <h3>{artwork.title}</h3>
            <p>{artwork.artistDisplayName}</p>
            <p>{artwork.objectDate}</p>
            <p>
              <a
                href={artwork.objectURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on the Met's Website
              </a>
            </p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DepartmentPage;
