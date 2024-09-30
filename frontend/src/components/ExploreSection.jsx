// src/components/ExploreSection.jsx
import React, { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import ExploreCard from './ExploreCard';
import '/src/styles/ExploreSection.css'; // Custom styles for the layout

const ExploreSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Programming', 'Design', 'Information'];

  const fields = [
    { title: 'UI/UX Design', category: 'Design', color: '#B1D7FF' },
    { title: 'Advanced .Net', category: 'Programming', color: '#F4CF86' },
    { title: 'Digital Art', category: 'Design', color: '#A6E3D4' },
    { title: 'Copywriting', category: 'Information', color: '#F2B3D0' }
  ];

  const filteredFields = selectedCategory === 'All'
    ? fields
    : fields.filter(field => field.category === selectedCategory);

  return (
    <div className="explore-section">
      <h1>Let's explore <br /> new fields</h1>
      
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />

      <div className="cards-grid">
        {filteredFields.map((field, index) => (
          <ExploreCard key={index} field={field} />
        ))}
      </div>
    </div>
  );
};

export default ExploreSection;
