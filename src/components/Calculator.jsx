import React, { useState } from "react";
import { styles } from "./Calculator.styles";
import { evaluate } from "mathjs";

export const Calculator = () => {
  const [value, setValue] = useState("");

  const handleClick = (buttonValue) => {
    setValue((prev) => prev + buttonValue);
  };

  const handleReset = () => {
    setValue("");
  };

  const handleCalculate = () => {
    try {
      setValue(evaluate(value).toString());
    } catch {
      setValue("Error");
    }
  };

  const handleKeyDown = (e) => {
    if (/[0-9+\-*/]/.test(e.key)) {
      handleClick(e.key);
    }
    if (e.key === "Enter") {
      handleCalculate();
    }
    if (e.key === "Escape") {
      handleReset();
    }
  };

  const numberButtons = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
  const operatorButtons = ["+", "-", "*", "/"];

  return (
    <div style={styles.container}>
      <div
        style={styles.calculator}
        role="application"
        aria-label="Calculator"
        onKeyDown={handleKeyDown}
      >
        {/* Accessible label */}
        <label htmlFor="calculator-display" className="sr-only">
          Calculator display
        </label>

        <input
          id="calculator-display"
          type="text"
          value={value}
          readOnly
          style={styles.display}
          placeholder="0"
          aria-live="polite"
          aria-atomic="true"
        />

        <div style={styles.buttonGrid} role="group" aria-label="Numbers">
          {numberButtons.map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleClick(num)}
              style={styles.button}
              aria-label={`Number ${num}`}
            >
              {num}
            </button>
          ))}
        </div>

        <div style={styles.operatorGrid} role="group" aria-label="Operators">
          {operatorButtons.map((op) => (
            <button
              key={op}
              type="button"
              onClick={() => handleClick(op)}
              style={styles.operatorButton}
              aria-label={`Operator ${op}`}
            >
              {op}
            </button>
          ))}
        </div>

        <div style={styles.actionGrid} role="group" aria-label="Actions">
          <button
            type="button"
            onClick={handleReset}
            style={styles.clearButton}
            aria-label="Clear calculator"
          >
            C
          </button>

          <button
            type="button"
            onClick={handleCalculate}
            style={styles.equalsButton}
            aria-label="Calculate result"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};
