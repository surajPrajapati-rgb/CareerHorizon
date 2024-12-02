import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './MentorCard.css'; // Import the CSS file

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleCardClick = () => {
    navigate(`/mentor/${mentor.mentor_id}`); // Navigate to the mentor's detail page
  };

  const handleLinkedInClick = (e) => {
    e.stopPropagation(); // Prevent navigation to the mentor page
  };

  return (
    <div 
      key={mentor.mentor_id} 
      className="mentor-card" 
      onClick={handleCardClick} // Add onClick handler for navigation
    >
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
      <a 
        href={mentor.linkedin_url} 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={handleLinkedInClick} // Prevent card navigation on LinkedIn link click
      >
        View LinkedIn
      </a>
    </div>
  );
};

export default MentorCard;
