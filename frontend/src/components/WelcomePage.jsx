// // src/components/WelcomePage.jsx
// import React from 'react';
// import './WelcomePage.css';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap'
// import { useState } from 'react';
// import backgroundImage from '../assets/coach-mentor.jpeg';

// const WelcomePage = () => {
//   const [role, setRole] = useState('mentee');
//   return (
//     <div>
//       <div className="navbar navbar-expand-lg navbar-light bg-light fixed-top py-3" style={{ height: '80px' }}>
//         <div className="container">
//           <a className="navbar-brand" href="#" style={{ fontWeight: 900, }}>CareerHorizon</a>
//           <div className="ms-auto">
//             <a href='/login'><button className="btn btn-outline-dark me-2" style={{ padding: '10px 20px' }}>Login</button></a>
//             <a href='/signup'><button className="btn btn-dark" style={{ padding: '10px 20px' }}>Get started today</button></a>
//           </div>
//         </div>
//       </div>

//       <div
//   className="hero-section"
//   style={{
//     height: '80vh',
//     marginTop: '80px',
//     backgroundImage: `url(${backgroundImage})`, // Replace with your image URL
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     position: 'relative',
//     color: 'white',
//   }}
// >
//   {/* Gradient Overlay */}
//   <div
//     style={{
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2), rgba(0,0,0,0.8))',
      
//       zIndex: 1,
//     }}
//   ></div>

//   <Container
//     className="text-center py-5"
//     style={{ position: 'relative', zIndex: 2, maxWidth: '60%'}} // Ensures content is above the gradient
//   >
//     <div className="d-flex justify-content-center gap-4">
//       {/* Clickable Text Options */}
//       <span
//         style={{
//           cursor: 'pointer',
//           fontWeight: 400,
//           fontSize: '1.5rem',
//           borderBottom: role === 'mentee' ? '2px solid #ffffff' : 'none' // Bottom border effect

//         }}
//         onClick={() => setRole('mentee')}
//       >
//         Mentee
//       </span>
//       <span
//         style={{
//           cursor: 'pointer',
//           fontWeight: 400,
//           fontSize: '1.5rem',
//           borderBottom: role === 'mentor' ? '2px solid #ffffff' : 'none'
//         }}
//         onClick={() => setRole('mentor')}
//       >
//         Mentor
//       </span>
//     </div>
//     <div className="mt-4">
//       {role === 'mentor' && (
//         <div>
//         <p className="text-info" style={{ fontWeight: 700, fontSize: '4rem', }}>Your next chapter, made possible by mentoring</p>
//         <p style={{ fontWeight: 300, fontSize: '1.5rem', }}>Build confidence as a leader, grow your network, and define your legacy.</p>
//       </div>
//       )}
//       {role === 'mentee' && (
//         <div>
//           <p className="text-info" style={{ fontWeight: 700, fontSize: '4rem', }}>Reach your goals faster with expert mentors</p>
//           <p style={{ fontWeight: 300, fontSize: '1.5rem', }}>Accelerate your professional growth with 1:1 expert guidance of 30,691+ mentors in our community.</p>
//         </div>
//       )}
//     </div>
//   </Container>
// </div>


//       <div className='highlights-section'>
//         <Container fluid className="py-5 px-5" style={{ backgroundColor: '#f8f9fa' }}>
//           <h1 className="text-center mb-5 mt-5" style={{ fontWeight: 700 }}>A platform that delivers results</h1>
//           <Row className="justify-content-center align-items-center mt-5">
//             <Col md={3} className="mb-4">
//               <Card style={{ height: '250px', border: 'none' }}>
//                 <Card.Body className="d-flex justify-content-center align-items-center flex-column">
//                   <Card.Text className="text-center stylish-text">Career enhanced for</Card.Text>
//                   <Card.Text className="text-center large-title">89%</Card.Text>
//                   <Card.Text className="text-center subtext">Happy Members</Card.Text>
//                 </Card.Body>

//               </Card>
//             </Col>
//             <Col md={3} className="mb-4">
//               <Card style={{ height: '250px', border: 'none' }}>
//                 <Card.Body className="d-flex justify-content-center align-items-center flex-column">
//                   <Card.Text className="text-center stylish-text">Empowered by</Card.Text>
//                   <Card.Text className="text-center large-title">200k</Card.Text>
//                   <Card.Text className="text-center subtext">Expert Mentors</Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={3} className="mb-4">
//               <Card style={{ height: '250px', border: 'none' }}>
//                 <Card.Body className="d-flex justify-content-center align-items-center flex-column">
//                   <Card.Text className="text-center stylish-text">Global community from</Card.Text>
//                   <Card.Text className="text-center large-title">149</Card.Text>
//                   <Card.Text className="text-center subtext">Countries</Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={3} className="mb-4">
//               <Card style={{ height: '250px', border: 'none' }}>
//                 <Card.Body className="d-flex justify-content-center align-items-center flex-column">
//                   <Card.Text className="text-center stylish-text">We have built over</Card.Text>
//                   <Card.Text className="text-center large-title">20M+</Card.Text>
//                   <Card.Text className="text-center subtext">Connections</Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>


//       </div>

//       <section className="testimonials-section text-center py-5">
//         <div className="container">
//           <h2 className="mb-4">What Our Users Say</h2>
//           <div className="row">
//             <div className="col-md-4">
//               <div className="testimonial-card p-4 bg-white shadow">
//                 <p>"This platform helped me find the right courses for my career transition!"</p>
//                 <strong>- John Doe, Data Analyst</strong>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="testimonial-card p-4 bg-white shadow">
//                 <p>"Thanks to my mentor, I was able to get hands-on guidance and improve my skills."</p>
//                 <strong>- Sarah Lee, Frontend Developer</strong>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="testimonial-card p-4 bg-white shadow">
//                 <p>"The free resources and personalized recommendations were game changers."</p>
//                 <strong>- Alex Smith, Software Engineer</strong>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <footer className="footer bg-light text-black text-center py-3" style={{ backgroundColor: '#f8f9fa' }}>
//         <div className="container">
//           <p>© 2024 Your Platform. All rights reserved.</p>
//           <a href="/about" className="text-black mx-2">About Us</a>
//           <a href="/contact" className="text-black mx-2">Contact</a>
//           <a href="/terms" className="text-black mx-2">Terms of Service</a>
//           <a href="/privacy" className="text-black mx-2">Privacy Policy</a>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default WelcomePage;


// src/components/WelcomePage.jsx
// src/components/WelcomePage.jsx
import React, { useState } from 'react';
import './WelcomePage.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import backgroundImage from '../assets/coach-mentor.jpeg';

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

      {/* Testimonials Section */}
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
