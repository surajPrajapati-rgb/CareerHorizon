// BackendDeveloper.jsx
import React from 'react';
import styles from './BackendDeveloper.module.css';

const BackendDeveloper = () => {
  return (
    <div>
      {/* Header Section */}
      <header className={styles.header}>
        <h1>Backend Developer</h1>
        <p>Build and maintain the systems that power the functionality behind the scenes, enabling seamless user experiences.</p>
      </header>

      {/* Overview Section */}
      <section className={styles.overview}>
        <h2>Overview</h2>
        <p>Backend Developers are responsible for server-side web application logic and integration. They work with databases, APIs, and server frameworks to build scalable and efficient applications, playing a crucial role in modern software development.</p>
      </section>

      {/* Key Responsibilities Section */}
      <section className={styles.responsibilities}>
        <h2>Key Responsibilities</h2>
        <ul>
          <li>Design and develop server-side logic, databases, and APIs.</li>
          <li>Ensure security, scalability, and efficiency of applications.</li>
          <li>Collaborate with frontend developers and other teams to integrate user-facing elements.</li>
          <li>Maintain, optimize, and troubleshoot server-side components.</li>
          <li>Manage and deploy application databases, backups, and server resources.</li>
        </ul>
      </section>

      {/* Skills Section */}
      <section className={styles.skills}>
        <h2>Skills Required</h2>
        <div className={styles.skillsList}>
          <div className={styles.skill}>
            <h3>Programming Languages</h3>
            <p>Proficiency in languages such as Python, Java, Ruby, and PHP for backend development.</p>
          </div>
          <div className={styles.skill}>
            <h3>Database Management</h3>
            <p>Experience with relational databases like MySQL, PostgreSQL, and NoSQL databases like MongoDB.</p>
          </div>
          <div className={styles.skill}>
            <h3>API Development</h3>
            <p>Knowledge of RESTful and GraphQL APIs to enable seamless front-backend integration.</p>
          </div>
          <div className={styles.skill}>
            <h3>Version Control</h3>
            <p>Proficiency with Git for collaborative coding and version control.</p>
          </div>
          <div className={styles.skill}>
            <h3>Security and Compliance</h3>
            <p>Understanding of data protection, user authentication, and security best practices.</p>
          </div>
          <div className={styles.skill}>
            <h3>Cloud Platforms</h3>
            <p>Experience with AWS, Azure, or Google Cloud for server deployment and maintenance.</p>
          </div>
        </div>
      </section>

      {/* Career Pathway Section */}
      <section className={styles.careerPathway}>
        <h2>Career Pathway</h2>
        <p>Start as a Junior Backend Developer or Software Engineer, then advance to Mid-level and Senior Backend Developer roles. From there, you can grow into Technical Lead, Engineering Manager, and even CTO roles.</p>
      </section>

      {/* How to Become a Backend Developer Section */}
      <section className={styles.howToBecome}>
        <h2>How to Become a Backend Developer</h2>
        <ol>
          <li><strong>Step 1:</strong> Learn programming languages commonly used in backend development, such as Python, Java, or Node.js.</li>
          <li><strong>Step 2:</strong> Gain experience with database management and server-side frameworks.</li>
          <li><strong>Step 3:</strong> Work on real-world projects to apply your skills and build a portfolio.</li>
          <li><strong>Step 4:</strong> Master essential tools like Git and understand best practices in API development.</li>
          <li><strong>Step 5:</strong> Consider certifications or online courses in cloud computing and backend frameworks.</li>
        </ol>
      </section>

      {/* Expert Guidance Section */}
      <section className={styles.guidance}>
        <h2>Guidance from Experts</h2>
        <p>Connect with mentors and experts to gain insights on backend development best practices and career growth.</p>
        <ul>
          <li><a href="https://www.linkedin.com/learning/" target="_blank" rel="noopener noreferrer">LinkedIn Learning</a> - Courses and mentorship for backend development.</li>
          <li><a href="https://www.adplist.org/" target="_blank" rel="noopener noreferrer">ADPList</a> - Find mentors specializing in backend technologies.</li>
          <li><a href="https://mentorcruise.com/" target="_blank" rel="noopener noreferrer">MentorCruise</a> - Personalized mentorship from experienced backend developers.</li>
        </ul>
      </section>

      {/* Popular Stories / Blogs Section */}
      <section className={styles.stories}>
        <h2>Popular Stories & Blogs</h2>
        <div className={styles.storiesCards}>
          <div className={styles.storyCard}>
            <h3><a href="https://medium.com/" target="_blank" rel="noopener noreferrer">Life as a Backend Developer</a></h3>
            <p>Read about the journey of backend developers, from overcoming challenges to mastering new technologies.</p>
          </div>
          <div className={styles.storyCard}>
            <h3><a href="https://roadmap.sh/backend" target="_blank" rel="noopener noreferrer">Backend Developer Roadmap</a></h3>
            <p>A roadmap covering core technologies, best practices, and career advice.</p>
          </div>
          <div className={styles.storyCard}>
            <h3><a href="https://www.dev.to/" target="_blank" rel="noopener noreferrer">Dev.to Blog</a></h3>
            <p>Stay updated on trends, tools, and tips for backend developers from the developer community.</p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className={styles.video}>
        <h2>What is a Backend Developer?</h2>
        <div className={styles.videoFrame}>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/sample-video" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </section>
    </div>
  );
};

export default BackendDeveloper;
