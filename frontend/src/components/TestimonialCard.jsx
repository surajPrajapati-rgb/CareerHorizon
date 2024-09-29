// src/components/TestimonialCard.jsx
import React from 'react';
import './TestimonialCard.css'; // Add custom styles

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card">
      <blockquote>
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <div className="user-info">
        <div className="avatar">
          {testimonial.initials}
        </div>
        <div className="details">
          <h4>{testimonial.name}</h4>
          <a href={testimonial.courseLink}>{testimonial.courseTitle} &rarr;</a>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
