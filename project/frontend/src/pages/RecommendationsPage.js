import React, { useState } from 'react';
import axios from 'axios';
import './RecommendationsPage.css';

const API_BASE_URL = 'http://localhost:8000/api/v1';

function RecommendationsPage({ userId }) {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/recommendations`, {
        params: { user_id: userId }
      });
      setRecommendations(response.data);
    } catch (err) {
      setError(`Failed to fetch recommendations: ${err.response?.data?.detail || err.message}`);
    }
    setLoading(false);
  };

  const submitFeedback = async (type, score) => {
    try {
      await axios.post(`${API_BASE_URL}/feedback`, null, {
        params: {
          user_id: userId,
          recommendation_type: type,
          helpfulness_score: score
        }
      });
      alert('Thank you for your feedback!');
    } catch (err) {
      alert('Failed to submit feedback');
    }
  };

  return (
    <div className="recommendations-page">
      <h1>Personalized Recommendations</h1>
      <p className="subtitle">Get customized advice to manage your pain</p>

      <div className="fetch-container">
        <button onClick={fetchRecommendations} disabled={loading} className="fetch-btn">
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {recommendations && (
        <div className="recommendations-container">
          <div className="rec-header">
            <h2>Your Personalized Plan</h2>
            <p>Generated at: {new Date(recommendations.generated_at).toLocaleString()}</p>
          </div>

          {recommendations.recommendations && (
            <div className="recommendations-list">
              {Object.entries(recommendations.recommendations).map(([category, items], idx) => (
                <div key={idx} className="recommendation-section">
                  <h3>{formatCategoryName(category)}</h3>
                  <div className="recommendation-items">
                    {Array.isArray(items) ? (
                      items.map((item, i) => (
                        <div key={i} className="rec-item">
                          <h4>{item.name}</h4>
                          <p>{item.description}</p>
                          <p><strong>Type:</strong> {item.type}</p>
                          <p><strong>Evidence Level:</strong> {item.evidence_level}</p>
                          <p><strong>Effectiveness:</strong> {item.effectiveness}</p>
                          <p><strong>Confidence:</strong> {item.confidence}</p>
                          <p className="explanation">{item.explanation}</p>

                          <div className="feedback-buttons">
                            <button
                              onClick={() => submitFeedback(item.name, 5)}
                              className="feedback-btn helpful"
                              title="This was helpful"
                            >
                              👍
                            </button>
                            <button
                              onClick={() => submitFeedback(item.name, 2)}
                              className="feedback-btn not-helpful"
                              title="Not helpful"
                            >
                              👎
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rec-item">
                        <p>{JSON.stringify(items)}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!recommendations && !loading && !error && (
        <div className="empty-state">
          <p>👆 Click "Get Recommendations" to receive personalized pain management advice</p>
        </div>
      )}
    </div>
  );
}

function formatCategoryName(name) {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default RecommendationsPage;