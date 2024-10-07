// ResourceSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ResourceSection.css'; // Import custom styles for resource sections

const ResourceSection = ({ title, resources }) => {
  return (
    <section className={`${title.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}-section mb-4`}>
      <h2>{title}</h2>
      <ul className="list-group">
        {resources.map((resource, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              {resource.title}
            </a>
            <Link to={resource.link} className="btn btn-outline-primary btn-sm" target="_blank">
              Visit
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ResourceSection;
