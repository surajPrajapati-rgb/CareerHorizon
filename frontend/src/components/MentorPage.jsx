// src/components/MentorPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './MentorPage.css';

const MentorPage = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/mentorship/mentors/');
        console.log(response.data);
        setMentors(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error loading mentors');
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const handleMentorProfile = (mentorId) => {
    // Navigate to the MentorProfile component with the mentorId
    if (mentorId) {
      navigate(`/mentors/${mentorId}`);
    } else {
      console.error("mentorId is undefined");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mentor-page">
      <section className="mentor-section py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-4">Our Mentors</h2>
          <div className="row">
            {mentors.map((mentor) => (
              <div className="col-md-4 mb-4" key={mentor.mentor_id}>
                <div className="mentor-card p-3 bg-white shadow-sm h-100">
                  <h5>{mentor.name}</h5>
                  <p>{mentor.field_of_study} - {mentor.degree}</p>
                  {mentor.bio && <p>{mentor.bio}</p>}
                  <h3>{mentor.mentor_id}</h3>
                  <button className="btn btn-primary" onClick={() => handleMentorProfile(mentor.mentor_id)}>
                    Book a Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentorPage;
