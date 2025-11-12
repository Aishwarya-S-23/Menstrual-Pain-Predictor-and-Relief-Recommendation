from functools import wraps
from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from .database import get_db, User

def get_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user