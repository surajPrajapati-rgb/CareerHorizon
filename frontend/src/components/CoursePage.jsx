import React from 'react';
import './CoursePage.css'; // Add custom styling

const CoursesPage = () => {
  const courses = [
    { id: 1, name: 'Docker', description: 'Learn Docker from scratch to deployment.' },
    { id: 2, name: 'Kubernetes', description: 'Master Kubernetes orchestration and management.' },
    { id: 3, name: 'Open Source', description: 'Contribute to and understand open-source projects.' },
    { id: 4, name: 'Cybersecurity', description: 'Learn the essentials of cybersecurity and threat protection.' },
    { id: 5, name: 'Cloud Computing', description: 'Explore AWS, Azure, and Google Cloud.' },
    { id: 6, name: 'AI & Machine Learning', description: 'Dive into AI concepts, tools, and techniques.' },
    { id: 7, name: 'DevOps', description: 'Learn DevOps tools and practices.' },
    { id: 8, name: 'Blockchain', description: 'Understand the fundamentals of blockchain technology.' },
    { id: 9, name: 'Data Engineering', description: 'Learn to build robust data pipelines.' },
  ];

  return (
    <div className="courses-page">
      <h1>Available Courses</h1>
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <button className="course-btn">Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;