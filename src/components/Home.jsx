import React, { useState } from "react";
import { Calculator } from "./Calculator";

const Home = () => {
  const [calculator, showCalculator] = useState(false);

  const handleCalculator = () => {
    showCalculator(!calculator);
  };
  return (
    <div style={{ textAlign: "center", maxWidth: "600px" }}>
      <header>
        <h1 style={{ color: "#2c3e50" }}>Home Page</h1>
        <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
          Welcome to the home page!
        </h2>
      </header>
      <main>
        <button onClick={handleCalculator} style={{ marginBottom: "15px" }}>
          {calculator ? "Hide Calculator" : "Show Calculator"}{" "}
        </button>
        {calculator && <Calculator />}
      </main>
      <footer style={{ marginTop: "30px", color: "#4a4a4a", fontSize: "14px" }}>
        &copy; 2026 Home Page. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
