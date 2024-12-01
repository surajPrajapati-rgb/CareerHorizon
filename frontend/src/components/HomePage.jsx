import React, { useState } from "react";
import "./HomePage.css";
import MentorList from "./MentorList";

const HomePage = () => {
  // State to toggle between showing the mentor list and static mentors
  const [showStaticMentors, setShowStaticMentors] = useState(false);

  // Static list of mentors
  const mentors = [
    {
      id: 1,
      name: "John Doe",
      expertise: "Full Stack Development and Cloud Architecture",
    },
    {
      id: 2,
      name: "Jane Smith",
      expertise: "Data Scientist specializing in AI and Machine Learning",
    },
    {
      id: 3,
      name: "Emily Davis",
      expertise: "Career Coach with expertise in Tech and Startups",
    },
  ];

  // Handle the button click to show static mentors
  const handleShowStaticMentors = () => {
    setShowStaticMentors(true);
  };

  // Handle the button click to show mentor list again
  const handleShowMentorList = () => {
    setShowStaticMentors(false);
  };

  return (
    <div className="home-page">
      {/* Sidebar */}
      <aside className="sidebar">
        {/* Back Button, only visible when static mentors are displayed */}
        {showStaticMentors && (
          <button className="back-btn" onClick={handleShowMentorList}>
            Back
          </button>
        )}
        <h2>Dashboard</h2>
        <ul>
          <li>
            <a href="#" onClick={handleShowStaticMentors}>
              Your Mentors
            </a>
          </li>
          <li>
            <a href="/chat">Chat</a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h2>{showStaticMentors ? "Your Mentors" : "Available Mentors"}</h2>

        {/* Conditional Rendering: Show Mentor List or Static Mentors */}
        {showStaticMentors ? (
          <div className="mentor-cards">
            {mentors.map((mentor) => (
              <div className="mentor-card" key={mentor.id}>
                <h3>{mentor.name}</h3>
                <p>{mentor.expertise}</p>
                <a href={`/mentors/${mentor.id}`} className="btn">
                  View Profile
                </a>
              </div>
            ))}
          </div>
        ) : (
          <MentorList /> 
        )}
      </main>

      {/* Fixed Buttons at the Bottom */}
      <div className="fixed-buttons">
        <a href="#your-mentors" className="btn btn-fixed" onClick={handleShowStaticMentors}>
          Your Mentors
        </a>
        <a href="/chat" className="btn btn-fixed">Chat</a>
      </div>
    </div>
  );
};

export default HomePage;
