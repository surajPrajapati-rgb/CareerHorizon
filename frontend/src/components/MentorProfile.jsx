
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MentorProfile.css';


const MentorProfile = () => {
    const { mentorId } = useParams();  // Get mentorId from the URL
    // console.log("mentorId:", mentorId);
    const [mentorData, setMentorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMentorData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/mentorship/mentors/${mentorId}/`);
                setMentorData(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching mentor data');
                setLoading(false);
            }
        };

        fetchMentorData();
    }, [mentorId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="mentor-profile container">
        <div>
            <h1>{mentorData.name}</h1>
            {mentorData.profile_photo && <img src={mentorData.profile_photo} alt={mentorData.name} />}
            <p>Field of Study: {mentorData.field_of_study}</p>
            <p>Degree: {mentorData.degree}</p>
            <p>Bio: {mentorData.bio}</p>

            <h2>Availability Slots</h2>
            {mentorData.availability_slots.map((slot, index) => (
                <p key={index}>{slot.day_of_week}: {slot.start_time} - {slot.end_time}</p>
            ))}

            <h2>Expertise</h2>
            {mentorData.expertise_areas.map((expertise, index) => (
                <div key={index}>
                    <p>Topic: {expertise.topic}</p>
                    <p>{expertise.description}</p>
                </div>
            ))}

            <h2>Experience</h2>
            {mentorData.experiences.map((experience, index) => (
                <div key={index}>
                    <p>{experience.role} at {experience.organization}</p>
                    <p>{experience.field}</p>
                    <p>From {experience.start_date} to {experience.end_date || "Present"}</p>
                </div>
            ))}

            <h2>Education</h2>
            {mentorData.education.map((edu, index) => (
                <div key={index}>
                    <p>{edu.degree} in {edu.field_of_study} from {edu.institution_name}</p>
                    <p>Year: {edu.start_year} - {edu.end_year || "Present"}</p>
                </div>
            ))}

            <h2>Sessions</h2>
            {mentorData.sessions.map((session, index) => (
                <div key={index}>
                    <p>Session with {session.mentee_name} on {new Date(session.session_date).toLocaleString()}</p>
                    <p>Duration: {session.duration}</p>
                    <p>Status: {session.status}</p>
                    <p>Notes: {session.notes}</p>
                </div>
            ))}
        </div>
        </div>
    );
};

export default MentorProfile;
