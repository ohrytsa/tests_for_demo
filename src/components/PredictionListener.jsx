import React, { useState, useEffect } from "react";
import { globalEventEmitter } from "../utils/EventEmitter";

const PredictionListener = () => {
  const [eventLog, setEventLog] = useState([]);
  const [totalPredictions, setTotalPredictions] = useState(0);

  useEffect(() => {
    const unsubscribe = globalEventEmitter.on("predictionGenerated", (data) => {
      // eslint-disable-next-line no-console
      console.log("Received prediction event:", data);

      setEventLog((prevLog) => {
        const newLog = [
          {
            ...data,
            id: Date.now(),
          },
          ...prevLog.slice(0, 4),
        ];
        // eslint-disable-next-line no-console
        console.log("Updated event log:", newLog);
        return newLog;
      });

      setTotalPredictions((prev) => prev + 1);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const clearLog = () => {
    setEventLog([]);
    setTotalPredictions(0);
  };

  const styles = {
    container: {
      marginTop: "30px",
      padding: "20px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      maxWidth: "600px",
    },
    header: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#2d3748",
      marginBottom: "15px",
      borderBottom: "2px solid #e0e0e0",
      paddingBottom: "10px",
    },
    counter: {
      fontSize: "16px",
      color: "#5a67d8",
      marginBottom: "15px",
      fontWeight: "600",
    },
    logItem: {
      padding: "12px",
      background: "#f8f9fa",
      borderRadius: "8px",
      marginBottom: "10px",
      borderLeft: "4px solid #38a169",
    },
    predictionText: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#2d3748",
      marginBottom: "5px",
    },
    timestamp: {
      fontSize: "12px",
      color: "#718096",
    },
    button: {
      padding: "8px 16px",
      fontSize: "14px",
      border: "none",
      borderRadius: "6px",
      background: "#e53e3e",
      color: "white",
      cursor: "pointer",
      transition: "background 0.2s",
    },
    emptyState: {
      padding: "20px",
      textAlign: "center",
      color: "#a0aec0",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>📡 Event Listener - Prediction Tracker</div>

      <div style={styles.counter}>
        Total Predictions Generated: {totalPredictions}
      </div>

      {eventLog.length > 0 ? (
        <>
          <div style={{ marginBottom: "15px" }}>
            {eventLog.map((event) => (
              <div key={event.id} style={styles.logItem}>
                <div style={styles.predictionText}>{event.prediction}</div>
                <div style={styles.timestamp}>
                  {new Date(event.timestamp).toLocaleTimeString()} (Index:{" "}
                  {event.index})
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={clearLog}
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.background = "#c53030")}
            onMouseLeave={(e) => (e.target.style.background = "#e53e3e")}
          >
            Clear Log
          </button>
        </>
      ) : (
        <div style={styles.emptyState}>
          No predictions yet. Generate a prediction to see events here!
        </div>
      )}
    </div>
  );
};

export default PredictionListener;
