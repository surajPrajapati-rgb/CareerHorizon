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
import MentorProfile from './components/MentorProfile';
import CourseList from './components/CourseList';
import ProtectedRoute from './components/ProtectedRoute'; // Import your ProtectedRoute component
import coursesData from './data/courses.json';
import CareerExplorer from './components/CareerExplorer';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<Logout />} />
        
        {/* Protected Routes with NavBar */}
        <Route 
          path="/*" 
          element={
            <ProtectedRoute>
              <NavBar />
              <Routes>
                <Route path="home" element={<HomePage />} />
                {/* <Route path="profile/:user_id" element={<ProfilePage />} /> */}
                <Route path="profile/" element={<ProfilePage />} />
                <Route path="mentors" element={<MentorPage />} />
                <Route path="mentors/:mentorId" element={<MentorProfile />} />
                <Route path="explore/" element={<CareerExplorer />} />
                <Route path="courses" element={<CourseList courses={coursesData} />} />
              </Routes>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
