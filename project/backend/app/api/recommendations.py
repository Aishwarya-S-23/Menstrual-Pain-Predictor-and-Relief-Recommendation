from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..ml.recommender import recommender
from ..api.predictions import _get_user_context
from datetime import datetime

router = APIRouter()

@router.get("/recommendations")
async def get_recommendations(
    user_id: str,
    prediction_date: str = None,
    db: Session = Depends(get_db)
):
    """Get personalized recommendations"""
    # Get user context
    user_context = await _get_user_context(user_id, db)
    
    # Get predictions for context
    from ..ml.predictor import predictor
    predictions = predictor.predict_for_user(user_context, days=1)
    
    if not predictions:
        raise HTTPException(status_code=404, detail="No predictions available")
    
    # Use the first prediction (today/tomorrow)
    prediction_data = predictions[0]
    
    # Get personalized recommendations
    recommendations = recommender.get_recommendations(
        user_id=user_id,
        prediction_data=prediction_data,
        user_context=user_context
    )
    
    return {
        "user_id": user_id,
        "prediction_context": prediction_data,
        "recommendations": recommendations,
        "generated_at": datetime.utcnow().isoformat()
    }

@router.post("/feedback")
async def submit_feedback(
    user_id: str,
    recommendation_type: str,
    helpfulness_score: int,  # 1-5 scale
    pain_reduction: int = None,  # 0-10 scale
    db: Session = Depends(get_db)
):
    """Submit feedback on recommendations"""
    # In a real implementation, this would store feedback in database
    # For MVP, we'll just acknowledge receipt
    
    if helpfulness_score < 1 or helpfulness_score > 5:
        raise HTTPException(status_code=400, detail="Helpfulness score must be between 1 and 5")
    
    if pain_reduction and (pain_reduction < 0 or pain_reduction > 10):
        raise HTTPException(status_code=400, detail="Pain reduction must be between 0 and 10")
    
    return {
        "status": "success",
        "message": "Feedback recorded successfully",
        "user_id": user_id,
        "recommendation_type": recommendation_type,
        "helpfulness_score": helpfulness_score,
        "pain_reduction": pain_reduction
    }