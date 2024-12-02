import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toggleon from '../assets/toggleon.svg';
import toggleoff from '../assets/toggleoff.svg';
import notification from '../assets/notification.svg';

// Icons from svgrepo.com
import './NavBar.css';
import LogoutButton from './Logout';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const navigate = useNavigate();



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
        <Link to="" className="toggle">
          <img src={toggleoff} alt="toggleoff" width="35" height="35" />
        </Link>
        <Link to="/notification" className="notification-icon">
          <img src={notification} alt="notification" width="30" height="30" />
        </Link>

        <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

      </div>

      <div className="navbar-profile">
      <Link to="/notification/">
          <img src="/public/notification.png" alt="Profile" className="profile-icon" />
        </Link>
        <Link to="/get_profile/">
          <img src="/public/image.png" alt="Profile" className="profile-icon" />
        </Link>
        
      </div>
    </nav>
  );
}

export default NavBar;
