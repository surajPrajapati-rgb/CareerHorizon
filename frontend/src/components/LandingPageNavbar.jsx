import React from 'react';
import '/src/styles/LandingPageNavbar.css';

const LandingPageNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img
            src="path/to/logo.png"
            alt="Logo"
          />
        </div>

        {/* Middle Section - Search bar */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search for anything"
          />
        </div>

        {/* Right Section - Links */}
        <div className="navbar-links">
          <a href="#">Categories</a>
          <a href="#">Plans & Pricing</a>
          <a href="#">Udemy Business</a>
          <a href="#">Teach on Udemy</a>
          <a href="#"><i className="fas fa-shopping-cart"></i></a>
          <a href="#">Log in</a>
        </div>
        <button className="navbar-signup">Sign Up</button>
      </div>
    </nav>
  );
};

export default LandingPageNavbar;
