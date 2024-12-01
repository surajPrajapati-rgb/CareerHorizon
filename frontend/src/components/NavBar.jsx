import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './NavBar.css'; 
import LogoutButton from './Logout';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="nav">
      <div className="navbar-logo">
        <Link to="/home">CareerHorizon</Link>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>

      {/* Links visible depending on screen size or when menu is open */}
      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/mentors" onClick={() => setMenuOpen(false)}>Mentor</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
      </div>

      <div className="navbar-profile">
        <Link to="/get_profile/">
          <img src="/public/image.png" alt="Profile" className="profile-icon" />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
