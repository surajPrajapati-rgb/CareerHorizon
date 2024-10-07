// src/components/HomePage.jsx
import React from 'react';
import './HomePage.css'; // Similar to WelcomePage

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section text-center text-white bg-primary py-5">
        <div className="container">
          <h1 className="display-4">Welcome to Your Learning Hub</h1>
          <p className="lead">Empowering your career journey with the best resources and mentorship.</p>
          <div className="mt-4">
            <a href="/explore" className="btn btn-lg btn-light mx-2">Explore Courses</a>
            <a href="/mentors" className="btn btn-lg btn-outline-light mx-2">Find a Mentor</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
