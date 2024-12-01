import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MentorCard from './MentorCard'; // Import the MentorCard component
import './MentorCategoryFilter.css'; // Import the CSS file

const MentorCategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories/');
        
        // Add 'All' category to the beginning of the list
        const allCategory = { mentor_category_id: 0, category_name: 'All' };

        const uniqueCategories = [
          allCategory,
          ...Array.from(new Set(response.data.map(cat => cat.category_name)))
            .map((name, index) => ({
              mentor_category_id: index + 1,
              category_name: name,
            }))
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const fetchMentorsByCategory = async (categoryId) => {
    try {
      let apiUrl = 'http://127.0.0.1:8000/api/all/'; // Default API endpoint to fetch all mentors

      // If a category other than "All" is selected, fetch mentors by category
      if (categoryId !== 0) {
        apiUrl = `http://127.0.0.1:8000/api/filter_mentors/${categoryId}/`;
      }

      const response = await axios.get(apiUrl);
      setMentors(response.data.mentors); // Assuming the response contains a 'mentors' field
      setSelectedCategory(categoryId);
    } catch (error) {
      console.error('Error fetching mentors:', error);
      setMentors([]);
    }
  };

  return (
    <div className="container">
      <h1>Mentor Categories</h1>
      <div className="flex">
        {categories.map((category) => (
          <button
            key={category.mentor_category_id}
            onClick={() => fetchMentorsByCategory(category.mentor_category_id)}
            className={`${
              selectedCategory === category.mentor_category_id
                ? 'bg-blue-600'
                : 'bg-gray-200'
            }`}
          >
            {category.category_name}
          </button>
        ))}
      </div>

      {mentors.length  > 0 ? (
        <div className="grid">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.mentor_id} mentor={mentor} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          {selectedCategory
            ? 'No mentors found for this category.'
            : 'Select a category to view mentors.'}
        </p>
      )}
    </div>
  );
};

export default MentorCategoryFilter;
