// src/components/TestimonialsSection.jsx
import React from 'react';
import TestimonialCard from './TestimonialCard';
import './TestimonialsSection.css'; // Add custom styles for section

const testimonialsData = [
  {
    quote: "Because of this course I was able to clear my two interviews... Thanks for making such wonderful content.",
    name: "Diksha S",
    initials: "DS",
    courseTitle: "Business Intelligence (BI)",
    courseLink: "/courses/bi"
  },
  {
    quote: "This has helped me so much in my career...I joined as a frontend engineer and transitioned to full-stack engineer with the help of this course.",
    name: "Chethan B",
    initials: "CB",
    courseTitle: "Go (Golang)",
    courseLink: "/courses/golang"
  },
  {
    quote: "Today, I am a software developer, and I credit a significant part of my success to the solid foundation laid by this course.",
    name: "Batchu K",
    initials: "BK",
    courseTitle: "Java",
    courseLink: "/courses/java"
  },
  {
    quote: "I would highly recommend this Web Development Bootcamp to anyone interested in pursuing a career in web development or enhancing their skills in this field.",
    name: "Ankit K",
    initials: "AK",
    courseTitle: "Web Development",
    courseLink: "/courses/webdev"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <h2>See what others are achieving through learning</h2>
      <div className="testimonials-grid">
        {testimonialsData.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
