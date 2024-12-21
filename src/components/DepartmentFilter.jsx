import React, { useState, useEffect } from "react";
import { fetchDepartments } from "../services/ArtworkService";

const DepartmentFilter = ({ onSelectDepartment }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartmentsList = async () => {
      setLoading(true);
      try {
        const departmentList = await fetchDepartments();
        setDepartments(departmentList);
      } catch (err) {
        setError("Failed to load departments");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentsList();
  }, []);

  const handleChange = (event) => {
    onSelectDepartment(event.target.value);
  };

  return (
    <div>
      <h2>Filter by Department</h2>
      {loading && <p>Loading departments...</p>}
      {error && <p>{error}</p>}

      <select onChange={handleChange}>
        <option value="">Select a Department</option>
        {departments.map((department) => (
          <option key={department.id} value={department.name}>
            {department.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DepartmentFilter;
