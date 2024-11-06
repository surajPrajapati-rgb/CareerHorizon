// MentorCard.jsx
import React from "react";
import './MentorCard.css'; // Import your CSS for styling

const MentorCard = ({ mentor }) => {
  const { experience_years, hourly_rate, industry, categories, reviews, skills } = mentor;

  return (
    <div className="mentor-card">
      <h2>Mentor ID: {mentor.mentor_id}</h2>
      <p><strong>Experience:</strong> {experience_years} years</p>
      <p><strong>Hourly Rate:</strong> ${hourly_rate}</p>
      <p><strong>Industry:</strong> {industry}</p>
      
      <h3>Categories:</h3>
      <ul>
        {categories.map((category) => (
          <li key={category.mentor_category_id}>{category.category_name}</li>
        ))}
      </ul>
      
      <h3>Skills:</h3>
      <ul>
        {skills.map((skill) => (
          <li key={skill.mentor_skill_id}>{skill.skill_name}</li>
        ))}
      </ul>

      <h3>Reviews:</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.review_id}>
              (Rating: {review.rating})
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default MentorCard;
