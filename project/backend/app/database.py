from sqlalchemy import create_engine, Column, String, Integer, Float, DateTime, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import uuid
from .config import settings

engine = create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    user_id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime, default=datetime.utcnow)
    timezone = Column(String, default="UTC")
    consent_flags = Column(Text, default='{"analytics": true, "personalization": true}')
    experiment_group = Column(String, default="control")

class PainEntry(Base):
    __tablename__ = "pain_entries"
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, index=True)
    date = Column(DateTime, default=datetime.utcnow)
    pain_score = Column(Integer)
    pain_type = Column(String, default="cramps")
    productivity_impact = Column(Integer)
    notes = Column(Text, nullable=True)

class LifestyleEntry(Base):
    __tablename__ = "lifestyle_entries"
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, index=True)
    date = Column(DateTime, default=datetime.utcnow)
    sleep_hours = Column(Float)
    exercise_minutes = Column(Integer)
    stress_level = Column(Integer)
    hydration_liters = Column(Float)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create tables
Base.metadata.create_all(bind=engine)