import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaChartLine, FaLightbulb, FaLock } from 'react-icons/fa';
import './HomePage.css';

function HomePage({ userId }) {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to Period Pain Predictor</h1>
        <p>Privacy-first AI-powered predictions and personalized recommendations</p>
        <div className="hero-cta">
          <Link to="/tracker" className="cta-button primary">
            Start Tracking
          </Link>
          <Link to="/dashboard" className="cta-button secondary">
            View Dashboard
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaHeartbeat className="feature-icon" />
            <h3>Pain Tracking</h3>
            <p>Record your pain levels, types, and impact on daily activities with ease.</p>
          </div>
          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Predictions</h3>
            <p>Get AI-powered predictions for your upcoming pain patterns based on your data.</p>
          </div>
          <div className="feature-card">
            <FaLightbulb className="feature-icon" />
            <h3>Recommendations</h3>
            <p>Receive personalized recommendations for pain relief and management.</p>
          </div>
          <div className="feature-card">
            <FaLock className="feature-icon" />
            <h3>Privacy First</h3>
            <p>Your data stays private. No tracking, no ads, just your health insights.</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <h4>Track Your Data</h4>
            <p>Log your pain scores, lifestyle factors, and other health metrics</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <h4>Analyze Patterns</h4>
            <p>Our AI analyzes your patterns to understand your cycle</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <h4>Get Predictions</h4>
            <p>Receive predictions for upcoming pain and stress levels</p>
          </div>
          <div className="step">
            <span className="step-number">4</span>
            <h4>Get Recommendations</h4>
            <p>Personalized recommendations to help manage your pain</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
