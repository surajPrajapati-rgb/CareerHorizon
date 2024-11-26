import React, { useEffect, useState } from "react";
import axios from "axios";
import MentorCard from "./MentorCard";


const MentorList = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get("https://careerhorizon-vfpx.onrender.com/api/mentor/");
        const mentorData = response.data.data;

        // Shuffle the mentorData array to display in random order
        const shuffledMentors = mentorData.sort(() => Math.random() - 0.5);
        
        setMentors(shuffledMentors);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="mentor-list">
      {mentors.map((mentor) => (
        <MentorCard key={mentor.mentor_id} mentor={mentor} />
      ))}
    </div>
  );
};

export default MentorList;
