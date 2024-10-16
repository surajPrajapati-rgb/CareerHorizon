import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseDetails.css';

// Import the JSON data
import coursedetails from '../data/coursedetails.json';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [course, setCourse] = useState(null);

  // Fetch course data based on id
  useEffect(() => {
    // Find the course by matching the ID
    const selectedCourse = coursedetails.find(course => course.id === parseInt(id));

    // If course is not found, navigate back to courses or show error
    if (!selectedCourse) {
      navigate('/courses');
    } else {
      setCourse(selectedCourse);
    }
  }, [id, navigate]);

  if (!course) {
    return <div>Loading...</div>; // Show a loading state or message if course is null
  }

  return (
    <div className="course-details-container">
      {/* Header Section */}
      <div className="course-header">
        <button className="back-button" onClick={() => navigate('/courses')}>
          ← Back to Courses
        </button>
        <h1>{course.title}</h1>
        <div className="course-meta">
          <span className="instructor">By {course.instructor}</span>
          <div className="rating">
            <span>★ {course.rating}</span>
            <span>({course.studentsEnrolled} students)</span>
          </div>
          <span className="last-updated">Last updated: {course.lastUpdated}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="course-content">
        <div className="content-left">
          {/* Navigation Tabs */}
          <div className="content-tabs">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab ${activeTab === 'curriculum' ? 'active' : ''}`}
              onClick={() => setActiveTab('curriculum')}
            >
              Curriculum
            </button>
            <button 
              className={`tab ${activeTab === 'instructor' ? 'active' : ''}`}
              onClick={() => setActiveTab('instructor')}
            >
              Instructor
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-content">
                <section className="description">
                  <h2>Course Description</h2>
                  <p>{course.description}</p>
                </section>

                <section className="learning-outcomes">
                  <h2>What you'll learn</h2>
                  <ul>
                    {course.learningOutcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </section>

                <section className="prerequisites">
                  <h2>Prerequisites</h2>
                  <ul>
                    {course.prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))}
                  </ul>
                </section>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="curriculum-content">
                <h2>Course Curriculum</h2>
                {course.curriculum.map((week, index) => (
                  <div className="week-block" key={index}>
                    <h3>Week {week.week}: {week.title}</h3>
                    <ul>
                      {week.topics.map((topic, topicIndex) => (
                        <li key={topicIndex}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'instructor' && (
              <div className="instructor-content">
                <h2>About the Instructor</h2>
                <div className="instructor-profile">
                  <div className="instructor-info">
                    <h3>{course.instructor}</h3>
                    <p>Professional Web Developer & Instructor</p>
                    <p className="instructor-stats">
                      <span>4.8 Instructor Rating</span>
                      <span>•</span>
                      <span>50,000+ Students</span>
                      <span>•</span>
                      <span>15 Courses</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Course Purchase Card */}
        <div className="content-right">
          <div className="purchase-card">
            <div className="price-section">
              <span className="current-price">${course.price}</span>
              {course.originalPrice && (
                <span className="original-price">${course.originalPrice}</span>
              )}
            </div>
            <button className="enroll-button">Enroll Now</button>
            <div className="course-includes">
              <h3>This course includes:</h3>
              <ul>
                <li>{course.duration} of content</li>
                <li>30 coding exercises</li>
                <li>5 projects</li>
                <li>Lifetime access</li>
                <li>Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
