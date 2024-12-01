// MentorCard.js
import React from 'react';
import './MentorCard.css'; // Import the CSS file

const MentorCard = ({ mentor }) => {
  return (
    <div key={mentor.mentor_id} className="mentor-card">
      <img 
        src={mentor.mentor_image_url} 
        alt={mentor.mentor_name} 
      />
      <h2>{mentor.mentor_name}</h2>
      <div className="mentor-details">
        <p>Experience: {mentor.experience_years} years</p>
        <p>Education: {mentor.education}</p>
      </div>
      <p className="mentor-bio">{mentor.bio}</p>
      <div className="mentor-rate">Hourly Rate: ${mentor.hourly_rate}</div>
      <a href={mentor.linkedin_url} target="_blank" rel="noopener noreferrer">
        View LinkedIn
      </a>
    </div>
  );
};

export default MentorCard;
