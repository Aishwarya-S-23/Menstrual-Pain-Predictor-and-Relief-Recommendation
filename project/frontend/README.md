# Period Pain Predictor - Frontend

A modern React frontend for the Period Pain Predictor MVP application. This is a privacy-first AI-powered application for tracking menstrual cycle pain and receiving personalized recommendations.

## Features

- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🎯 **Pain Tracking** - Easy-to-use interface for logging pain levels and lifestyle factors
- 📊 **Dashboard** - View your pain history and trends
- 🔮 **Predictions** - Get AI-powered predictions for upcoming pain
- 💡 **Recommendations** - Receive personalized pain management advice
- 🔒 **Privacy First** - All data stays on your device (localStorage-based with API backend)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   └── Navbar.css
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── HomePage.css
│   │   ├── DashboardPage.js
│   │   ├── DashboardPage.css
│   │   ├── PainTrackerPage.js
│   │   ├── PainTrackerPage.css
│   │   ├── PredictionsPage.js
│   │   ├── PredictionsPage.css
│   │   ├── RecommendationsPage.js
│   │   └── RecommendationsPage.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Pages

### Home
- Welcome page with app overview
- Key features overview
- How it works section

### Tracker
- Log pain entries with score, type, and notes
- Log lifestyle data (sleep, exercise, stress, hydration)
- Real-time form feedback

### Dashboard
- View statistics (total entries, average pain, max/min)
- Recent pain history table
- Data refresh capability

### Predictions
- Get 1-14 day pain predictions
- View predicted pain levels and stress
- Confidence scores for predictions

### Recommendations
- Personalized pain management recommendations
- Feedback system (thumbs up/down)
- Category-based recommendations

## Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner.

## Environment Variables

Create a `.env.local` file in the frontend directory:

```
REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
```

## API Integration

The frontend connects to the backend API running at `http://localhost:8000`. Make sure the backend is running before using the frontend.

Endpoints:
- `GET /api/v1/predictions` - Get pain predictions
- `GET /api/v1/recommendations` - Get recommendations
- `POST /api/v1/pain` - Submit pain entry
- `POST /api/v1/lifestyle` - Submit lifestyle data
- `GET /api/v1/pain/{user_id}` - Get pain history
- `POST /api/v1/feedback` - Submit feedback

## Technologies Used

- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **CSS3** - Styling with flexbox and grid

## Styling

The app uses custom CSS with:
- Modern gradient backgrounds
- Responsive grid layouts
- Smooth animations and transitions
- Color-coded pain levels
- Mobile-first design approach

## User Data

User ID is automatically generated and stored in localStorage. No data is stored locally beyond the user ID - all tracking data is sent to the backend API.

## License

MIT License - feel free to use this for personal or commercial projects.

## Support

For issues or questions, please create an issue in the repository or contact the development team.
