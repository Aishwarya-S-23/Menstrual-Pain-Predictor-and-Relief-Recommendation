import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardPage.css';

const API_BASE_URL = 'http://localhost:8000/api/v1';

function DashboardPage({ userId }) {
  const [painHistory, setPainHistory] = useState([]);
  const [stats, setStats] = useState({
    totalEntries: 0,
    avgPainScore: 0,
    maxPainScore: 0,
    minPainScore: 10
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPainHistory();
  }, [userId]);

  const fetchPainHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/pain/${userId}`, {
        params: { limit: 30 }
      });
      
      const entries = response.data.entries || [];
      setPainHistory(entries);

      // Calculate statistics
      if (entries.length > 0) {
        const painScores = entries.map(e => e.pain_score);
        const avgPain = (painScores.reduce((a, b) => a + b, 0) / painScores.length).toFixed(1);
        
        setStats({
          totalEntries: entries.length,
          avgPainScore: avgPain,
          maxPainScore: Math.max(...painScores),
          minPainScore: Math.min(...painScores)
        });
      }
    } catch (err) {
      setError(`Failed to fetch pain history: ${err.response?.data?.detail || err.message}`);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="dashboard-page"><p>Loading dashboard...</p></div>;
  }

  return (
    <div className="dashboard-page">
      <h1>Your Dashboard</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Entries</h3>
          <p className="stat-value">{stats.totalEntries}</p>
        </div>
        <div className="stat-card">
          <h3>Average Pain Score</h3>
          <p className="stat-value">{stats.avgPainScore}</p>
          <p className="stat-unit">out of 10</p>
        </div>
        <div className="stat-card">
          <h3>Highest Pain Score</h3>
          <p className="stat-value">{stats.maxPainScore}</p>
        </div>
        <div className="stat-card">
          <h3>Lowest Pain Score</h3>
          <p className="stat-value">{stats.minPainScore}</p>
        </div>
      </div>

      <div className="history-section">
        <div className="section-header">
          <h2>Recent Pain Entries</h2>
          <button onClick={fetchPainHistory} className="refresh-btn">
            🔄 Refresh
          </button>
        </div>

        {painHistory.length > 0 ? (
          <div className="history-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Pain Score</th>
                  <th>Type</th>
                  <th>Productivity Impact</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {painHistory.map((entry, index) => (
                  <tr key={index}>
                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                    <td>
                      <span className={`score score-${entry.pain_score}`}>
                        {entry.pain_score}/10
                      </span>
                    </td>
                    <td>{entry.pain_type}</td>
                    <td>{entry.productivity_impact}/10</td>
                    <td>{entry.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>No pain entries yet. Start by visiting the Tracker page!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
