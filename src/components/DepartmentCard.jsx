import React from "react";

const DepartmentCard = ({ department, onSelect }) => {
  return (
    <div
      className="department-card"
      onClick={() => onSelect(department.departmentId)}
    >
      {/* If there's an image URL for the department, use it; otherwise, fall back to a default image */}
      {department.primaryImageSmall ? (
        <img
          src={department.primaryImageSmall}
          alt={department.displayName}
          className="department-card-image"
        />
      ) : (
        <img
          src="default-image.jpg" // You can set a default image URL here
          alt="Default"
          className="department-card-image"
        />
      )}
      <h3>{department.displayName}</h3>
      <p>{department.description}</p> {/* If description is available */}
      <p>Number of Artworks: {department.objectCount}</p> {/* Optional */}
    </div>
  );
};

export default DepartmentCard;
