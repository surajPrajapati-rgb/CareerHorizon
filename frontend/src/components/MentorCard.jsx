// MentorCard.jsx
import React from "react";
import './MentorCard.css'; // Import your CSS for styling

const MentorCard = ({ mentor }) => {
  const { experience_years, hourly_rate, industry, categories, reviews, skills, mentor_image_url } = mentor;

  return (
      console.log(mentor),
    <div className="mentor-card">
      <img src={mentor_image_url} alt="Image" />
      <h2>{mentor.mentor_name}</h2>
      {industry}
      {reviews.length > 0 ? (
        <p>({reviews.length} reviews)</p>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};
export default MentorCard;
