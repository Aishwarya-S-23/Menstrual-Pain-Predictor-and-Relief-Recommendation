from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
import uuid
from ..database import get_db, PainEntry, LifestyleEntry

router = APIRouter()

class PainEntryCreate(BaseModel):
    pain_score: int
    productivity_impact: int = None
    notes: str = None
    pain_type: str = "cramps"

class LifestyleEntryCreate(BaseModel):
    sleep_hours: float
    exercise_minutes: int
    stress_level: int
    hydration_liters: float

@router.post("/pain")
async def submit_pain_entry(
    user_id: str,
    pain_data: PainEntryCreate,
    db: Session = Depends(get_db)
):
    """Submit pain entry"""
    # Set productivity impact if not provided
    productivity_impact = pain_data.productivity_impact
    if productivity_impact is None:
        productivity_impact = min(10, int(pain_data.pain_score * 0.8))
    
    pain_entry = PainEntry(
        user_id=user_id,
        pain_score=pain_data.pain_score,
        pain_type=pain_data.pain_type,
        productivity_impact=productivity_impact,
        notes=pain_data.notes
    )
    
    db.add(pain_entry)
    db.commit()
    
    return {
        "status": "success",
        "entry_id": pain_entry.id,
        "message": "Pain entry recorded successfully"
    }

@router.post("/lifestyle")
async def submit_lifestyle_entry(
    user_id: str,
    lifestyle_data: LifestyleEntryCreate,
    db: Session = Depends(get_db)
):
    """Submit lifestyle data"""
    lifestyle_entry = LifestyleEntry(
        user_id=user_id,
        sleep_hours=lifestyle_data.sleep_hours,
        exercise_minutes=lifestyle_data.exercise_minutes,
        stress_level=lifestyle_data.stress_level,
        hydration_liters=lifestyle_data.hydration_liters
    )
    
    db.add(lifestyle_entry)
    db.commit()
    
    return {
        "status": "success", 
        "entry_id": lifestyle_entry.id,
        "message": "Lifestyle data recorded successfully"
    }

@router.get("/pain/{user_id}")
async def get_pain_history(user_id: str, limit: int = 30, db: Session = Depends(get_db)):
    """Get user's pain history"""
    entries = db.query(PainEntry).filter(
        PainEntry.user_id == user_id
    ).order_by(PainEntry.date.desc()).limit(limit).all()
    
    return {
        "user_id": user_id,
        "entries": [
            {
                "id": entry.id,
                "date": entry.date,
                "pain_score": entry.pain_score,
                "pain_type": entry.pain_type,
                "productivity_impact": entry.productivity_impact,
                "notes": entry.notes
            }
            for entry in entries
        ]
    }