import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib
import os
from datetime import datetime, timedelta
import json

class PainPredictor:
    def __init__(self):
        self.model = None
        self.model_path = "ml_models/population_model.joblib"
        self._ensure_model_exists()
    
    def _ensure_model_exists(self):
        """Create model directory and train initial model if it doesn't exist"""
        os.makedirs("ml_models", exist_ok=True)
        
        if os.path.exists(self.model_path):
            self.model = joblib.load(self.model_path)
        else:
            self._train_initial_model()
    
    def _train_initial_model(self):
        """Train initial model with synthetic data"""
        print("Training initial model with synthetic data...")
        
        # Generate synthetic training data
        np.random.seed(42)
        n_samples = 1000
        
        # Features: cycle_day, days_to_period, historical_pain, sleep, stress, exercise
        X = np.random.rand(n_samples, 6)
        X[:, 0] = np.random.randint(1, 29, n_samples)  # cycle_day
        X[:, 1] = np.random.randint(1, 15, n_samples)  # days_to_period
        X[:, 2] = np.random.uniform(0, 10, n_samples)  # historical_pain
        X[:, 3] = np.random.uniform(4, 10, n_samples)  # sleep
        X[:, 4] = np.random.uniform(0, 10, n_samples)  # stress
        X[:, 5] = np.random.uniform(0, 120, n_samples) # exercise
        
        # Target: pain score with realistic patterns
        y = np.zeros(n_samples)
        for i in range(n_samples):
            cycle_day = X[i, 0]
            base_pain = 2.0
            
            # Higher pain during period days (cycle days 1-7)
            if 1 <= cycle_day <= 7:
                base_pain += np.random.uniform(3, 6)
            # Moderate pain before period (cycle days 25-28)
            elif 25 <= cycle_day <= 28:
                base_pain += np.random.uniform(1, 3)
            
            # Adjust for lifestyle factors
            sleep_impact = max(0, 7 - X[i, 3]) * 0.5
            stress_impact = X[i, 4] * 0.3
            exercise_impact = max(0, 30 - X[i, 5]) * 0.02
            
            y[i] = base_pain + sleep_impact + stress_impact + exercise_impact
            y[i] = min(10, max(0, y[i] + np.random.normal(0, 0.5)))
        
        self.model = RandomForestRegressor(n_estimators=50, random_state=42, max_depth=5)
        self.model.fit(X, y)
        
        joblib.dump(self.model, self.model_path)
        print("Initial model trained and saved.")
    
    def predict_for_user(self, user_data, days=7):
        """Generate predictions for a user"""
        predictions = []
        
        for day in range(days):
            # Create features for this prediction day
            features = self._create_features(user_data, day)
            
            # Make prediction
            pain_score = self.model.predict([features])[0]
            pain_score = max(0, min(10, pain_score))
            
            # Calculate severe probability
            severe_prob = 1 / (1 + np.exp(-(pain_score - 6.5)))
            
            predictions.append({
                'date': (datetime.now() + timedelta(days=day)).strftime('%Y-%m-%d'),
                'predicted_pain': round(pain_score, 1),
                'severe_probability': round(severe_prob, 3),
                'confidence_interval': [
                    max(0, round(pain_score - 1.2, 1)),
                    min(10, round(pain_score + 1.2, 1))
                ],
                'drivers': self._get_drivers(features)
            })
        
        return predictions
    
    def _create_features(self, user_data, days_ahead):
        """Create feature vector for prediction"""
        cycle_day = (user_data.get('current_cycle_day', 14) + days_ahead) % 28
        if cycle_day == 0: cycle_day = 28
        
        days_to_period = user_data.get('days_to_next_period', 14) - days_ahead
        if days_to_period < 0:
            days_to_period = 28 + days_to_period
        
        historical_pain = user_data.get('historical_avg_pain', 5.0)
        sleep = user_data.get('avg_sleep', 7.0)
        stress = user_data.get('avg_stress', 5.0)
        exercise = user_data.get('avg_exercise', 30.0)
        
        return [cycle_day, days_to_period, historical_pain, sleep, stress, exercise]
    
    def _get_drivers(self, features):
        """Get explanation for prediction"""
        drivers = []
        cycle_day, days_to_period, historical_pain, sleep, stress, exercise = features
        
        if 1 <= cycle_day <= 7:
            drivers.append("during your period")
        elif 25 <= cycle_day <= 28:
            drivers.append("approaching your period")
        
        if sleep < 6:
            drivers.append("low sleep quality")
        
        if stress > 7:
            drivers.append("high stress levels")
        
        return drivers if drivers else ["typical cycle pattern"]

# Global instance
predictor = PainPredictor()