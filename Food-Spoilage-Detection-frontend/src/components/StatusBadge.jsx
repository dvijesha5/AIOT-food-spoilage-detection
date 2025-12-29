export default function StatusBadge({ status }) {
  const color =
    status === "Fresh"
      ? "#4caf50"       // green
      : status === "Slightly Spoiled"
      ? "#ffd24d"       // yellow
      : "#ff6666";      // red

  return (
    <>
      <style>{`
        .status-badge {
          padding: 16px;
          text-align: center;
          background: #e0f7e0; /* light green card */
          border-radius: 12px;
          box-shadow: 0px 0px 10px rgba(42,127,42,0.2);
        }

        .status-text {
          font-size: 28px;
          font-weight: bold;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 480px) {
          .status-badge {
            padding: 12px;
          }

          .status-text {
            font-size: 22px;
          }
        }
      `}</style>

      <div className="status-badge">
        <span className="status-text" style={{ color: color }}>
          {status}
        </span>
      </div>
    </>
  );
}
