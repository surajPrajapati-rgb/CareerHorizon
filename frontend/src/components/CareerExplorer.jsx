import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./ExploreCareer.module.css";

const ExploreCareer = () => {
  const navigate = useNavigate();
  const careers = [
    { title: "Software Development", description: "Create applications and software solutions." },
    { title: "Data Science", description: "Analyze data and build machine learning models." },
    { title: "Cybersecurity", description: "Protect systems and networks from threats." },
    { title: "Web Development", description: "Design and build web applications." },
    { title: "Digital Marketing", description: "Promote brands through digital channels." },
    { title: "SEO Specialist", description: "Optimize websites for search engines." },
    { title: "Content Creation", description: "Craft engaging content for audiences." },
    { title: "Business Analysis", description: "Analyze and improve business processes." },
    { title: "Entrepreneurship", description: "Start and manage your own business." },
    { title: "Project Management", description: "Oversee projects from start to finish." },
    { title: "Graphic Design", description: "Visual storytelling through graphics." },
    { title: "UX/UI Design", description: "Design intuitive user experiences." },
    { title: "Animation", description: "Create motion graphics and animations." },
    { title: "Public Relations", description: "Build and maintain a positive brand image." },
    { title: "Journalism", description: "Report and communicate news stories." },
    { title: "Social Media Management", description: "Manage and grow online communities." },
  ];

  return (
    <div>
      <header className={styles.heroSection}>
        <h1>Explore Your Career Path</h1>
        <p>Discover your ideal path in the world of technology and creativity</p>
        <button onClick={() => window.location.href = '#career-paths'}>
          Explore Careers
        </button>
      </header>
      
      <section id="career-paths" className={styles.careerPathsSection}>
      <h2>Career Paths</h2>
        <div className={styles.cardContainer}>
          {careers.map((career, index) => (
            <div
              key={index}
              className={styles.careerCard}
              onClick={() => navigate('/career-path')}
            >
              <h3>{career.title}</h3>
              <p>{career.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExploreCareer;
