import { useState } from "react";

export default function PowerBIDashboard() {
  const [embedUrl, setEmbedUrl] = useState("");
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const handleEmbed = () => {
    if (embedUrl.trim()) {
      setIsEmbedded(true);
      setShowInput(false);
    }
  };

  const handleRemove = () => {
    setIsEmbedded(false);
    setEmbedUrl("");
  };

  return (
    <>
      <style>{`
        .powerbi-container {
          margin-top: 32px;
          padding: 24px;
          background-color: #e0f7e0;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .powerbi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .powerbi-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2a7f2a;
        }

        .powerbi-btn {
          padding: 8px 16px;
          background-color: #2a7f2a;
          color: #f7fff7;
          font-weight: bold;
          border-radius: 6px;
          cursor: pointer;
          border: none;
          font-size: 14px;
          transition: opacity 0.2s;
        }

        .powerbi-btn:hover {
          opacity: 0.9;
        }

        .powerbi-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .powerbi-btn-secondary {
          background-color: #666;
          margin-left: 8px;
        }

        .powerbi-input-container {
          margin-bottom: 16px;
        }

        .powerbi-input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          background: #f7fff7;
          color: #333;
          border: 1px solid #c1e6c1;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .powerbi-iframe {
          width: 100%;
          height: 600px;
          border: none;
          border-radius: 8px;
          background: white;
        }

        .powerbi-instructions {
          padding: 16px;
          background-color: #fff9e6;
          border-left: 4px solid #ffc107;
          border-radius: 4px;
          margin-bottom: 16px;
          color: #333;
        }

        .powerbi-instructions h4 {
          margin: 0 0 8px 0;
          color: #2a7f2a;
          font-size: 16px;
        }

        .powerbi-instructions ol {
          margin: 8px 0;
          padding-left: 20px;
        }

        .powerbi-instructions li {
          margin: 4px 0;
          font-size: 14px;
        }

        .powerbi-instructions code {
          background: #f0f0f0;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 13px;
        }

        .powerbi-placeholder {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }

        .powerbi-placeholder svg {
          width: 80px;
          height: 80px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .powerbi-container {
            padding: 16px;
          }

          .powerbi-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .powerbi-iframe {
            height: 400px;
          }

          .powerbi-btn {
            width: 100%;
          }

          .powerbi-btn-secondary {
            margin-left: 0;
            margin-top: 8px;
          }
        }
      `}</style>

      <div className="powerbi-container">
        <div className="powerbi-header">
          <h2 className="powerbi-title">📊 Power BI Dashboard</h2>
          <div>
            {!isEmbedded && (
              <button
                className="powerbi-btn"
                onClick={() => setShowInput(!showInput)}
              >
                {showInput ? "Cancel" : "Add Dashboard"}
              </button>
            )}
            {isEmbedded && (
              <>
                <button
                  className="powerbi-btn"
                  onClick={() => setShowInput(true)}
                >
                  Change URL
                </button>
                <button
                  className="powerbi-btn powerbi-btn-secondary"
                  onClick={handleRemove}
                >
                  Remove
                </button>
              </>
            )}
          </div>
        </div>

        {showInput && (
          <div className="powerbi-input-container">
            <div className="powerbi-instructions">
              <h4>How to get Power BI Embed URL:</h4>
              <ol>
                <li>Open your Power BI report at <code>app.powerbi.com</code></li>
                <li>Click <strong>File → Embed report → Publish to web</strong></li>
                <li>Click <strong>Create embed code</strong></li>
                <li>Copy the URL from the iframe src attribute</li>
                <li>Paste it below</li>
              </ol>
            </div>
            <input
              type="text"
              className="powerbi-input"
              placeholder="Paste your Power BI embed URL here (e.g., https://app.powerbi.com/view?r=...)"
              value={embedUrl}
              onChange={(e) => setEmbedUrl(e.target.value)}
            />
            <button
              className="powerbi-btn"
              onClick={handleEmbed}
              disabled={!embedUrl.trim()}
            >
              Embed Dashboard
            </button>
          </div>
        )}

        {isEmbedded && embedUrl ? (
          <iframe
            className="powerbi-iframe"
            src={embedUrl}
            frameBorder="0"
            allowFullScreen={true}
            title="Power BI Dashboard"
          />
        ) : !showInput ? (
          <div className="powerbi-placeholder">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p>
              <strong>No Power BI dashboard embedded yet</strong>
            </p>
            <p style={{ fontSize: "14px", marginTop: "8px" }}>
              Click "Add Dashboard" to embed your Power BI report
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}
