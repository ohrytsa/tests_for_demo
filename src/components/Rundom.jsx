import React, { useState } from "react";
import { styles } from "./Rundom.styles";
import { globalEventEmitter } from "../utils/EventEmitter";

const Rundom = () => {
  const [prediction, setPrediction] = useState("");

  const predictions = [
    "🌟 Today you will discover something amazing!",
    "💰 A financial opportunity is coming your way!",
    "❤️ Love is in the air - someone special is thinking of you!",
    "🎉 A pleasant surprise awaits you today!",
    "🚀 Your hard work will finally pay off!",
    "🌈 Today is your lucky day - take a chance!",
    "📚 You will learn something valuable today!",
    "🎯 Success is within your reach - keep going!",
    "☕ A stranger will brighten your day!",
    "🎨 Your creativity will shine today!",
    "🌺 Good news is on its way!",
    "⭐ Someone will appreciate your efforts today!",
    "🎵 A happy coincidence will make you smile!",
    "🌸 Today is perfect for new beginnings!",
    "💫 Your dreams are closer than you think!",
  ];

  const getRandomPrediction = () => {
    const randomIndex = Math.floor(Math.random() * predictions.length);
    const newPrediction = predictions[randomIndex];
    setPrediction(newPrediction);

    globalEventEmitter.emit("predictionGenerated", {
      prediction: newPrediction,
      timestamp: new Date().toISOString(),
      index: randomIndex,
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Random Prediction</h2>
      <p style={styles.description}>
        Click the button below to get a random prediction from Us!
      </p>

      <button
        onClick={getRandomPrediction}
        style={styles.button}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        🔮 Get Your Prediction!
      </button>

      {prediction && <div style={styles.predictionBox}>{prediction}</div>}
    </div>
  );
};

export default Rundom;
