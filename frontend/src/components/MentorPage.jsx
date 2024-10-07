// src/components/MentorPage.jsx
import React from 'react';
import './MentorPage.css'; // Following the same theme

const MentorPage = () => {
  return (
    <div className="mentor-page">
      <section className="mentor-section py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-4">Our Mentors</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="mentor-card p-3 bg-white shadow-sm h-100">
                <h5>Jane Doe</h5>
                <p>Expert in Data Science and Machine Learning</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="mentor-card p-3 bg-white shadow-sm h-100">
                <h5>John Smith</h5>
                <p>Frontend Developer and UI/UX Specialist</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="mentor-card p-3 bg-white shadow-sm h-100">
                <h5>Sarah Lee</h5>
                <p>Full Stack Developer and Mentor</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentorPage;
