// src/components/Facilities.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Facilities() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/stations/facilities/')
      .then(response => {
        setFacilities(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div>
      <h1>Station Facilities</h1>
      <ul>
        {facilities.map(facility => (
          <li key={facility.id}>
            {facility.facility_name} - {facility.facility_type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Facilities;
