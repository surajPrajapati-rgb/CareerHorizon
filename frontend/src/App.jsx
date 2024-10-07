import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import Logout from './components/Logout';
import NavBar from './components/NavBar';
import MentorPage from './components/MentorPage';
import CoursesPage from './components/CoursePage';

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
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
