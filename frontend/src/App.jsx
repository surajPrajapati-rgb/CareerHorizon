import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProfileDetail from './components/ProfileDetail';

function App() {
  const [students, setStudents] = useState([]);  // Initialize students as an empty array


  useEffect(() => {
    // Fetch the student data from the Django backend
    axios.get('http://localhost:8000/api/students/')
      .then(response => setStudents(response.data))  // Set the response data to the state
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    
        <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile/:user_id" element={<ProfileDetail />} />
        </Routes>
      </Router>
      
  );
}

export default App;
