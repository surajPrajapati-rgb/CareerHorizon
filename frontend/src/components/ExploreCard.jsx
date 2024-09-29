// src/components/ExploreCard.jsx
import React from 'react';
import './ExploreCard.css'; // Custom styles for cards

const ExploreCard = ({ field }) => {
  return (
    <div className="explore-card" style={{ backgroundColor: field.color }}>
      <div className="card-content">
        <div className="category-label">{field.category}</div>
        <h3>{field.title}</h3>
        <div className="arrow-icon">➔</div>
      </div>
    </div>
  );
};

export default ExploreCard;
