import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MentorPage.css';

const MentorPage = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    field_of_study_options: [],
    degree_options: [],
    academic_stream_options: [],
    availability_days: []
  });
  const [filters, setFilters] = useState({
    field_of_study: '',
    degree: '',
    academic_stream: '',
    availability_day: '',
    availability_time: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchFilterOptions();
    fetchMentors();
  }, [filters]);

  const fetchFilterOptions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/mentorship/mentors/filter-options/');
      setFilterOptions(response.data);
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const fetchMentors = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/mentorship/mentors/', {
        params: filters
      });
      setMentors(response.data);
    } catch (error) {
      setError('Error loading mentors');
    } finally {
      setLoading(false);
    }
  };

  const handleMentorProfile = (mentorId) => {
    if (mentorId) {
      navigate(`/mentors/${mentorId}`);
    } else {
      console.error("mentorId is undefined");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mentor-page">
      <section className="filter-section py-4">
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-3">
              <select
                className="form-control"
                name="field_of_study"
                value={filters.field_of_study}
                onChange={handleFilterChange}
              >
                <option value="">Select Field of Study</option>
                {filterOptions.field_of_study_options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                name="degree"
                value={filters.degree}
                onChange={handleFilterChange}
              >
                <option value="">Select Degree</option>
                {filterOptions.degree_options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                name="academic_stream"
                value={filters.academic_stream}
                onChange={handleFilterChange}
              >
                <option value="">Select Academic Stream</option>
                {filterOptions.academic_stream_options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                name="availability_day"
                value={filters.availability_day}
                onChange={handleFilterChange}
              >
                <option value="">Select Day</option>
                {filterOptions.availability_days.map((day, index) => (
                  <option key={index} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3 mt-2">
              <input
                type="time"
                className="form-control"
                name="availability_time"
                value={filters.availability_time}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mentor-section py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-4">Our Mentors</h2>
          <div className="row">
            {mentors.map((mentor) => (
              <div className="col-md-4 mb-4" key={mentor.mentor_id}>
                <div className="mentor-card p-3 bg-white shadow-sm h-100">
                  <h5>{mentor.name}</h5>
                  <p>{mentor.field_of_study} - {mentor.degree}</p>
                  {mentor.bio && <p>{mentor.bio}</p>}
                  <button className="btn btn-primary" onClick={() => handleMentorProfile(mentor.mentor_id)}>
                    Book a Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentorPage;
