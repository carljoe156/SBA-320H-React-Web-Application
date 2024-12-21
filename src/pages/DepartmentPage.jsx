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
      const artworkIDs = await fetchArtworksByDepartment(departmentId);

      if (artworkIDs.length === 0) {
        setError("No artworks found in this department.");
        return;
      }
      const artworksData = await Promise.all(
        artworkIDs.map((id) => fetchObjectDetails(id))
      );
      setArtworks(artworksData);
    } catch (error) {
      setError("Error fetching artworks.");
    } finally {
      setLoading(false);
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentPage;
