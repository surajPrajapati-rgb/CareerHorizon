import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MentorCard from './MentorCard'; // Import the MentorCard component
import './MentorCategoryFilter.css'; // Import the CSS file

const MentorCategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0); // Default to "All" category (0)
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // For scrolling categories

  const categoriesPerPage = 8; // Show 3 categories at a time

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://careerhorizon-vfpx.onrender.com/api/categories/');

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

        // Fetch mentors for the "All" category by default
        fetchMentorsByCategory(0); // 0 represents the "All" category
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const fetchMentorsByCategory = async (categoryId) => {
    try {
      let apiUrl = 'https://careerhorizon-vfpx.onrender.com/api/all/'; // Default API endpoint to fetch all mentors

      // If a category other than "All" is selected, fetch mentors by category
      if (categoryId !== 0) {
        apiUrl = `https://careerhorizon-vfpx.onrender.com/api/filter_mentors/${categoryId}/`;
      }

      const response = await axios.get(apiUrl);
      setMentors(response.data.mentors); // Assuming the response contains a 'mentors' field
      setSelectedCategory(categoryId);
    } catch (error) {
      console.error('Error fetching mentors:', error);
      setMentors([]);
    }
  };

  const handleScrollLeft = () => {
    setCurrentCategoryIndex(prevIndex => Math.max(prevIndex - categoriesPerPage, 0));
  };

  const handleScrollRight = () => {
    const maxIndex = categories.length - categoriesPerPage;
    setCurrentCategoryIndex(prevIndex => Math.min(prevIndex + categoriesPerPage, maxIndex));
  };

  const visibleCategories = categories.slice(currentCategoryIndex, currentCategoryIndex + categoriesPerPage);

  return (
    <div className="container">
      <h1>Mentor Categories</h1>
      <div className="category-scroll-container">
        <button className="scroll-button" onClick={handleScrollLeft} disabled={currentCategoryIndex === 0}>
          &lt;
        </button>
        <div className="category-buttons">
          {visibleCategories.map((category) => (
            <button
              key={category.mentor_category_id}
              onClick={() => fetchMentorsByCategory(category.mentor_category_id)}
              className={`category-button ${
                selectedCategory === category.mentor_category_id ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              {category.category_name}
            </button>
          ))}
        </div>
        <button className="scroll-button" onClick={handleScrollRight} disabled={currentCategoryIndex + categoriesPerPage >= categories.length}>
          &gt;
        </button>
      </div>

      {mentors.length > 0 ? (
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
