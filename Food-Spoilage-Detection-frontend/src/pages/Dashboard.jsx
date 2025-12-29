import { useState, useEffect } from "react";
import Header from "../components/Header";
import SensorCard from "../components/SensorCard";
import StatusBadge from "../components/StatusBadge";
import ManualInputForm from "../components/ManualInputForm";
import CSVUpload from "../components/CSVUpload";
import PowerBIDashboard from "../components/PowerBIDashboard";
import SpoilagePie from "../components/Charts/TimeSpoilageChart";
import TempHumidityChart from "../components/Charts/TempHumidityChart";
import { GasChart } from "../components/Charts/GasChart";

const API_URL = 'http://localhost:5000/api';

export default function Dashboard() {
  const [sensorData, setSensorData] = useState({
    temperature: 22,
    humidity: 61,
    gas: 340,
    status: 'Fresh'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch sensor data on component mount and every 5 seconds
  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchSensorData = async () => {
    try {
      const response = await fetch(`${API_URL}/sensor-data`);
      if (!response.ok) throw new Error('Failed to fetch sensor data');
      const data = await response.json();
      setSensorData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching sensor data:', err);
      setError('Backend not connected');
    }
  };

  return (
    <div className="dashboard-container">

      <style>{`
        .dashboard-container {
          padding: 24px;
          background-color: #f7fff7; /* light green background */
          color: #333;
          font-family: Arial, sans-serif;
        }

        /* Sensor Grid */
        .sensor-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: 24px;
        }

        @media (min-width: 768px) {
          .sensor-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Status Section */
        .status-section {
          margin-top: 24px;
        }

        /* Charts Grid */
        .charts-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-top: 24px;
        }

        @media (min-width: 768px) {
          .charts-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 1024px) {
          .charts-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Forms Grid */
        .forms-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-top: 40px;
        }

        @media (min-width: 1024px) {
          .forms-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Accuracy Card */
        .accuracy-card {
          margin-top: 32px;
          padding: 24px;
          background-color: #e0f7e0; /* light green card */
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .accuracy-card h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #2a7f2a; /* dark green heading */
        }

        .accuracy-card span {
          color: #2a7f2a;
          font-weight: bold;
        }

        /* Mobile adjustments */
        @media (max-width: 480px) {
          .dashboard-container {
            padding: 16px;
          }

          .charts-grid, .forms-grid {
            gap: 16px;
          }

          .accuracy-card {
            padding: 16px;
          }
        }
      `}</style>

      <Header />

      {error && (
        <div style={{
          padding: '12px',
          marginTop: '16px',
          backgroundColor: '#fee',
          color: '#c00',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          ⚠️ {error} - Showing simulated data
        </div>
      )}

      {/* Sensor Values */}
      <div className="sensor-grid">
        <SensorCard title="Temperature" value={`${sensorData.temperature}°C`} />
        <SensorCard title="Humidity" value={`${sensorData.humidity}%`} />
        <SensorCard title="Gas Level" value={`${sensorData.gas} ppm`} />
      </div>

      {/* Spoilage status */}
      <div className="status-section">
        <StatusBadge status={sensorData.status} />
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <SpoilagePie />
        <TempHumidityChart />
        <GasChart />
      </div>

      {/* Forms */}
      <div className="forms-grid">
        <ManualInputForm apiUrl={API_URL} />
        <CSVUpload apiUrl={API_URL} />
      </div>

      {/* Accuracy card */}
      <div className="accuracy-card">
        <h2>Model Accuracy & Comparisons</h2>
        <p>
          Accuracy: <span>94.2%</span>
        </p>
      </div>

      {/* Power BI Dashboard */}
      <PowerBIDashboard />

    </div>
  );
}
