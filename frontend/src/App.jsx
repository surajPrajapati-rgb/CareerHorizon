import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import Logout from './components/Logout';
import NavBar from './components/NavBar';
import MentorPage from './components/MentorPage';
// import CoursesPage from './components/CoursePage';
import MentorProfile from './components/MentorProfile';
import CourseList from './components/CourseList';
import coursesData from './data/courses.json'; 

function App() {
  return (
    <Router>
      <NavBar /> {/* Navigation Bar Added */}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:user_id" element={<ProfilePage />} />
        <Route path="/mentors" element={<MentorPage />} />
        <Route path="/mentors/:mentorId" element={<MentorProfile />} />
        <Route path="/courses" element={<CourseList courses={coursesData} />} />
        {/* <Route path="/courses" element={<CoursesPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
