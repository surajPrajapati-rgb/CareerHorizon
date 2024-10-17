// src/components/CourseList.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import CourseCard from './CourseCard';

const Header = styled.h2`
  text-align: center;
  font-size: 1.8em;
  font-weight: bold;
  margin-top: 90px;
  color: #333;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  padding: 16px;
  background-color: #f9f9f9;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 16px;
`;

const FilterInput = styled.input`
  padding: 8px;
  font-size: 1em;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Dropdown = styled.select`
  padding: 8px;
  font-size: 1em;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const CourseList = ({ courses }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  // Filter courses based on search query, level, and tag
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery) || 
                          course.description.toLowerCase().includes(searchQuery);
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesTag = selectedTag === 'All' || course.tags.includes(selectedTag);

    return matchesSearch && matchesLevel && matchesTag;
  });

  return (
    <>
      <Header>There is nothing that limits you from wanting to learn whatever you want</Header>
      <FiltersContainer>
        <FilterInput
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Dropdown value={selectedLevel} onChange={handleLevelChange}>
          <option value="All">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </Dropdown>
        <Dropdown value={selectedTag} onChange={handleTagChange}>
          <option value="All">All Tags</option>
          <option value="Free">Free</option>
          <option value="Event">Event</option>
          <option value="Course">Course</option>
          {/* Add more tags as needed */}
        </Dropdown>
      </FiltersContainer>
      <Grid>
        {filteredCourses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </Grid>
    </>
  );
};

export default CourseList;
