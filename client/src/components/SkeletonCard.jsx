import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card card">
      <div className="skeleton-image skeleton" />
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-tag skeleton" />
        <div className="skeleton-line skeleton-title skeleton" />
        <div className="skeleton-line skeleton-desc skeleton" />
        <div className="skeleton-line skeleton-desc-short skeleton" />
        <div className="skeleton-meta-row">
          <div className="skeleton-pill skeleton" />
          <div className="skeleton-pill skeleton" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
