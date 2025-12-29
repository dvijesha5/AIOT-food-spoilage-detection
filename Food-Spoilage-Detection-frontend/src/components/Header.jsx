export default function Header() {
  return (
    <>
      <style>{`
        .header-bar {
          width: 100%;
          background: linear-gradient(90deg, #e0f7e0, #c1e6c1); /* light green gradient */
          padding: 20px 0;
          border-radius: 12px;
          box-shadow: 0px 0px 15px rgba(42, 127, 42, 0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }

        .header-title {
          font-size: 28px;
          font-weight: bold;
          color: #2a7f2a; /* dark green title */
          text-align: center;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 480px) {
          .header-bar {
            padding: 14px 0;
          }

          .header-title {
            font-size: 20px;
          }
        }
      `}</style>

      <header className="header-bar">
        <h1 className="header-title">
          Food Spoilage Detection Dashboard
        </h1>
      </header>
    </>
  );
}
