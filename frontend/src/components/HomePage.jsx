import React, { useState } from 'react';
import './HomePage.css';
import svg from '../assets/chat-svg.svg';
import MentorCategoryFilter from './MentorCategoryFilter';
import ChatPage from './messaging/ChatPage';
import UserProfile from './UserProfile';
import profile from '../assets/profile.svg';
import mentor from '../assets/mentor-icon.svg';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [viewMentors, setViewMentors] = useState(false); // State for mentors
  const [viewChat, setViewChat] = useState(false); // State for chat
  const [viewProfile, setViewProfile] = useState(false); // State for profile
  const [currentSection, setCurrentSection] = useState(""); // State to track the current section

  // Handle the "Your Mentors" click
  const handleMentorClick = () => {
    setViewMentors(true);
    setViewChat(false);
    setViewProfile(false);
    setCurrentSection("Your Mentors");
  };

  // Handle the "Chat" click
  const handleChatClick = () => {
    setViewChat(true);
    setViewMentors(false);
    setViewProfile(false);
    setCurrentSection("Chat");
  };

  // Handle the "Your Profile" click
  const handleProfileClick = () => {
    setViewProfile(true);
    setViewMentors(false);
    setViewChat(false);
    setCurrentSection("Your Profile");
  };

  // Handle the "Back" button click
  const handleBackClick = () => {
    setViewMentors(false);
    setViewChat(false);
    setViewProfile(false);
    setCurrentSection(""); // Reset section name
  };

  

  return (
    <>
      <div className="sidebar">
        <ul>
          {/* Show links for Chat, Mentors, and Profile if no section is selected */}
          {!viewChat && !viewMentors && !viewProfile && (
            <>
              <li style={{ marginLeft: '10px' }} onClick={handleChatClick}>
                <a style={{ cursor: 'pointer' }}>
                  <img src={svg} alt="Chat" width="30" height="30" />
                  <span style={{ margin: '10px' }}>Chat</span>
                </a>
              </li>

              <li style={{ marginLeft: '10px' }} onClick={handleMentorClick}>
                <a style={{ cursor: 'pointer' }}>
                  <img src={mentor} alt="Mentors" width="35" height="35" />
                  <span style={{ margin: '10px' }}>Your Mentors</span>
                </a>
              </li>

              <li style={{ marginLeft: '10px' }} onClick={handleProfileClick}>
                <a style={{ cursor: 'pointer' }}>
                  <img src={profile} alt="Profile" width="25" height="25" />
                  <span style={{ margin: '10px' }}>Your Profile</span>
                </a>
              </li>
            </>
          )}

          {/* Show back button and section name when any section is selected */}
          {(viewChat || viewMentors || viewProfile) && (
            <li style={{ marginLeft: '10px', top: '10px', right: '10px' }}>
              <button onClick={handleBackClick} className="back-btn">
                ←
              </button>
              <span style={{ marginLeft: '10px', fontSize: '20px', fontWeight: 'bold' }}>
                {currentSection}
              </span>
            </li>
          )}
        </ul>
      </div>

      <div className="content-bar">
        {/* Conditionally render content based on selected view */}
        {viewChat && <ChatPage />} {/* Display ChatPage for chat */}

        {viewMentors && (
          <div className="mentor-cards">
            <div className="mentor-card">
              <h3>Jane Doe</h3>
              <p>Full Stack Developer</p>
              <button>View Profile</button>
            </div>
            <div className="mentor-card">
              <h3>John Smith</h3>
              <p>Data Scientist</p>
              <button>View Profile</button>
            </div>
            <div className="mentor-card">
              <h3>Mary Johnson</h3>
              <p>AI Specialist</p>
              <button>View Profile</button>
            </div>
          </div>
        )}

        {viewProfile && <UserProfile />}

        {/* Default Mentor Category Filter when no section is selected */}
        {!viewChat && !viewMentors && !viewProfile && <MentorCategoryFilter />}
      </div>
    </>
  );
};

export default HomePage;
