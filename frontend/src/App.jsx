// src/App.jsx
import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CourseCard from './components/CourseCard';
import './App.css';
import ExploreSection from './components/ExploreSection';
import LandingPageNavbar from './components/LandingPageNavbar';
import TestimonialsSection from './components/TestimonialsSection';

const App = () => {
  const courses = [
    {
      title: "Mastering Interaction Design",
      description: "Learn the core principles of interaction design and practical techniques.",
      author: "Luis Mark",
      image: "/src/assets/course1.png",
      discountedPrice: 0.00,
      originalPrice: 69.99,
      tags: ["FREE", "EVENTS", "BEGINNER"]
    },
    {
      title: "Apple HIG Mastery: UI Design",
      description: "Design seamless user interfaces aligned with Human Interface Guidelines.",
      author: "Luis Mark",
      image: "/src/assets/course2.png",
      discountedPrice: 66.66,
      originalPrice: 369.99,
      tags: ["BEGINNER", "EVENTS"]
    },
    {
      title: "Creating Impactful Icons: Design Techniques",
      description: "Master icon design from concept development to polished visuals.",
      author: "Luis Mark",
      image: "/src/assets/course3.png",
      discountedPrice: 10.00,
      originalPrice: 100.00,
      tags: ["BEGINNER", "EVENTS"]
    }
  ];

  return (
    <>
      <div className="app-container">
        <LandingPageNavbar />
        <Header />
        <ExploreSection />
        <section className="course-list">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </section>
        <ExploreSection />
        <TestimonialsSection/>
        </div>
    </>
  );
};

export default App;
