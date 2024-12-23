import React from "react";

const DepartmentCard = ({ department, onSelect }) => {
  return (
    <div
      className="department-card"
      onClick={() => onSelect(department.departmentId)}
    >
      {department.primaryImageSmall ? (
        <img
          src={department.primaryImageSmall}
          alt={department.displayName}
          className="department-card-image"
        />
      ) : (
        <img
          src={department.primaryImageSmall}
          alt={department.displayName}
          className="department-card-image"
        />
      )}
      <h3>{department.displayName}</h3>
      <p>{department.description}</p>
      <p>Number of Artworks: {department.objectCount}</p>
    </div>
  );
};

export default DepartmentCard;
