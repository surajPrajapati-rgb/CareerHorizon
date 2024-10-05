import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProfileDetail() {
  const { user_id } = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/profiles/${user_id}/`)
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching the profile:', error);
      });
  }, [user_id]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>Email: {profile.email}</p>
      <p>Bio: {profile.bio}</p>
    </div>
  );
}

export default ProfileDetail;
