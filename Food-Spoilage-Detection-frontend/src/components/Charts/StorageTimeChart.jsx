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

export const StorageTimeChart = () => {
  const data = [
    { hours: 0, spoilage: 0 },
    { hours: 5, spoilage: 10 },
    { hours: 10, spoilage: 20 },
    { hours: 15, spoilage: 35 },
    { hours: 20, spoilage: 55 },
    { hours: 25, spoilage: 70 },
    { hours: 30, spoilage: 90 },
  ];

  return (
    <>
      {/* -------- CSS inside same JSX file (Light Green-White Theme) -------- */}
      <style>{`
        .storage-card {
          padding: 15px;
          background-color: #e0f7e0; /* light green card */
          border-radius: 10px;
          border: 1px solid #c1e6c1;
          box-shadow: 0px 0px 8px rgba(42, 127, 42, 0.2);
        }

        .storage-title {
          color: #2a7f2a; /* dark green heading */
          margin-bottom: 12px;
          font-size: 18px;
          text-align: center;
        }

        .tooltip-box {
          background-color: #f7fff7 !important; /* light tooltip background */
          border: 1px solid #2a7f2a !important;
          color: #2a7f2a !important;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 480px) {
          .storage-card {
            padding: 10px;
          }

          .storage-title {
            font-size: 16px;
          }

          .recharts-cartesian-axis-tick-value {
            font-size: 12px;
          }

          .recharts-label {
            font-size: 12px;
          }
        }
      `}</style>

      <div className="storage-card">
        <h3 className="storage-title">Storage Time vs Spoilage</h3>

        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cce6cc" />

            <XAxis
              dataKey="hours"
              stroke="#2a7f2a"
              label={{
                value: "Hours",
                position: "insideBottom",
                fill: "#2a7f2a",
              }}
            />
            <YAxis
              stroke="#2a7f2a"
              label={{
                value: "Spoilage %",
                angle: -90,
                fill: "#2a7f2a",
              }}
            />

            <Tooltip contentStyle={{}} wrapperClassName="tooltip-box" />

            <Line
              type="monotone"
              dataKey="spoilage"
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
