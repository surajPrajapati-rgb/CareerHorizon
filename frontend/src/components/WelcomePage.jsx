
import React, { useState } from 'react';
import './WelcomePage.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import backgroundImage from '../assets/coach-mentor.jpeg';
import mentorshipImage from '../assets/mentorship_img.png';

const WelcomePage = () => {
  const [role, setRole] = useState('mentee');

  return (
    <div>
      {/* Navbar */}
      <div className="navbar navbar-expand-lg navbar-light bg-light fixed-top py-3">
        <div className="container">
          <a className="navbar-brand" href="#" style={{ fontWeight: 900 }}>
            CareerHorizon
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="ms-auto d-flex">
              <a href="/login">
                <button
                  className="btn btn-outline-dark me-2"
                  style={{ padding: '10px 15px', fontSize: '14px' }}
                >
                  Login
                </button>
              </a>
              <a href="/signup">
                <button
                  className="btn btn-dark"
                  style={{ padding: '10px 15px', fontSize: '14px' }}
                >
                  Get started today
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          height: '80vh',
          marginTop: '80px',
          backgroundImage: `url(${backgroundImage})`, // Replace with your image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          color: 'white',
        }}
      >
        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2), rgba(0,0,0,0.8))',
            zIndex: 1,
          }}
        ></div>

        {/* Text Content */}
        <Container
          className="text-center py-5"
          style={{ position: 'relative', zIndex: 2, maxWidth: '60%' }}
        >
          <div className="d-flex justify-content-center gap-4">
            {/* Clickable Text Options */}
            <span
              style={{
                cursor: 'pointer',
                fontWeight: 400,
                fontSize: '1.2rem',
                borderBottom: role === 'mentee' ? '2px solid #ffffff' : 'none',
              }}
              onClick={() => setRole('mentee')}
            >
              Mentee
            </span>
            <span
              style={{
                cursor: 'pointer',
                fontWeight: 400,
                fontSize: '1.2rem',
                borderBottom: role === 'mentor' ? '2px solid #ffffff' : 'none',
              }}
              onClick={() => setRole('mentor')}
            >
              Mentor
            </span>
          </div>
          <div className="mt-4">
            {role === 'mentor' && (
              <div>
                <p
                  className="text-info"
                  style={{
                    fontWeight: 700,
                    fontSize: 'clamp(2rem, 5vw, 4rem)', // Dynamic font size
                    lineHeight: 1.2,
                  }}
                >
                  Your next chapter, made possible by mentoring
                </p>
                <p
                  style={{
                    fontWeight: 300,
                    fontSize: 'clamp(1rem, 3vw, 1.5rem)', // Dynamic font size
                  }}
                >
                  Build confidence as a leader, grow your network, and define your legacy.
                </p>
              </div>
            )}
            {role === 'mentee' && (
              <div>
                <p
                  className="text-info"
                  style={{
                    fontWeight: 700,
                    fontSize: 'clamp(2rem, 5vw, 4rem)', // Dynamic font size
                    lineHeight: 1.2,
                  }}
                >
                  Reach your goals faster with expert mentors
                </p>
                <p
                  style={{
                    fontWeight: 300,
                    fontSize: 'clamp(1rem, 3vw, 1.5rem)', // Dynamic font size
                  }}
                >
                  Accelerate your professional growth with 1:1 expert guidance of 30,691+ mentors in our community.
                </p>
              </div>
            )}
          </div>
        </Container>
      </div>
      <div>
      <Container className="py-4">
  <h1 
    className="text-center mt-5" 
    style={{
      fontWeight: 900,
      fontSize: '2.5rem',  // Adjust font size
      lineHeight: '1.2',   // Adjust line spacing for readability
      margin: '0 auto',    // Center text block horizontally
      maxWidth: '750px',   // Limit width for better readability
    }}
  >
    Transforming your potential
  </h1>
  
  <p 
    style={{
      textAlign: 'center',   // Center-align the paragraph text
      fontSize: '1.25rem',    // Adjust font size for the paragraph
      color: '#555',          // Slightly darker color for better readability
      marginTop: '20px',      // Add some space between the heading and paragraph
      lineHeight: '1.6',      // Improve line spacing for readability
      maxWidth: '700px',      // Limit the paragraph width to align with the heading
      marginLeft: 'auto',     // Center paragraph horizontally
      marginRight: 'auto',
    }}
  >
   Become the best version of yourself by accessing to the perspectives and life experiences of others who've been there, done that.
  </p>
</Container>
<div
        className=""
        style={{
          height: '95vh',
          width: '50%',
          marginInline: 'auto',
          backgroundImage: `url(${mentorshipImage})`, // Replace with your image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      ></div>
      </div>

      {/* Highlights Section */}
      <div className="highlights-section">
        <Container fluid className="py-5 px-5" style={{ backgroundColor: '#f8f9fa' }}>
          <h1 className="text-center mb-5 mt-5" style={{ fontWeight: 700 }}>
            A platform that delivers results
          </h1>
          <Row className="justify-content-center align-items-center mt-5">
            <Col md={3} className="mb-4">
              <Card style={{ height: '250px', border: 'none' }}>
                <Card.Body className="d-flex justify-content-center align-items-center flex-column">
                  <Card.Text className="text-center stylish-text">Career enhanced for</Card.Text>
                  <Card.Text className="text-center large-title">89%</Card.Text>
                  <Card.Text className="text-center subtext">Happy Members</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card style={{ height: '250px', border: 'none' }}>
                <Card.Body className="d-flex justify-content-center align-items-center flex-column">
                  <Card.Text className="text-center stylish-text">Empowered by</Card.Text>
                  <Card.Text className="text-center large-title">200k</Card.Text>
                  <Card.Text className="text-center subtext">Expert Mentors</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card style={{ height: '250px', border: 'none' }}>
                <Card.Body className="d-flex justify-content-center align-items-center flex-column">
                  <Card.Text className="text-center stylish-text">Global community from</Card.Text>
                  <Card.Text className="text-center large-title">149</Card.Text>
                  <Card.Text className="text-center subtext">Countries</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card style={{ height: '250px', border: 'none' }}>
                <Card.Body className="d-flex justify-content-center align-items-center flex-column">
                  <Card.Text className="text-center stylish-text">We have built over</Card.Text>
                  <Card.Text className="text-center large-title">20M+</Card.Text>
                  <Card.Text className="text-center subtext">Connections</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-4">
        <h1 className="text-center mb-5 mt-5" style={{ fontWeight: 700 }}>What our Users say?</h1>
  <Row>
    <Col md={4} className="mb-4">
      <div className="card p-3 h-100">
        <blockquote className="blockquote mb-0 card-body">
          <p>"This platform helped me find the right courses for my career transition!"</p>
          <footer className="blockquote-footer">
            <small className="text-muted">
            John Doe, Data Analyst
            </small>
          </footer>
        </blockquote>
      </div>
    </Col>
    <Col md={4} className="mb-4">
      <div className="card p-3 h-100">
        <blockquote className="blockquote mb-0 card-body">
          <p>"This platform helped me find the right courses for my career transition!"</p>
          <footer className="blockquote-footer">
            <small className="text-muted">
            John Doe, Data Analyst
            </small>
          </footer>
        </blockquote>
      </div>
    </Col>
    <Col md={4} className="mb-4">
      <div className="card p-3 h-100">
        <blockquote className="blockquote mb-0 card-body">
          <p>"Thanks to my mentor, I was able to get hands-on guidance and improve my skills."</p>
          <footer className="blockquote-footer">
            <small className="text-muted">
            Sarah Lee, Frontend Developer
            </small>
          </footer>
        </blockquote>
      </div>
    </Col>
  </Row>
  <Row>
  <Col md={4} className="mb-4">
      <div className="card p-3 h-100">
        <blockquote className="blockquote mb-0 card-body">
          <p>"Thanks to my mentor, I was able to get hands-on guidance and improve my skills."</p>
          <footer className="blockquote-footer">
            <small className="text-muted">
            Sarah Lee, Frontend Developer
            </small>
          </footer>
        </blockquote>
      </div>
    </Col>
    <Col md={4} className="mb-4">
      <div className="card p-3 h-100">
        <blockquote className="blockquote mb-0 card-body">
          <p>"The free resources and personalized recommendations were game changers."</p>
          <footer className="blockquote-footer">
            <small className="text-muted">
            Alex Smith, Software Engineer
            </small>
          </footer>
        </blockquote>
      </div>
    </Col>
    <Col md={4} className="mb-4">
      <div className="card p-3 h-100">
        <blockquote className="blockquote mb-0 card-body">
          <p>"The free resources and personalized recommendations were game changers."</p>
          <footer className="blockquote-footer">
            <small className="text-muted">
            Alex Smith, Software Engineer
            </small>
          </footer>
        </blockquote>
      </div>
    </Col>
  </Row>
</Container>

<Container className="py-4">
  <h1 
    className="text-center mt-5" 
    style={{
      fontWeight: 900,
      fontSize: '3.5rem',  // Adjust font size
      lineHeight: '1.2',   // Adjust line spacing for readability
      margin: '0 auto',    // Center text block horizontally
      maxWidth: '700px',   // Limit width for better readability
    }}
  >
    Get started for free in 1 minute or less
  </h1>
  
  <p 
    style={{
      textAlign: 'center',   // Center-align the paragraph text
      fontSize: '1.25rem',    // Adjust font size for the paragraph
      color: '#555',          // Slightly darker color for better readability
      marginTop: '20px',      // Add some space between the heading and paragraph
      lineHeight: '1.6',      // Improve line spacing for readability
      maxWidth: '700px',      // Limit the paragraph width to align with the heading
      marginLeft: 'auto',     // Center paragraph horizontally
      marginRight: 'auto',
    }}
  >
    We want to help you build an epic career with expert mentors. <br />
    From junior to leadership, we are here to grow with you on this journey.
  </p>
</Container>

<Container className="py-4">
  <h1 
    className="text-center mb-5" 
    style={{
      fontWeight: 500,
      fontSize: '3.5rem',
      lineHeight: '1.2',
      margin: '0 auto 0 auto', // Remove top margin, keep horizontal centering
      maxWidth: '700px',
    }}
  >
    <a 
      href="/signup" 
      style={{
        display: 'inline-block',   // Makes the link behave like a block element to style it as a box
        backgroundColor: '#ac4cc2', // Purple background
        color: '#fff',             // White text
        padding: '20px 35px',      // Padding inside the box
        borderRadius: '8px',       // Rounded corners
        textDecoration: 'none',    // Removes underline
        fontWeight: 600,           // Slightly bolder text
        fontSize: '1.5rem',        // Font size for the link
        marginTop: '0',            // Ensure there's no top margin
      }}
    >
      Join free now
    </a>
  </h1>
</Container>





       

      {/* Footer Section */}
      <footer className="footer bg-light text-black text-center py-3" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <p>© 2024 Your Platform. All rights reserved.</p>
          <a href="/about" className="text-black mx-2">About Us</a>
          <a href="/contact" className="text-black mx-2">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
