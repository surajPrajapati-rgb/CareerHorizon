import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WelcomePage from './components/WelcomePage';
import HomePage from './components/HomePage';

function App() {
  const [students, setStudents] = useState([]);  // Initialize students as an empty array

  useEffect(() => {
    // Fetch the student data from the Django backend
    axios.get('http://localhost:8000/api/students/')
      .then(response => setStudents(response.data))  // Set the response data to the state
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <WelcomePage />
      {/* <HomePage /> */}
      {/* <h1>Students List</h1>
      {students.length > 0 ? (
        <ul>
          {students.map((student) => (
            <li key={student.student_id}>
              {student.student_name} (Student ID: {student.stu_id})
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading students...</p>
      )} */}
    </div>
  );
}

export default App;
