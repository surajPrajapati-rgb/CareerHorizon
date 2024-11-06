// src/components/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css'; // Same or shared CSS file for styling

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        // Make the API call to sign up
        const response = await fetch('http://localhost:8000/api/signup/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
      
        // Check if the signup was successful
        if (response.ok) {
          const data = await response.json();
      
          // If token-based authentication is used, store the token
          if (data.token) {
            localStorage.setItem('token', data.token);  // Save token in localStorage or use a global state management
            localStorage.setItem('userEmail', email);
          }
      
          // Redirect to profile page
          navigate('/home');  // Assuming '/profile' is the route for the user profile
        } else {
          setError('Signup failed. Try again.');
        }
      } catch (err) {
        setError('Something went wrong. Please try again later.');
      }      
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="text-center">Sign Up</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <a href="/login">Log in here</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
