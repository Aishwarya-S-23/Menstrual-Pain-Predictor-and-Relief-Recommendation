# Period Pain Predictor - Complete Setup Guide

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js (v16+)
- Python 3.14
- Git (optional)

---

## Phase 1: Backend Setup (2 minutes)

### 1. Navigate to Backend
```bash
cd project\backend
```

### 2. Activate Virtual Environment
```bash
# Virtual environment is already set up at: .venv
# Verify backend requirements are installed
```

### 3. Start Backend Server
```bash
cd "C:\Users\Aishwarya S\OneDrive\Desktop\Hacksphere2.0\project\backend"
& "C:/Users/Aishwarya S/OneDrive/Desktop/Hacksphere2.0/.venv/Scripts/python.exe" -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

✅ **Backend is ready at:** http://localhost:8000

---

## Phase 2: Frontend Setup (3 minutes)

### 1. Navigate to Frontend
```bash
cd project\frontend
```

### 2. Install Dependencies
```bash
npm install
```

This installs:
- React 18
- React Router
- Axios
- React Icons
- All other required packages

### 3. Start Frontend
```bash
npm start
```

**Expected:**
- Browser opens automatically at http://localhost:3000
- App loads with Period Pain Predictor interface

✅ **Frontend is ready at:** http://localhost:3000

---

## 🎯 Using the Application

### Step 1: Home Page
- Open http://localhost:3000
- Review features and how it works
- Your User ID is automatically generated

### Step 2: Track Pain
1. Click "Tracker" in navigation
2. Fill in pain score (1-10 slider)
3. Select pain type (cramps, headache, etc.)
4. Set productivity impact
5. Add notes if desired
6. Click "Save Pain Entry"
7. Fill in lifestyle data (sleep, exercise, stress, hydration)
8. Click "Save Lifestyle Data"

### Step 3: View Dashboard
1. Click "Dashboard" in navigation
2. See statistics:
   - Total entries
   - Average pain score
   - Max/min pain levels
3. View recent pain history in table

### Step 4: Get Predictions
1. Click "Predictions" in navigation
2. Select number of days (1, 3, 7, or 14)
3. Click "Get Predictions"
4. View AI predictions for upcoming pain

### Step 5: Get Recommendations
1. Click "Recommendations" in navigation
2. Click "Get Recommendations"
3. View personalized pain management advice
4. Provide feedback with 👍 or 👎

---

## 🔗 API Endpoints

### Available Routes

#### Pain Tracking
- `POST /api/v1/pain` - Submit pain entry
- `POST /api/v1/lifestyle` - Submit lifestyle data
- `GET /api/v1/pain/{user_id}` - Get pain history

#### Predictions & Recommendations
- `GET /api/v1/predictions` - Get pain predictions
- `GET /api/v1/recommendations` - Get recommendations
- `POST /api/v1/feedback` - Submit feedback

#### Health Check
- `GET /health` - Check backend status
- `GET /` - API info and version

### Full API Documentation
Visit: http://localhost:8000/docs (Swagger UI)

---

## 📁 Project Structure

```
project/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app
│   │   ├── database.py          # Database models
│   │   ├── config.py            # Configuration
│   │   ├── api/
│   │   │   ├── users.py
│   │   │   ├── pain.py
│   │   │   ├── predictions.py
│   │   │   └── recommendations.py
│   │   ├── ml/
│   │   │   ├── predictor.py
│   │   │   └── recommender.py
│   │   └── utils/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── PainTrackerPage.js
│   │   │   ├── PredictionsPage.js
│   │   │   └── RecommendationsPage.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
└── docker-compose.yml
```

---

## 🐛 Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Find process using port 8000
netstat -ano | findstr :8000

# Kill the process
taskkill /PID <process-id> /F

# Restart backend
```

**Module not found errors:**
```bash
# Reinstall dependencies
pip install -r backend/app/requirements.txt
```

**Database errors:**
- Database file is auto-created at: `backend/app/pain_predictor.db`
- If corrupted, delete and restart backend

### Frontend Issues

**Port 3000 already in use:**
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9
# or on Windows:
netstat -ano | findstr :3000
taskkill /PID <process-id> /F
```

**Dependencies not installing:**
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**API connection errors:**
- Verify backend is running at http://localhost:8000
- Check browser console (F12) for CORS errors
- Ensure both services are on correct ports

### General Issues

**App not responding:**
1. Check backend logs for errors
2. Check browser console (F12) for JavaScript errors
3. Verify both services are running
4. Try hard refresh: Ctrl+Shift+R

**Data not saving:**
1. Verify backend is running
2. Check network tab (F12) for API errors
3. Ensure user_id is in localStorage

---

## 🛠️ Development Tools

### Browser DevTools
- Press **F12** to open
- Tabs available:
  - **Console** - Check for JavaScript errors
  - **Network** - Monitor API calls
  - **Application** - View localStorage
  - **Elements** - Inspect HTML/CSS

### Backend API Testing
```bash
# Check backend health
curl http://localhost:8000/health

# Get API docs
curl http://localhost:8000/docs
```

### Monitor Backend Logs
- Watch terminal where backend is running
- Logs show all API requests and responses
- Errors are highlighted in red

---

## 📊 Data Storage

### Frontend
- User ID stored in browser localStorage
- No other data stored locally
- All tracking data sent to backend API

### Backend
- SQLite database at: `backend/app/pain_predictor.db`
- Stores:
  - User profiles
  - Pain entries
  - Lifestyle entries
- Data persists between sessions

---

## 🔐 Privacy & Security

- ✅ No tracking or analytics
- ✅ No ads or third-party scripts
- ✅ Data only sent to your local backend
- ✅ Encryption utilities available in backend
- ✅ Privacy-first architecture

---

## 📝 Common Tasks

### Clear User Data
1. Delete `backend/app/pain_predictor.db`
2. Clear localStorage: DevTools → Application → Clear Storage
3. Restart backend

### Export Data
- Database can be exported as CSV
- API endpoint: `GET /api/v1/pain/{user_id}`

### Add More Users
- Each browser gets unique user_id
- All users share same backend database
- Data is isolated by user_id

---

## 🎓 Next Steps

### Enhance Features
- Add cycle prediction
- Implement data export (CSV, PDF)
- Add medication tracking
- Build reporting features

### Deployment
- Deploy frontend to Vercel/Netlify
- Deploy backend to cloud platform
- Set up proper database
- Configure production environment

### Mobile App
- Consider React Native version
- Or progressive web app (PWA)

---

## 📞 Support & Help

### Check Logs
- **Backend:** Watch terminal output
- **Frontend:** F12 → Console tab
- **Network:** F12 → Network tab

### Documentation
- Backend API Docs: http://localhost:8000/docs
- Frontend README: `frontend/README.md`
- Backend Setup: `backend/README.md`

### Reset Everything
```bash
# Backend
cd backend
rm pain_predictor.db
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000

# Frontend (new terminal)
cd frontend
npm start
```

---

## ✨ That's It!

You now have a fully functional Period Pain Predictor app running locally!

**Enjoy tracking and predicting your pain! 🎉**

- 🏠 Home: http://localhost:3000
- 📊 API Docs: http://localhost:8000/docs
- 📱 Track Pain: http://localhost:3000/tracker
- 📈 Dashboard: http://localhost:3000/dashboard

---

*Last Updated: November 12, 2025*
