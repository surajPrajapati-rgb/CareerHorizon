import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const ProfileStrength = ({ strength }) => {
  return (
    <div className="profile-strength">
      <h6>Your profile strength</h6>
      <ProgressBar now={strength} label={`${strength}%`} />
    </div>
  );
};

export default ProfileStrength;
