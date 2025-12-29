from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import os
from sklearn.preprocessing import scale
import category_encoders as ce

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load or train model on startup
MODEL_PATH = 'model.pkl'
ENCODER_PATH = 'encoder.pkl'

# Sample data for real-time sensor readings (simulated)
sensor_data = {
    'temperature': 22,
    'humidity': 61,
    'gas': 340,
    'status': 'Fresh'
}

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Backend is running'})

@app.route('/api/sensor-data', methods=['GET'])
def get_sensor_data():
    """Get current sensor readings"""
    return jsonify(sensor_data)

@app.route('/api/predict', methods=['POST'])
def predict():
    """Manual prediction endpoint"""
    try:
        data = request.json
        temp = float(data.get('temp', 0))
        humidity = float(data.get('humidity', 0))
        gas = float(data.get('gas', 0))
        
        # Simple rule-based prediction (can be replaced with actual ML model)
        # Spoilage conditions: high temp (>25), high humidity (>70), high gas (>400)
        spoilage_score = 0
        if temp > 25:
            spoilage_score += 1
        if humidity > 70:
            spoilage_score += 1
        if gas > 400:
            spoilage_score += 1
            
        if spoilage_score >= 2:
            result = 'Spoiled'
            confidence = min(0.7 + (spoilage_score * 0.1), 0.95)
        else:
            result = 'Fresh'
            confidence = 0.85
            
        return jsonify({
            'prediction': result,
            'confidence': confidence,
            'input': {
                'temperature': temp,
                'humidity': humidity,
                'gas': gas
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/predict-csv', methods=['POST'])
def predict_csv():
    """Bulk prediction from CSV"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
            
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
            
        if not file.filename.endswith('.csv'):
            return jsonify({'error': 'File must be a CSV'}), 400
            
        # Read CSV
        df = pd.read_csv(file)
        
        # Validate columns
        required_cols = ['Temperature', 'Humidity', 'Gas']
        if not all(col in df.columns for col in required_cols):
            return jsonify({'error': f'CSV must contain columns: {", ".join(required_cols)}'}), 400
        
        predictions = []
        for _, row in df.iterrows():
            temp = float(row['Temperature'])
            humidity = float(row['Humidity'])
            gas = float(row['Gas'])
            
            # Simple rule-based prediction
            spoilage_score = 0
            if temp > 25:
                spoilage_score += 1
            if humidity > 70:
                spoilage_score += 1
            if gas > 400:
                spoilage_score += 1
                
            result = 'Spoiled' if spoilage_score >= 2 else 'Fresh'
            predictions.append(result)
        
        # Calculate summary statistics
        spoiled_count = predictions.count('Spoiled')
        fresh_count = predictions.count('Fresh')
        
        return jsonify({
            'total': len(predictions),
            'spoiled': spoiled_count,
            'fresh': fresh_count,
            'predictions': predictions[:100]  # Return first 100 predictions
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/update-sensor', methods=['POST'])
def update_sensor():
    """Update sensor readings (simulated IoT device)"""
    try:
        data = request.json
        global sensor_data
        
        if 'temperature' in data:
            sensor_data['temperature'] = float(data['temperature'])
        if 'humidity' in data:
            sensor_data['humidity'] = float(data['humidity'])
        if 'gas' in data:
            sensor_data['gas'] = float(data['gas'])
            
        # Update status based on values
        spoilage_score = 0
        if sensor_data['temperature'] > 25:
            spoilage_score += 1
        if sensor_data['humidity'] > 70:
            spoilage_score += 1
        if sensor_data['gas'] > 400:
            spoilage_score += 1
            
        sensor_data['status'] = 'Spoiled' if spoilage_score >= 2 else 'Fresh'
        
        return jsonify(sensor_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    print("Starting Flask backend server...")
    print("Backend will be available at: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
