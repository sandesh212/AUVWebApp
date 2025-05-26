import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/Sidebar.css';

function Sidebar({ onLogout, operator }) {
  const location = useLocation();

  // Do not show sidebar on the login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <div className="sidebar">
      {/* Display operator's name and role if available */}
      {operator && (
        <div className="operator-info">
          <h3>{operator.name}</h3>
          <p>{operator.role}</p>
        </div>
      )}
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/logfiles">Logfiles</Link></li>
        <li><Link to="/commands">Commands</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/images">Images</Link></li>
        <li><Link to="/graphs">Graphs</Link></li>
        <li><button onClick={onLogout}>Logout</button></li>
      </ul>
    </div>
  );
}

export default Sidebar;
