import React, { useEffect, useState } from 'react';

const CategoryBar = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/categories/'); // Replace with your API
        const data = await response.json();
        const uniqueCategories = [
          ...new Map(data.map((cat) => [cat.category_name, cat])).values(),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="category-bar">
      {categories.map((category) => (
        <div
          key={category.mentor_category_id}
          className="category-item"
          onClick={() => onCategorySelect(category)}
        >
          <span className="category-name">{category.category_name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
