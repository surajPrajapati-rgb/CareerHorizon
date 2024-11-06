import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Lightning, StarFill, Calendar } from 'react-bootstrap-icons';

const MentorCard = ({ name, role, country, sessions, reviews, isTopRated, isAvailableNow }) => {
  return (
    <Card className="mentor-card" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {role} <br />
          {country} <br />
          {sessions} sessions ({reviews} reviews)
        </Card.Text>
        {isTopRated && <span className="badge bg-warning"><StarFill /> Top rated</span>}
        {isAvailableNow && <span className="badge bg-success"><Lightning /> Available ASAP</span>}
        <Button variant="primary"><Calendar /> Book Session</Button>
      </Card.Body>
    </Card>
  );
};

export default MentorCard;
