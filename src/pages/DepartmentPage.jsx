import React, { useEffect, useState } from "react";
import {
  fetchDepartments,
  fetchArtworksByDepartment,
  fetchObjectDetails,
} from "../services/ArtworkService";
import DepartmentCard from "../components/DepartmentCard";
import SkeletonLoader from "../components/SkeletonLoader";
import departmentImages from "../services/departmentImages";

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [artworks, setArtworks] = useState([]); // Store artworks of selected department
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null); // Store selected department id
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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

  // For Fetching the artworks for the selected department
  useEffect(() => {
    if (!selectedDepartmentId) return;

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
        // const totalArtworkCount = 200;
        const totalArtworkCount = 470000;
        setTotalPages(Math.ceil(totalArtworkCount / 20)); // Updates the total pages for pagination
      } catch (error) {
        setError("Error fetching artworks.");
      } finally {
        setLoading(false);
      }
    };

    getArtworks();
  }, [selectedDepartmentId, currentPage]);

  const handleDepartmentSelect = (departmentId) => {
    setSelectedDepartmentId(departmentId); // Set the selected department id
    setCurrentPage(1); // Reset to first page when a new department is selected
  };

  // Handle the pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1 className="department-title">Departments</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="department-list">
        {departments.map((department) => (
          <div key={department.departmentId} className="department-card">
            <img
              src={
                departmentImages[department.displayName] ||
                "/images/default-department.jpg"
              }
              alt={department.displayName}
              className="department-image"
            />
            <h2>{department.displayName}</h2>
            <button
              className="department-view-button"
              onClick={() => handleDepartmentSelect(department.departmentId)}
            >
              View Artworks
            </button>
          </div>
        ))}
      </div>

      {selectedDepartmentId && (
        <>
          <h2 className="department-list-2">Artworks in This Department</h2>
          {loading && <SkeletonLoader count={10} />}
          {error && <p>{error}</p>}

          <div className="artworks-container">
            {artworks.map((artwork) => (
              <div key={artwork.objectID} className="artwork-card">
                <img
                  className="artwork-image"
                  src={artwork.primaryImageSmall || "/images/default-image.jpg"} // Using local fallback image
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
