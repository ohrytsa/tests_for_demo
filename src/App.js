import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TestingAPICall } from "./components/TestApiCall";
import { Calculator } from "./components/Calculator";

function App() {
  const [calculator, showCalculator] = useState(false);

  const handleCalculator = () => {
    showCalculator(!calculator);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Demo for testing API call in React using Jest and React Testing
          Library
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleCalculator}>
          {calculator ? "Hide Calculator" : "Show Calculator"}
        </button>
        {calculator && <Calculator />}
        <TestingAPICall />
      </header>
    </div>
  );
}

export default App;
