import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const SpoilagePie = () => {
  const data = [
    { name: "Fresh", value: 50 },
    { name: "Slightly Spoiled", value: 30 },
    { name: "Spoiled", value: 20 },
  ];

  const COLORS = ["#4caf50", "#ffd24d", "#ff6666"];

  return (
    <>
      {/* ----------- CSS Inside Same File (Light Green-White Theme) ----------- */}
      <style>{`
        .spoilagePie-card {
          background-color: #e0f7e0; /* light green card */
          padding: 15px;
          border-radius: 10px;
          border: 1px solid #c1e6c1;
          box-shadow: 0px 0px 10px rgba(42,127,42,0.2);
        }

        .spoilagePie-title {
          color: #2a7f2a; /* dark green heading */
          text-align: center;
          margin-bottom: 10px;
          font-size: 18px;
        }

        .recharts-tooltip-wrapper {
          background-color: #f7fff7 !important;
          border: 1px solid #2a7f2a !important;
          color: #2a7f2a !important;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 480px) {
          .spoilagePie-card {
            padding: 10px;
          }

          .spoilagePie-title {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="spoilagePie-card">
        <h3 className="spoilagePie-title">Spoilage Status Pie</h3>

        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={90}
              label
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={COLORS[i]} stroke="#f7fff7" />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#f7fff7",
                border: "1px solid #2a7f2a",
                color: "#2a7f2a",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
