import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export const SpoilageDistributionChart = () => {
  const data = [
    { name: "Fresh", value: 45 },
    { name: "Slightly Spoiled", value: 30 },
    { name: "Spoiled", value: 25 },
  ];

  const COLORS = ["#4caf50", "#ffd24d", "#ff6666"]; // Green, Yellow, Red

  return (
    <>
      <style>{`
        .spoilage-card {
          padding: 15px;
          background-color: #e0f7e0; /* light green card */
          border-radius: 10px;
          border: 1px solid #c1e6c1;
          box-shadow: 0px 0px 8px rgba(42, 127, 42, 0.2);
        }

        .spoilage-title {
          color: #2a7f2a; /* dark green heading */
          margin-bottom: 12px;
          font-size: 18px;
          text-align: center;
        }

        .color-legend {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: bold;
          color: #2a7f2a;
        }

        .color-box {
          width: 18px;
          height: 18px;
          border-radius: 4px;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 480px) {
          .spoilage-card {
            padding: 10px;
          }

          .spoilage-title {
            font-size: 16px;
          }

          .color-legend {
            gap: 10px;
          }

          .legend-item {
            font-size: 14px;
          }
        }
      `}</style>

      <div className="spoilage-card">
        <h3 className="spoilage-title">Spoilage Distribution</h3>

        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} stroke="#f7fff7" />
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

        {/* Inline Color Legend */}
        <div className="color-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <div
                className="color-box"
                style={{ backgroundColor: COLORS[index] }}
              ></div>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
