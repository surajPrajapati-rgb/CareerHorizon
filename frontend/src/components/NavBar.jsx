import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Add custom styling here

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home">TechPoint</Link>
      </div>
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/explore">Explore Career</Link>
        <Link to="/mentors">Mentor</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

      </div>
      <div className="navbar-profile">
        <Link to="/profile/">
          <img src="/public/image.png" alt="Profile" className="profile-icon" />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
