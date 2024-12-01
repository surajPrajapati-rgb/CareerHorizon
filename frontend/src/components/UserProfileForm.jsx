import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const UserProfileForm = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    country: '',
    profile_photo: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.email) {
        setMessage('User not logged in');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://careerhorizon-vfpx.onrender.com/user_profile/api/profile/', {
          params: { email: user.email },
        });
        setFormData(response.data);
      } catch (err) {
        setMessage('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setMessage('');
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      setFormData({ ...formData, [name]: file });
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (value) {
        formDataToSend.append(key, value);
      }
    });

    try {
      await axios.post('https://careerhorizon-vfpx.onrender.com/user_profile/api/profile/', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      {message && <p>{message}</p>}

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', margin: '8px 0' }}
        />
      </div>

      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '8px 0' }}
        />
      </div>

      <div>
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '8px 0' }}
        />
      </div>

      <div>
        <label>Profile Photo:</label>
        <input
          type="file"
          name="profile_photo"
          onChange={handleFileChange}
          style={{ width: '100%', padding: '8px', margin: '8px 0' }}
        />
      </div>

      <button type="submit" disabled={isSubmitting} style={{ padding: '10px', marginTop: '10px' }}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default UserProfileForm;