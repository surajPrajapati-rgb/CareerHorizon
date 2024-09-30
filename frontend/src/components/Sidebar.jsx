// src/components/Sidebar.jsx
import React from 'react';
import '/src/styles/Sidebar.css'; // Ensure you create Sidebar.css for styling

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>FLWR</h2>
      </div>
      <nav>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#course">Course</a></li>
          <li><a href="#my-course">My Course</a></li>
          <li><a href="#learning-progress">Learning Progress</a></li>
          <li><a href="#community">Community</a></li>
        </ul>
      </nav>
      <div className="workspace">
        <h4>Workspace</h4>
        <ul>
          <li><a href="#overview">Overview</a> <span className="new">NEW</span></li>
          <li><a href="#learning-progress">Learning Progress</a></li>
          <li><a href="#community-beta">Community</a> <span className="beta">BETA</span></li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
