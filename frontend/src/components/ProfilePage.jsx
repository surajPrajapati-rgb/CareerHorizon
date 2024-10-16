import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProfilePage.css';  // Import the CSS file

const ProfilePage = () => {
  // const { user_id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const userEmail = localStorage.getItem('userEmail');
  console.log("User Email:", userEmail);
  

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userEmail) {
        console.error("No email found for the logged-in user.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/profiles/get_profile_by_email/', {
          email: userEmail,
        });
        setProfile(response.data);
        console.log("Profile Data:", response.data);
      } catch (error) {
        console.error('Error fetching profile data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userEmail]);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await axios.get(`http://127.0.0.1:8000/api/profiles/${user_id}/`);
  //       setProfile(response.data);
  //     } catch (error) {
  //       console.error('Error fetching profile data', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProfile();
  // }, [user_id]);

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{profile.name}</h1>
        <p>Email: {profile.email}</p>
      </div>

      <div className="profile-detail">Phone Number: {profile.phone_number || 'N/A'}</div>
      <div className="profile-detail">Date of Birth: {profile.date_of_birth || 'N/A'}</div>
      <div className="profile-detail">Gender: {profile.gender}</div>
      <div className="profile-detail">Headline: {profile.headline || 'N/A'}</div>
      <div className="profile-detail">Bio: {profile.bio || 'N/A'}</div>
      <div className="profile-detail">Preferred Learning Mode: {profile.preferred_learning_mode}</div>
      
      <h2 className="section-heading">Social Media Links</h2>
      <div className="profile-detail">GitHub: <a href={profile.social_links?.github_profile} target="_blank" rel="noopener noreferrer">{profile.social_links?.github_profile}</a></div>
      <div className="profile-detail">LinkedIn: <a href={profile.social_links?.linkedin_profile} target="_blank" rel="noopener noreferrer">{profile.social_links?.linkedin_profile}</a></div>
      <div className="profile-detail">Twitter: <a href={profile.social_links?.twitter_profile} target="_blank" rel="noopener noreferrer">{profile.social_links?.twitter_profile}</a></div>
      <div className="profile-detail">Portfolio: <a href={profile.social_links?.portfolio_url} target="_blank" rel="noopener noreferrer">{profile.social_links?.portfolio_url}</a></div>

      {profile.user_type === 'professional' && profile.professional_details && (
        <div className="professional-details">
          <h2 className="section-heading">Professional Details</h2>
          <div className="profile-detail">Company: {profile.professional_details.company_name}</div>
          <div className="profile-detail">Job Title: {profile.professional_details.job_title}</div>
          <div className="profile-detail">Experience: {profile.professional_details.years_of_experience} years</div>
        </div>
      )}

      {profile.user_type === 'student' && profile.student_details && (
        <div className="student-details">
          <h2 className="section-heading">Student Details</h2>
          <div className="profile-detail">University: {profile.student_details.university_name}</div>
          <div className="profile-detail">Degree: {profile.student_details.degree}</div>
          <div className="profile-detail">Field of Study: {profile.student_details.field_of_study}</div>
          <div className="profile-detail">Graduation Year: {profile.student_details.graduation_year}</div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
