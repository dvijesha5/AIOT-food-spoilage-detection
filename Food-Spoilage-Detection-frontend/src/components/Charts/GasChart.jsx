import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export const GasChart = () => {
  const data = [
    { time: "1h", gas: 220 },
    { time: "2h", gas: 300 },
    { time: "3h", gas: 280 },
    { time: "4h", gas: 350 },
    { time: "5h", gas: 400 },
  ];

  return (
    <>
      {/* ----- CSS inside same file (Light green-white theme) ----- */}
      <style>{`
        .gas-card {
          padding: 15px;
          background-color: #e0f7e0; /* light green card */
          border-radius: 10px;
          border: 1px solid #c1e6c1;
          box-shadow: 0px 0px 8px rgba(42, 127, 42, 0.2);
        }

        .gas-title {
          color: #2a7f2a; /* dark green heading */
          margin-bottom: 12px;
          font-size: 18px;
          text-align: center;
        }

        .recharts-cartesian-grid line {
          stroke: #cce6cc; /* light green grid lines */
        }

        .recharts-tooltip-wrapper {
          background-color: #f7fff7 !important; /* tooltip light background */
          border: 1px solid #2a7f2a !important;
          color: #2a7f2a !important;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 480px) {
          .gas-card {
            padding: 10px;
          }

          .gas-title {
            font-size: 16px;
          }

          .recharts-cartesian-axis-tick-value {
            font-size: 12px;
          }
        }
      `}</style>

      <div className="gas-card">
        <h3 className="gas-title">Gas Value Analysis</h3>

        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cce6cc" />
            <XAxis dataKey="time" stroke="#2a7f2a" />
            <YAxis stroke="#2a7f2a" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f7fff7",
                border: "1px solid #2a7f2a",
                color: "#2a7f2a",
              }}
            />
            <Line
              type="monotone"
              dataKey="gas"
              stroke="#2a7f2a"
              strokeWidth={3}
              dot={{ r: 4, fill: "#2a7f2a" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

