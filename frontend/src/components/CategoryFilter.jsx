// src/components/CategoryFilter.jsx
import React from 'react';
import './CategoryFilter.css'; // Add custom styles for buttons

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`category-button ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
