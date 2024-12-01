import React from 'react';
import './HomePage.css'; // Similar to WelcomePage

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section text-center text-white bg-primary py-5">
        <div className="container">
          <h1 className="display-4">Welcome to Your Learning Hub</h1>
          <p className="lead">Empowering your career journey with the best resources and mentorship.</p>
          <div className="mt-4">
            <a href="/courses" className="btn btn-lg btn-light mx-2">Explore Courses</a>
            <a href="/mentors" className="btn btn-lg btn-outline-light mx-2">Find a Mentor</a>
            <a href="/chat" className="btn btn-lg btn-outline-light mx-2">Chat</a>
            <a href="/edit_profile" className="btn btn-lg btn-outline-light mx-2">Edit Profile</a>
            <a href="/get_profile" className="btn btn-lg btn-outline-light mx-2">Get Profile</a>
          </div>
        </div>
      </section>

      {/* Selected Courses Section */}
      <section className="courses-section container mt-5">
        <h2 className="text-center mb-4">Your Selected Courses</h2>
        <div className="row">
          {/* Dummy course 1 */}
          <div className="col-md-4">
            <div className="course-card bg-light p-4 mb-4">
              <h3>Full Stack Development</h3>
              <p>Learn the skills to become a full stack web developer, mastering both frontend and backend technologies.</p>
              <a href="/courses/1" className="btn btn-outline-primary">View Course</a>
            </div>
          </div>
          {/* Dummy course 2 */}
          <div className="col-md-4">
            <div className="course-card bg-light p-4 mb-4">
              <h3>Data Science for Beginners</h3>
              <p>Start your journey in Data Science, learning Python, data visualization, and machine learning fundamentals.</p>
              <a href="/courses/2" className="btn btn-outline-primary">View Course</a>
            </div>
          </div>
          {/* Dummy course 3 */}
          <div className="col-md-4">
            <div className="course-card bg-light p-4 mb-4">
              <h3>AI and Machine Learning</h3>
              <p>Dive deep into artificial intelligence, neural networks, and advanced machine learning techniques.</p>
              <a href="/courses/3" className="btn btn-outline-primary">View Course</a>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Mentors Section */}
      <section className="mentors-section container mt-5">
        <h2 className="text-center mb-4">Your Selected Mentors</h2>
        <div className="row">
          {/* Dummy mentor 1 */}
          <div className="col-md-4">
            <div className="mentor-card bg-light p-4 mb-4">
              <h3>Jane Doe</h3>
              <p>Expert in Full Stack Development, with over 10 years of industry experience in React and Node.js.</p>
              <a href="/mentors/1" className="btn btn-outline-primary">View Profile</a>
            </div>
          </div>
          {/* Dummy mentor 2 */}
          <div className="col-md-4">
            <div className="mentor-card bg-light p-4 mb-4">
              <h3>John Smith</h3>
              <p>Data Science professional with experience in building machine learning models and data pipelines.</p>
              <a href="/mentors/2" className="btn btn-outline-primary">View Profile</a>
            </div>
          </div>
          {/* Dummy mentor 3 */}
          <div className="col-md-4">
            <div className="mentor-card bg-light p-4 mb-4">
              <h3>Mary Johnson</h3>
              <p>AI specialist with deep knowledge of neural networks, NLP, and computer vision techniques.</p>
              <a href="/mentors/3" className="btn btn-outline-primary">View Profile</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
