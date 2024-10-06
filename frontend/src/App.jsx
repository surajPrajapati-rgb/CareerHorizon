import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './components/ProfilePage';
import Logout from './components/Logout';

function App() {

  return (
        <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<Logout />} />
          {/* <Route path='/home' element = {<HomePage/>}/> */}
          <Route path="/home"
            element={
            <ProtectedRoute>
              <HomePage /> {/* Only accessible if logged in */}
            </ProtectedRoute>
          }
        />
          {/* <Route path="/home" element={<HomePage />} /> */}
          <Route path="/profile/:user_id" element={<ProfilePage />} />
          {/* <ProfilePage userId={1} />  */}
        </Routes>
      </Router>
  );
}

export default App;
