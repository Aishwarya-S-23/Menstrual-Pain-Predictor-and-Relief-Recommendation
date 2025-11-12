import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import PainTrackerPage from './pages/PainTrackerPage';
import PredictionsPage from './pages/PredictionsPage';
import RecommendationsPage from './pages/RecommendationsPage';
import './App.css';

function App() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user_id exists in localStorage
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      // Generate new user_id
      const newUserId = generateUserId();
      localStorage.setItem('user_id', newUserId);
      setUserId(newUserId);
    }
    setLoading(false);
  }, []);

  const generateUserId = () => {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navbar userId={userId} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage userId={userId} />} />
            <Route path="/dashboard" element={<DashboardPage userId={userId} />} />
            <Route path="/tracker" element={<PainTrackerPage userId={userId} />} />
            <Route path="/predictions" element={<PredictionsPage userId={userId} />} />
            <Route path="/recommendations" element={<RecommendationsPage userId={userId} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
