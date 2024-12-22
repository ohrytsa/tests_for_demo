import React, { useState } from "react";

export const Calculator = () => {
  const [value, setValue] = useState("");

  const handleClick = (buttonValue) => {
    setValue((prevValue) => prevValue + buttonValue);
  };

  const handleReset = () => {
    setValue("");
  };

  const handleCalculate = () => {
    try {
      setValue(eval(value).toString());
    } catch (error) {
      setValue("Error");
    }
  };

  const numberButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const operatorButtons = ["+", "-"];

  return (
    <div>
      <div>
        <input type="text" value={value} readOnly />
      </div>
      <div>
        {numberButtons.map((num) => (
          <button key={num} onClick={() => handleClick(num)}>
            {num}
          </button>
        ))}
      </div>
      <div>
        {operatorButtons.map((op) => (
          <button key={op} onClick={() => handleClick(op)}>
            {op}
          </button>
        ))}
      </div>
      <div>
        <button onClick={handleReset}>C</button>
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
};
