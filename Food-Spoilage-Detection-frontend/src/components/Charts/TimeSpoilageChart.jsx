import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Fresh", value: 50 },
  { name: "Slightly Spoiled", value: 30 },
  { name: "Spoiled", value: 20 },
];

const colors = ["#4caf50", "#ffd24d", "#ff6666"];

export default function SpoilagePie() {
  return (
    <>
      <style>{`
        .sp-card {
          padding: 24px;
          background-color: #e0f7e0; /* light green card */
          border-radius: 12px;
          box-shadow: 0px 0px 10px rgba(42,127,42,0.2);
        }

        .sp-title {
          font-size: 18px;
          margin-bottom: 16px;
          color: #2a7f2a; /* dark green title */
          text-align: center;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 480px) {
          .sp-card {
            padding: 12px;
          }

          .sp-title {
            font-size: 16px;
            margin-bottom: 12px;
          }
        }
      `}</style>

      <div className="sp-card">
        <h2 className="sp-title">Spoilage Distribution</h2>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={colors[index]} stroke="#f7fff7" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
