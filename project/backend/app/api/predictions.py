from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import json
from datetime import datetime, timedelta
from ..database import get_db, PainEntry, LifestyleEntry
from ..ml.predictor import predictor

router = APIRouter()

@router.get("/predictions")
async def get_predictions(
    user_id: str,
    days: int = 7,
    db: Session = Depends(get_db)
):
    """Get pain predictions for user"""
    if days < 1 or days > 14:
        raise HTTPException(status_code=400, detail="Days must be between 1 and 14")
    
    # Get user data for context
    user_data = await _get_user_context(user_id, db)
    
    # Get predictions
    predictions = predictor.predict_for_user(user_data, days)
    
    return {
        "user_id": user_id,
        "predictions": predictions,
        "generated_at": datetime.utcnow().isoformat(),
        "model_version": "1.0"
    }

async def _get_user_context(user_id: str, db: Session) -> dict:
    """Get user context for predictions"""
    # Get recent pain entries
    pain_entries = db.query(PainEntry).filter(
        PainEntry.user_id == user_id
    ).order_by(PainEntry.date.desc()).limit(30).all()
    
    # Get recent lifestyle entries  
    lifestyle_entries = db.query(LifestyleEntry).filter(
        LifestyleEntry.user_id == user_id
    ).order_by(LifestyleEntry.date.desc()).limit(7).all()
    
    # Calculate averages
    historical_pain = [entry.pain_score for entry in pain_entries]
    avg_pain = sum(historical_pain) / len(historical_pain) if historical_pain else 5.0
    
    sleep_values = [entry.sleep_hours for entry in lifestyle_entries]
    avg_sleep = sum(sleep_values) / len(sleep_values) if sleep_values else 7.0
    
    stress_values = [entry.stress_level for entry in lifestyle_entries]
    avg_stress = sum(stress_values) / len(stress_values) if stress_values else 5.0
    
    exercise_values = [entry.exercise_minutes for entry in lifestyle_entries]
    avg_exercise = sum(exercise_values) / len(exercise_values) if exercise_values else 30.0
    
    # Simple cycle estimation (in real app, this would use cycle tracking)
    # For MVP, we'll use a simple 28-day cycle estimation
    current_cycle_day = (datetime.now().day % 28) + 1
    days_to_next_period = 29 - current_cycle_day
    
    return {
        "historical_avg_pain": avg_pain,
        "current_cycle_day": current_cycle_day,
        "days_to_next_period": days_to_next_period,
        "avg_sleep": avg_sleep,
        "avg_stress": avg_stress,
        "avg_exercise": avg_exercise,
        "data_points": len(pain_entries)
    }