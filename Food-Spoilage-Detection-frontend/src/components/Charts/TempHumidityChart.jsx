import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function TempHumidityChart({ data }) {
  return (
    <>
      <style>{`
        .tempHumidity-card {
          background: #e0f7e0; /* light green card */
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 0 12px rgba(42,127,42,0.2);
          border: 1px solid #c1e6c1;
        }

        .tempHumidity-title {
          color: #2a7f2a;
          margin-bottom: 10px;
          font-size: 18px;
        }

        .recharts-tooltip-wrapper {
          background: #f7fff7 !important;
          border: 1px solid #2a7f2a !important;
          color: #2a7f2a !important;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 480px) {
          .tempHumidity-card {
            padding: 12px;
          }

          .tempHumidity-title {
            font-size: 16px;
          }

          .recharts-cartesian-axis-tick-value {
            font-size: 12px;
          }
        }
      `}</style>

      <div className="tempHumidity-card">
        <h3 className="tempHumidity-title">Temperature & Humidity Trends</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#cce6cc" />
            <XAxis dataKey="time" stroke="#2a7f2a" />
            <YAxis stroke="#2a7f2a" />
            <Tooltip
              contentStyle={{
                background: "#f7fff7",
                border: "1px solid #2a7f2a",
                color: "#2a7f2a",
              }}
            />

            {/* Temperature Line */}
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#4caf50"
              strokeWidth={2}
              dot={{ fill: "#4caf50" }}
            />

            {/* Humidity Line */}
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#ffd24d"
              strokeWidth={2}
              dot={{ fill: "#ffd24d" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default TempHumidityChart;
