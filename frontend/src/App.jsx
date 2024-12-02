import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './components/HomePage';
// import ProfilePage from './components/ProfilePage';
import Logout from './components/Logout';
import NavBar from './components/NavBar';
import MentorPage from './components/MentorPage';
import MentorProfile from './components/MentorProfile';
import ProtectedRoute from './components/ProtectedRoute'; // Import your ProtectedRoute component
import BackendDeveloper from './components/BackendDeveloper';
import MentorList from './components/MentorList';
import ChatBox from './components/messaging/ChatBox';
import ChatPage from './components/messaging/ChatPage';
import { UserProvider } from './context/UserContext';
import UserProfileForm from './components/UserProfileForm';
import UserProfile from './components/UserProfile';


function App() {
  return (
    <UserProvider>
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
              <div style={{height: '65px'}}></div>
              <Routes>
                <Route path="home" element={<HomePage />} />
                <Route path="get_profile/" element={<UserProfile />} />
                <Route path="edit_profile/" element={<UserProfileForm />} />
                <Route path="mentors/:mentorId" element={<MentorProfile />} />
                <Route path="/chat" element={<ChatPage />} />
              </Routes>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
