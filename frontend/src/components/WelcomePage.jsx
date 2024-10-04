// src/components/WelcomePage.jsx
import React from 'react';
import './WelcomePage.css'; // Add custom styles here

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      {/* Hero Section */}
      <section className="hero-section text-center text-white bg-primary py-5">
        <div className="container">
          <h1 className="display-4">Bridging the Gap Between Learning and Careers</h1>
          <p className="lead">
            Connect the dots between education and industry with curated learning paths, mentor guidance, and free content from top platforms.
          </p>
          <div className="mt-4">
            <a href="/signup" className="btn btn-lg btn-light mx-2">Sign Up</a>
            <a href="/login" className="btn btn-lg btn-outline-light mx-2">Login</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Key Features</h2>
          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <div className="card feature-card shadow-sm h-100">
                <div className="card-body">
                  <div className="feature-icon mb-3 text-primary">
                    <i className="bi bi-person-check display-3"></i>
                  </div>
                  <h5 className="card-title">Personalized Recommendations</h5>
                  <p className="card-text">Curated learning paths based on your interests and career goals.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card feature-card shadow-sm h-100">
                <div className="card-body">
                  <div className="feature-icon mb-3 text-success">
                    <i className="bi bi-people display-3"></i>
                  </div>
                  <h5 className="card-title">Mentor Guidance</h5>
                  <p className="card-text">Connect with industry experts for tailored career advice.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card feature-card shadow-sm h-100">
                <div className="card-body">
                  <div className="feature-icon mb-3 text-info">
                    <i className="bi bi-graph-up display-3"></i>
                  </div>
                  <h5 className="card-title">Track Your Progress</h5>
                  <p className="card-text">Monitor your course progress and stay on track.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card feature-card shadow-sm h-100">
                <div className="card-body">
                  <div className="feature-icon mb-3 text-warning">
                    <i className="bi bi-journal-code display-3"></i>
                  </div>
                  <h5 className="card-title">Free Content</h5>
                  <p className="card-text">Access top resources from platforms like Coursera, edX, and more.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Previews/Popular Courses */}
      <section className="courses-section text-center py-5 bg-light">
        <div className="container">
          <h2 className="mb-4">Popular Courses</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="course-card p-3 bg-white shadow-sm h-100">
                <h5>Web Development Bootcamp</h5>
                <p>Learn to build modern websites from scratch.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="course-card p-3 bg-white shadow-sm h-100">
                <h5>Data Science Bootcamp</h5>
                <p>Master data analysis and machine learning techniques.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="course-card p-3 bg-white shadow-sm h-100">
                <h5>Soft Skills for Industry</h5>
                <p>Boost your communication and teamwork skills.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/Success Stories */}
      <section className="testimonials-section text-center py-5">
        <div className="container">
          <h2 className="mb-4">What Our Users Say</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="testimonial-card p-4 bg-white shadow">
                <p>"This platform helped me find the right courses for my career transition!"</p>
                <strong>- John Doe, Data Analyst</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card p-4 bg-white shadow">
                <p>"Thanks to my mentor, I was able to get hands-on guidance and improve my skills."</p>
                <strong>- Sarah Lee, Frontend Developer</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card p-4 bg-white shadow">
                <p>"The free resources and personalized recommendations were game changers."</p>
                <strong>- Alex Smith, Software Engineer</strong>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="footer bg-dark text-white text-center py-3">
        <div className="container">
          <p>© 2024 Your Platform. All rights reserved.</p>
          <a href="/about" className="text-white mx-2">About Us</a>
          <a href="/contact" className="text-white mx-2">Contact</a>
          <a href="/terms" className="text-white mx-2">Terms of Service</a>
          <a href="/privacy" className="text-white mx-2">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
