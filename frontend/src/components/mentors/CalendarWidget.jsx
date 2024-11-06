import React from 'react';
import { Calendar } from 'react-bootstrap-icons';

const CalendarWidget = () => {
  return (
    <div className="calendar-widget">
      <h5>20 Oct - 26 Oct</h5>
      <p>You have no upcoming sessions</p>
      <button className="btn btn-primary"><Calendar /> Book a session</button>
    </div>
  );
};

export default CalendarWidget;
