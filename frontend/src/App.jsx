import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProfileDetail from './components/ProfileDetail';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
        <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path='/home' element = {<HomePage/>}/> */}
          <Route path="/home"
            element={
            <ProtectedRoute>
              <HomePage /> {/* Only accessible if logged in */}
            </ProtectedRoute>
          }
        />
          {/* <Route path="/home" element={<HomePage />} /> */}
          <Route path="/profile/:user_id" element={<ProfileDetail />} />
        </Routes>
      </Router>
  );
}

export default App;
