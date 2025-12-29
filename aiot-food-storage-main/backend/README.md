# Backend Setup Instructions

## Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

## Installation

1. Navigate to the backend directory:
```bash
cd aiot-food-storage-main/backend
```

2. Install required dependencies:
```bash
pip install -r requirements.txt
```

## Running the Backend

Start the Flask server:
```bash
python app.py
```

The backend will start on `http://localhost:5000`

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/sensor-data` - Get current sensor readings
- `POST /api/predict` - Manual prediction (JSON body: `{temp, humidity, gas}`)
- `POST /api/predict-csv` - Bulk CSV prediction (multipart/form-data with file)
- `POST /api/update-sensor` - Update sensor readings

## Testing the API

You can test the API using curl or any HTTP client:

```bash
# Health check
curl http://localhost:5000/api/health

# Get sensor data
curl http://localhost:5000/api/sensor-data

# Manual prediction
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"temp": 30, "humidity": 75, "gas": 450}'
```

## Frontend Connection

The frontend React app at `http://localhost:5173` is configured to connect to this backend automatically.

Make sure to:
1. Start the backend first (`python app.py`)
2. Then start the frontend (`npm run dev`)
