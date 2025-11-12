# Frontend Setup & Installation Guide

## Quick Start

### 1. Prerequisites
Ensure you have the following installed:
- Node.js (v16+) - [Download](https://nodejs.org/)
- npm (comes with Node.js)

Verify installation:
```bash
node --version
npm --version
```

### 2. Installation Steps

Navigate to the frontend directory:
```bash
cd frontend
```

Install all dependencies:
```bash
npm install
```

This will install:
- React 18
- React Router v6
- Axios (HTTP client)
- React Icons
- TailwindCSS (optional)
- date-fns (date utilities)

### 3. Start Development Server

```bash
npm start
```

The app will automatically open at `http://localhost:3000`

If it doesn't open automatically, visit: http://localhost:3000

### 4. Features Available

Once the app is running:

#### Home Page (`/`)
- Welcome and overview
- Feature highlights
- How the app works

#### Tracker (`/tracker`)
- Log pain entries
- Log lifestyle data
- Sliders for scores
- Text notes for details

#### Dashboard (`/dashboard`)
- View pain statistics
- See recent entries
- Track trends

#### Predictions (`/predictions`)
- Get 1-14 day predictions
- See predicted pain levels
- View confidence scores

#### Recommendations (`/recommendations`)
- Get personalized advice
- Submit feedback
- See recommendations by category

## Backend Connection

**Important:** The backend must be running for the app to work properly.

Backend URL: `http://localhost:8000`

To check if backend is running:
```
curl http://localhost:8000/health
```

Should return: `{"status": "healthy"}`

## File Structure

```
frontend/
├── public/
│   └── index.html              # Main HTML file
├── src/
│   ├── components/
│   │   ├── Navbar.js           # Navigation component
│   │   └── Navbar.css
│   ├── pages/
│   │   ├── HomePage.js         # Home page
│   │   ├── HomePage.css
│   │   ├── DashboardPage.js    # Dashboard page
│   │   ├── DashboardPage.css
│   │   ├── PainTrackerPage.js  # Tracker page
│   │   ├── PainTrackerPage.css
│   │   ├── PredictionsPage.js  # Predictions page
│   │   ├── PredictionsPage.css
│   │   ├── RecommendationsPage.js
│   │   └── RecommendationsPage.css
│   ├── App.js                  # Main app component
│   ├── App.css
│   ├── index.js                # React entry point
│   └── index.css
├── package.json
├── README.md
└── .gitignore
```

## Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## Testing

```bash
npm test
```

Launches the test runner in interactive watch mode.

## Troubleshooting

### Port 3000 already in use
```bash
# On Windows
netstat -ano | findstr :3000

# Kill the process using port 3000
taskkill /PID <process-id> /F
```

### Backend not responding
- Verify backend is running: `http://localhost:8000`
- Check backend logs for errors
- Ensure CORS is enabled in backend

### Empty dashboard
- You need to submit pain entries first
- Visit `/tracker` to add data
- Then go to `/dashboard` to see statistics

### API errors
- Check browser console (F12) for detailed errors
- Verify backend is responding
- Check that user_id is saved in localStorage

## Development Tips

### Access Browser DevTools
- Press `F12` or `Ctrl+Shift+I` (Windows/Linux)
- Or `Cmd+Option+I` (Mac)

### View Local Storage
- DevTools → Application → Local Storage → localhost:3000
- User ID is stored as `user_id`

### Debug Network Requests
- DevTools → Network tab
- Make requests and see responses

### React DevTools Extension
- Install React DevTools browser extension
- Inspect component hierarchy and props

## Useful Commands

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Update all dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix common vulnerabilities
npm audit fix
```

## Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
Drag and drop the `build/` folder to Netlify

### GitHub Pages
Configure in `package.json`:
```json
"homepage": "https://yourusername.github.io/repo-name"
```

## Next Steps

1. Start the backend server
2. Run `npm start` in the frontend directory
3. Open `http://localhost:3000`
4. Begin tracking your data!

## Getting Help

- Check the main README.md
- Review component comments in source code
- Check browser console for errors
- Verify backend is running and responding

## API Documentation

For full API docs, visit: `http://localhost:8000/docs` (Swagger UI)

