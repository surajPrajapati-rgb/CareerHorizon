import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // to get mentor_id from the URL

const MentorDetail = () => {
  const { mentor_id } = useParams(); // Get mentor_id from URL params
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    // Fetch mentor details by mentor_id (replace with your actual data fetching logic)
    const fetchMentor = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/mentors/${mentor_id}`);
      const data = await response.json();
      console.log("DT:",data)
      setMentor(data.mentor);
      
    };

    fetchMentor();
  },[mentor_id]); // Fetch mentor data whenever mentor_id changes

  console.log(mentor)
  if (!mentor) {
    return <div>Loading...</div>; // Display loading state until data is fetched
  }

  return (
    <div>
      <h1>{mentor.mentor_name}</h1>
      <img src={mentor.mentor_image_url} alt={mentor.mentor_name} />
      <p>Experience: {mentor.experience_years} years</p>
      <p>Education: {mentor.education}</p>
      <p>{mentor.bio}</p>
      <p>Hourly Rate: ${mentor.hourly_rate}</p>
      <a href={mentor.linkedin_url} target="_blank" rel="noopener noreferrer">View LinkedIn</a>
    </div>
  );
};

export default MentorDetail;
