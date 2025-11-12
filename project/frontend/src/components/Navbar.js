import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChartBar, FaHeartbeat, FaClock, FaLightbulb } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ userId }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaHeartbeat className="logo-icon" />
          Period Pain Predictor
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            <FaHome /> Home
          </Link>
          <Link to="/dashboard" className="nav-link">
            <FaChartBar /> Dashboard
          </Link>
          <Link to="/tracker" className="nav-link">
            <FaHeartbeat /> Tracker
          </Link>
          <Link to="/predictions" className="nav-link">
            <FaClock /> Predictions
          </Link>
          <Link to="/recommendations" className="nav-link">
            <FaLightbulb /> Recommendations
          </Link>
        </div>
        <div className="user-info">
          <small>ID: {userId?.substring(0, 12)}...</small>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
