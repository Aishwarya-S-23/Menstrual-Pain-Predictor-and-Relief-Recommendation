from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from .api import users, pain, predictions, recommendations

# Create FastAPI app
app = FastAPI(
    title="Period Pain Predictor MVP",
    description="Privacy-first menstrual cycle pain prediction app",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/api/v1", tags=["users"])
app.include_router(pain.router, prefix="/api/v1", tags=["pain"])
app.include_router(predictions.router, prefix="/api/v1", tags=["predictions"])
app.include_router(recommendations.router, prefix="/api/v1", tags=["recommendations"])

@app.get("/")
async def root():
    return {
        "message": "Period Pain Predictor API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)