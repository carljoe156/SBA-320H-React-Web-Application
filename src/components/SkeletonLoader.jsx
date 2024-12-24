import React from "react";

const SkeletonLoader = ({ count = 10 }) => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img"></div>

      <div className="skeleton-text skeleton-title"></div>

      <div className="skeleton-text skeleton-author"></div>

      <div className="skeleton-text skeleton-description"></div>
    </div>
  );
};

export default SkeletonLoader;
