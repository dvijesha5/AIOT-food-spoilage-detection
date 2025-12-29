import { useState } from "react";

export default function CSVUpload({ apiUrl }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid CSV file');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${apiUrl}/predict-csv`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to upload CSV. Please ensure the backend server is running.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .csv-card {
          padding: 24px;
          background-color: #e0f7e0; /* light green card */
          border-radius: 12px;
          box-shadow: 0px 0px 10px rgba(42,127,42,0.2);
        }

        .csv-title {
          font-size: 20px;
          font-weight: bold;
          color: #2a7f2a; /* dark green heading */
          margin-bottom: 12px;
        }

        .csv-input {
          padding: 12px;
          background: #f7fff7; /* light background for input */
          border: 1px solid #c1e6c1;
          border-radius: 6px;
          color: #333;
          width: 100%;
        }

        .csv-btn {
          margin-top: 12px;
          padding: 12px;
          background-color: #2a7f2a; /* dark green button */
          color: #f7fff7; /* white text */
          font-weight: bold;
          border-radius: 6px;
          cursor: pointer;
          width: 100%;
          border: none;
        }

        .csv-btn:hover {
          opacity: 0.9;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 480px) {
          .csv-card {
            padding: 16px;
          }

          .csv-title {
            font-size: 18px;
            margin-bottom: 10px;
          }

          .csv-input {
            padding: 10px;
          }

          .csv-btn {
            padding: 10px;
            font-size: 14px;
          }
        }
      `}</style>

      <div className="csv-card">
        <h2 className="csv-title">Upload CSV for Bulk Prediction</h2>

        <input
          type="file"
          accept=".csv"
          className="csv-input"
          onChange={handleFileChange}
        />

        <button 
          className="csv-btn"
          onClick={handleUpload}
          disabled={loading || !file}
        >
          {loading ? 'Processing...' : 'Upload & Predict'}
        </button>

        {error && (
          <div style={{ 
            marginTop: '12px', 
            padding: '8px', 
            backgroundColor: '#fee', 
            color: '#c00', 
            borderRadius: '6px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {result && (
          <div style={{ 
            marginTop: '12px', 
            padding: '12px', 
            backgroundColor: '#d4edda',
            color: '#155724',
            borderRadius: '6px'
          }}>
            <strong>Results:</strong><br />
            Total: {result.total}<br />
            Fresh: {result.fresh} ({((result.fresh / result.total) * 100).toFixed(1)}%)<br />
            Spoiled: {result.spoiled} ({((result.spoiled / result.total) * 100).toFixed(1)}%)
          </div>
        )}
      </div>
    </>
  );
}
