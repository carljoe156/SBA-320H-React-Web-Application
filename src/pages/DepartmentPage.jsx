import React, { useEffect, useState } from "react";
import {
  fetchDepartments,
  fetchArtworksByDepartment,
  fetchObjectDetails,
} from "../services/ArtworkService";
import DepartmentCard from "../components/DepartmentCard";

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [artworks, setArtworks] = useState([]); // Store artworks of selected department
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null); // Store selected department id
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch departments on component mount
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

  // Fetch artworks for the selected department
  useEffect(() => {
    if (!selectedDepartmentId) return; // Don't fetch if no department is selected

    const getArtworks = async () => {
      setLoading(true);
      try {
        const artworkIDs = await fetchArtworksByDepartment(
          selectedDepartmentId,
          currentPage,
          20
        );
        const artworksData = await Promise.all(
          artworkIDs.map((id) => fetchObjectDetails(id))
        );

        setArtworks(artworksData);
        setTotalPages(Math.ceil(artworksData.length / 20)); // Update total pages for pagination
      } catch (error) {
        setError("Error fetching artworks.");
      } finally {
        setLoading(false);
      }
    };

    getArtworks();
  }, [selectedDepartmentId, currentPage]);

  // Handle department card selection
  const handleDepartmentSelect = (departmentId) => {
    setSelectedDepartmentId(departmentId); // Set the selected department id
    setCurrentPage(1); // Reset to first page when a new department is selected
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1>Departments</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Continuous scrollable department list */}
      <div className="department-list">
        {departments.map((department) => (
          <DepartmentCard
            key={department.departmentId}
            department={department}
            onSelect={handleDepartmentSelect}
          />
        ))}
      </div>

      {selectedDepartmentId && (
        <>
          <h2>Artworks in This Department</h2>
          {loading && <p>Loading artworks...</p>}
          {error && <p>{error}</p>}

          {/* Display the artworks for the selected department */}
          <div className="artworks-container">
            {artworks.map((artwork) => (
              <div key={artwork.objectID} className="artwork-card">
                <img
                  className="artwork-image"
                  src={artwork.primaryImageSmall || "default-image.jpg"}
                  alt={artwork.title}
                />
                <h3>{artwork.title}</h3>
                <p>{artwork.artistDisplayName}</p>
                <p>{artwork.objectDate}</p>
                <a
                  href={artwork.objectURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on the Met's Website
                </a>
              </div>
            ))}
          </div>

          {/* Pagination for artworks */}
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
        </>
      )}
    </div>
  );
};

export default DepartmentPage;
