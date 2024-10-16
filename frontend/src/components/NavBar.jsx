import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Add custom styling here

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home">My App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/mentors">Mentor</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

      </div>
      <div className="navbar-profile">
        <Link to="/profile/1">
          <img src="/profile-icon.png" alt="Profile" className="profile-icon" />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
