import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./MentorDetails.css";
import InviteSection from "./mentors/InviteSection";

const MentorDetail = () => {
  const { mentor_id } = useParams(); // Get mentor_id from URL params
  const [mentor, setMentor] = useState(null);
  const [activeTab, setActiveTab] = useState("Reviews");

  const handleTabClick = (tab) => setActiveTab(tab);

  useEffect(() => {
    const fetchMentor = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/mentors/${mentor_id}`
      );
      const data = await response.json();
      setMentor(data.mentor);
    };

    fetchMentor();
  }, [mentor_id]);

  if (!mentor) {
    return <div>Loading...</div>;
  }

  return (
   <>
    <div className="mentor-details-container">
    <button class="booking-button">Book Now</button>
    <InviteSection/>
      {/* Mentor Header Section */}
      <div className="mentor-header">
        <img
          src={mentor.mentor_image_url}
          alt={mentor.mentor_name}
          className="mentor-profile-pic"
        />
        <h1>{mentor.mentor_name}</h1>
        <p className="mentor-title">{mentor.bio}</p>
      </div>

      {/* Tabs Section */}
      <div className="mentor-tabs">
        {["Overview", "Reviews", "Group sessions"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active-tab" : ""}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Reviews Section */}
      {activeTab === "Reviews" && (
        <div className="reviews-section">
          <div className="ratings">
            <div>
              <p>Communication</p>
              <div className="progress-bar">
                <div style={{ width: "94%" }}></div>
              </div>
              <span>94%</span>
            </div>
            <div>
              <p>Problem Solving</p>
              <div className="progress-bar">
                <div style={{ width: "91%" }}></div>
              </div>
              <span>91%</span>
            </div>
            <div>
              <p>Motivational</p>
              <div className="progress-bar">
                <div style={{ width: "91%" }}></div>
              </div>
              <span>91%</span>
            </div>
            <div>
              <p>Subject Knowledge</p>
              <div className="progress-bar">
                <div style={{ width: "94%" }}></div>
              </div>
              <span>94%</span>
            </div>
          </div>

          {/* Review Text */}
          <div className="review-content">
            <h3>Real experiences with mentor</h3>
            <p>
              Think twice before booking an appointment. I wasted 30 min by
              simply seeing the monitor screen. She is not approachable. Most
              of us come here to learn new things but doing these types of
              things leads to disappointment. A small piece of advice to the
              mentor: if you are not available, please don't accept the
              appointment request.
            </p>
            <div className="tags">
              <span className="tag">Not communicator</span>
              <span className="tag">Not motivational</span>
              <span className="tag">Bad problem solver</span>
              <span className="tag">Not Technically competent</span>
              <span className="tag">+1</span>
            </div>
          </div>
        </div>
      )}
    </div>
   </>
  );
};

export default MentorDetail;
