import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const UserProfile = () => {
  const { user } = useContext(UserContext); 
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/login'); // Redirect to the login page
  };
  

  useEffect(() => {
    if (!user?.email) {
      setError('User email is missing');
      setIsLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://careerhorizon-vfpx.onrender.com/user_profile/api/profile/', {
          params: { email: user.email },
        });
        setProfile(response.data);
      } catch (err) {
        setError('Failed to fetch user profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user?.email]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>User Profile</h2>
      {profile ? (
        <div style={{ textAlign: 'left' }}>
          <p><strong>Name:</strong> {profile.name || 'N/A'}</p>
          <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {profile.phone_number || 'N/A'}</p>
          <p><strong>Country:</strong> {profile.country || 'N/A'}</p>

          {profile.profile_photo && (
            <div>
              <img
                src={profile.profile_photo}
                alt="Profile"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  margin: '10px 0',
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <p>No profile data available</p>
      )}
      <div>
                  <button onClick={handleLogout} className="btn btn-danger align-items-center justify-content-center">
                    Logout
                  </button>

                </div>
    </div>
  );
};

export default UserProfile;