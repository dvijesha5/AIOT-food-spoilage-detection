# Food Spoilage Detection - Full Stack Setup

## System Architecture

This project consists of:
- **Frontend**: React + Vite (Port 5173)
- **Backend**: Flask API (Port 5000)
- **ML Model**: SVM-based spoilage detection

## Quick Start

### 1. Start the Backend (Flask API)

```powershell
cd aiot-food-storage-main\backend
pip install -r requirements.txt
python app.py
```

Backend will run at: `http://localhost:5000`

### 2. Start the Frontend (React)

```powershell
cd Food-Spoilage-Detection-frontend
npm install  # if not already done
npm run dev
```

Frontend will run at: `http://localhost:5173`

### 3. Access the Application

Open your browser and navigate to: `http://localhost:5173`

## Features

### Real-time Sensor Monitoring
- Temperature (°C)
- Humidity (%)
- Gas Level (ppm)
- Spoilage Status (Fresh/Spoiled)

### Manual Prediction
Enter sensor values manually to get instant spoilage predictions with confidence scores.

### Bulk CSV Prediction
Upload CSV files with multiple sensor readings for batch prediction.

**CSV Format:**
```csv
Temperature,Humidity,Gas
22,61,340
25,65,380
28,75,450
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/sensor-data` - Get current sensor readings
- `POST /api/predict` - Manual prediction
  ```json
  {
    "temp": 25,
    "humidity": 70,
    "gas": 400
  }
  ```
- `POST /api/predict-csv` - Bulk CSV prediction
- `POST /api/update-sensor` - Update sensor readings

## Spoilage Detection Logic

The system predicts spoilage based on:
- **Temperature**: > 25°C (concerning)
- **Humidity**: > 70% (concerning)
- **Gas Level**: > 400 ppm (concerning)

If 2 or more conditions are met, the food is classified as **Spoiled**.

## Troubleshooting

### Frontend shows "Backend not connected"
- Ensure the Flask backend is running on port 5000
- Check that no firewall is blocking the connection

### Port already in use
- Backend: Change port in `app.py` (line: `app.run(port=5000)`)
- Frontend: Change port in `vite.config.js`

### CORS errors
- The backend has CORS enabled for all origins
- If issues persist, check browser console for details

## Tech Stack

**Frontend:**
- React 19
- Vite
- Lucide Icons
- Recharts

**Backend:**
- Flask 3.0
- Flask-CORS
- Pandas
- NumPy
- Scikit-learn

**ML Model:**
- Support Vector Machine (SVM)
- Linear Kernel
- Category Encoders for preprocessing
