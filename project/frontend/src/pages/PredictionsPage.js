import React, { useState } from 'react';
import axios from 'axios';
import './PredictionsPage.css';

const API_BASE_URL = 'http://localhost:8000/api/v1';

function PredictionsPage({ userId }) {
  const [days, setDays] = useState(7);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPredictions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/predictions`, {
        params: {
          user_id: userId,
          days: parseInt(days)
        }
      });
      setPredictions(response.data);
    } catch (err) {
      setError(`Failed to fetch predictions: ${err.response?.data?.detail || err.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="predictions-page">
      <h1>Pain Predictions</h1>
      <p className="subtitle">Get AI-powered predictions for your upcoming pain patterns</p>

      <div className="prediction-controls">
        <div className="control-group">
          <label htmlFor="days">Number of Days</label>
          <select 
            id="days"
            value={days} 
            onChange={(e) => setDays(e.target.value)}
          >
            <option value="1">1 Day</option>
            <option value="3">3 Days</option>
            <option value="7">7 Days</option>
            <option value="14">14 Days</option>
          </select>
        </div>
        <button onClick={fetchPredictions} disabled={loading} className="fetch-btn">
          {loading ? 'Loading...' : 'Get Predictions'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {predictions && (
        <div className="predictions-container">
          <div className="prediction-info">
            <h2>Prediction Results</h2>
            <p>User ID: {predictions.user_id}</p>
            <p>Generated at: {new Date(predictions.generated_at).toLocaleString()}</p>
            <p>Model Version: {predictions.model_version}</p>
          </div>

          <div className="predictions-grid">
            {predictions.predictions && predictions.predictions.length > 0 ? (
              predictions.predictions.map((pred, index) => (
                <div key={index} className="prediction-card">
                  <div className="card-header">
                    <h3>Day {index + 1}</h3>
                    <span className="date">{new Date(pred.date).toLocaleDateString()}</span>
                  </div>
                  <div className="card-content">
                    <div className="metric">
                      <span className="label">Pain Level</span>
                      <span className="value pain-high">{pred.predicted_pain_score?.toFixed(1) || 'N/A'}</span>
                    </div>
                    <div className="metric">
                      <span className="label">Stress Level</span>
                      <span className="value">{pred.predicted_stress?.toFixed(1) || 'N/A'}</span>
                    </div>
                    <div className="metric">
                      <span className="label">Confidence</span>
                      <span className="value">{pred.confidence?.toFixed(2) || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No predictions available. Please track your data first.</p>
            )}
          </div>
        </div>
      )}

      {!predictions && !loading && !error && (
        <div className="empty-state">
          <p>👆 Click "Get Predictions" to see your pain predictions</p>
        </div>
      )}
    </div>
  );
}

export default PredictionsPage;
