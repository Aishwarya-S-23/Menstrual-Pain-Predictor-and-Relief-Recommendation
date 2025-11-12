import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PainTrackerPage.css';

const API_BASE_URL = 'http://localhost:8000/api/v1';

function PainTrackerPage({ userId }) {
  const [painScore, setPainScore] = useState(5);
  const [painType, setPainType] = useState('cramps');
  const [productivityImpact, setProductivityImpact] = useState(5);
  const [sleepHours, setSleepHours] = useState(7);
  const [exerciseMinutes, setExerciseMinutes] = useState(30);
  const [stressLevel, setStressLevel] = useState(5);
  const [hydrationLiters, setHydrationLiters] = useState(2);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmitPain = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/pain`, 
        {
          pain_score: parseInt(painScore),
          pain_type: painType,
          productivity_impact: parseInt(productivityImpact),
          notes: notes
        },
        {
          params: { user_id: userId }
        }
      );
      setMessage(`✓ Pain entry recorded successfully! ID: ${response.data.entry_id}`);
      setPainScore(5);
      setNotes('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(`✗ Error: ${error.response?.data?.detail || error.message}`);
    }
    setLoading(false);
  };

  const handleSubmitLifestyle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/lifestyle`,
        {
          sleep_hours: parseFloat(sleepHours),
          exercise_minutes: parseInt(exerciseMinutes),
          stress_level: parseInt(stressLevel),
          hydration_liters: parseFloat(hydrationLiters)
        },
        {
          params: { user_id: userId }
        }
      );
      setMessage(`✓ Lifestyle data recorded successfully! ID: ${response.data.entry_id}`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(`✗ Error: ${error.response?.data?.detail || error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="tracker-page">
      <h1>Track Your Pain & Lifestyle</h1>

      {message && <div className={`message ${message.includes('✓') ? 'success' : 'error'}`}>{message}</div>}

      <div className="tracker-container">
        <div className="form-card">
          <h2>Pain Entry</h2>
          <form onSubmit={handleSubmitPain}>
            <div className="form-group">
              <label>Pain Score (1-10)</label>
              <div className="slider-container">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={painScore}
                  onChange={(e) => setPainScore(e.target.value)}
                  className="slider"
                />
                <span className="slider-value">{painScore}</span>
              </div>
            </div>

            <div className="form-group">
              <label>Pain Type</label>
              <select value={painType} onChange={(e) => setPainType(e.target.value)}>
                <option value="cramps">Cramps</option>
                <option value="headache">Headache</option>
                <option value="backpain">Back Pain</option>
                <option value="joint_pain">Joint Pain</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Productivity Impact (1-10)</label>
              <div className="slider-container">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={productivityImpact}
                  onChange={(e) => setProductivityImpact(e.target.value)}
                  className="slider"
                />
                <span className="slider-value">{productivityImpact}</span>
              </div>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes..."
                rows="3"
              />
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Saving...' : 'Save Pain Entry'}
            </button>
          </form>
        </div>

        <div className="form-card">
          <h2>Lifestyle Data</h2>
          <form onSubmit={handleSubmitLifestyle}>
            <div className="form-group">
              <label>Sleep Hours</label>
              <input 
                type="number" 
                step="0.5"
                min="0"
                max="24"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Exercise Minutes</label>
              <input 
                type="number" 
                min="0"
                max="600"
                value={exerciseMinutes}
                onChange={(e) => setExerciseMinutes(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Stress Level (1-10)</label>
              <div className="slider-container">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={stressLevel}
                  onChange={(e) => setStressLevel(e.target.value)}
                  className="slider"
                />
                <span className="slider-value">{stressLevel}</span>
              </div>
            </div>

            <div className="form-group">
              <label>Hydration (Liters)</label>
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="10"
                value={hydrationLiters}
                onChange={(e) => setHydrationLiters(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Saving...' : 'Save Lifestyle Data'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PainTrackerPage;
