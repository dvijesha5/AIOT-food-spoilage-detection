export default function SensorCard({ title, value }) {
  return (
    <>
      <style>{`
        .sensor-card {
          padding: 16px;
          background: #e0f7e0; /* light green card */
          border-radius: 12px;
          text-align: center;
          box-shadow: 0px 0px 10px rgba(42,127,42,0.2);
        }

        .sensor-title {
          font-size: 18px;
          color: #2a7f2a; /* dark green title */
        }

        .sensor-value {
          color: #2a7f2a; /* dark green value */
          font-size: 28px;
          font-weight: bold;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 480px) {
          .sensor-card {
            padding: 12px;
          }

          .sensor-title {
            font-size: 16px;
          }

          .sensor-value {
            font-size: 22px;
          }
        }
      `}</style>

      <div className="sensor-card">
        <h3 className="sensor-title">{title}</h3>
        <p className="sensor-value">{value}</p>
      </div>
    </>
  );
}
