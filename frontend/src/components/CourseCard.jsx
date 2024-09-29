// src/components/CourseCard.jsx
import React from 'react';
import './CourseCard.css'; // Add styles for each card

const CourseCard = ({ course }) => {
  return (
    <div className="course-list">
    <div className="course-card">
      <img src={course.image} alt={course.title} />
      <div className="course-details">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="author">By {course.author}</div>
        <div className="price">
          <span className="discounted-price">${course.discountedPrice}</span>
          {course.originalPrice && <span className="original-price">${course.originalPrice}</span>}
        </div>
        <div className="tags">
          {course.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default CourseCard;
