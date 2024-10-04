import React from 'react';
import './HomePage.css'; // Import custom styles
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="container mt-5">
        {/* User Profile Overview */}
        <section className="profile-overview text-center mb-4">
          <h2>Welcome, [User Name]</h2>
          <img src="[Profile Picture URL]" alt="Profile" className="profile-pic" />
          <p>[Short Bio]</p>
          <div className="quick-links">
            <button className="btn btn-primary">Edit Profile</button>
            <button className="btn btn-secondary">Preferences</button>
            <button className="btn btn-outline-secondary">Settings</button>
          </div>
          <div className="progress-bar mt-3">
            <div className="progress">
              <div className="progress-bar" style={{ width: '75%' }} role="progressbar">
                75% Completed
              </div>
            </div>
          </div>
        </section>

        {/* Current Courses in Progress */}
        <section className="current-courses mb-4">
          <h2>Current Courses</h2>
          <div className="row">
            {/* Example Course Cards */}
            <div className="col-md-4 mb-3">
              <div className="course-card p-3 bg-light shadow">
                <h5>Data Science Basics</h5>
                <p>Progress: 60%</p>
                <button className="btn btn-primary">Resume Course</button>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="course-card p-3 bg-light shadow">
                <h5>Advanced React.js</h5>
                <p>Progress: 45%</p>
                <button className="btn btn-primary">Resume Course</button>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="course-card p-3 bg-light shadow">
                <h5>UI/UX Design Fundamentals</h5>
                <p>Progress: 30%</p>
                <button className="btn btn-primary">Resume Course</button>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Courses */}
        <section className="recommended-courses mb-4">
          <h2>Recommended Courses</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="course-card p-3 bg-light shadow">
                <h5>Python for Data Science</h5>
                <button className="btn btn-outline-primary">Enroll Now</button>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="course-card p-3 bg-light shadow">
                <h5>Full-Stack Development</h5>
                <button className="btn btn-outline-primary">Enroll Now</button>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="course-card p-3 bg-light shadow">
                <h5>Soft Skills for Professionals</h5>
                <button className="btn btn-outline-primary">Enroll Now</button>
              </div>
            </div>
          </div>
        </section>

        {/* Mentor Section */}
        <section className="mentor-section mb-4">
          <h2>Your Mentors</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="mentor-card p-3 bg-light shadow">
                <h5>John Smith</h5>
                <p>Expert in Data Science</p>
                <button className="btn btn-primary">Chat</button>
                <button className="btn btn-outline-primary">Schedule Meeting</button>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="mentor-card p-3 bg-light shadow">
                <h5>Sarah Johnson</h5>
                <p>Frontend Development Specialist</p>
                <button className="btn btn-primary">Chat</button>
                <button className="btn btn-outline-primary">Schedule Meeting</button>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Webinars or Events */}
        <section className="events-section mb-4">
          <h2>Upcoming Events</h2>
          <ul className="list-group">
            <li className="list-group-item">
              Industry 4.0 Webinar – March 5, 2024
            </li>
            <li className="list-group-item">
              Data Science Bootcamp – March 10, 2024
            </li>
            <li className="list-group-item">
              Hackathon – March 15-16, 2024
            </li>
          </ul>
        </section>

        {/* Progress Tracker */}
        <section className="progress-tracker mb-4">
          <h2>Your Progress</h2>
          <p>Courses Completed: 5</p>
          <p>Challenges Solved: 10</p>
          <p>Skills Earned: 3</p>
        </section>

        {/* Learning Streak/Goals */}
        <section className="learning-goals mb-4">
          <h2>Learning Goals</h2>
          <p>You've completed 5 lessons this week!</p>
          <p>Goal: Complete 3 courses this month.</p>
        </section>

        {/* Career Resources Section */}
        <section className="career-resources mb-4">
          <h2>Career Resources</h2>
          <ul className="list-group">
            <li className="list-group-item">Resume Templates</li>
            <li className="list-group-item">Interview Prep Courses</li>
            <li className="list-group-item">Mock Interview Schedules</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
