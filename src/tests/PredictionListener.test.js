import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PredictionListener from "../components/PredictionListener";
import { globalEventEmitter } from "../utils/EventEmitter";

describe("PredictionListener Component", () => {
  beforeEach(() => {
    globalEventEmitter.removeAllListeners();
  });

  test("renders with initial state", () => {
    render(<PredictionListener />);

    expect(
      screen.getByText(/📡 Event Listener - Prediction Tracker/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Total Predictions Generated: 0/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/No predictions yet/i)).toBeInTheDocument();
  });

  test("listens to predictionGenerated events", async () => {
    render(<PredictionListener />);
    globalEventEmitter.emit("predictionGenerated", {
      prediction: "🌟 Test prediction!",
      timestamp: new Date().toISOString(),
      index: 0,
    });

    await waitFor(() => {
      expect(screen.getByText(/🌟 Test prediction!/i)).toBeInTheDocument();
    });

    expect(
      screen.getByText(/Total Predictions Generated: 1/i)
    ).toBeInTheDocument();
  });

  test("displays multiple events in log", async () => {
    render(<PredictionListener />);

    globalEventEmitter.emit("predictionGenerated", {
      prediction: "First prediction",
      timestamp: new Date().toISOString(),
      index: 0,
    });

    globalEventEmitter.emit("predictionGenerated", {
      prediction: "Second prediction",
      timestamp: new Date().toISOString(),
      index: 1,
    });

    await waitFor(() => {
      expect(screen.getByText(/First prediction/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Second prediction/i)).toBeInTheDocument();

    expect(
      screen.getByText(/Total Predictions Generated: 2/i)
    ).toBeInTheDocument();
  });

  test("clears log when clear button is clicked", async () => {
    render(<PredictionListener />);

    globalEventEmitter.emit("predictionGenerated", {
      prediction: "Test prediction",
      timestamp: new Date().toISOString(),
      index: 0,
    });

    await waitFor(() => {
      expect(screen.getByText(/Test prediction/i)).toBeInTheDocument();
    });

    const clearButton = screen.getByRole("button", { name: /Clear Log/i });
    await userEvent.click(clearButton);

    expect(screen.queryByText(/Test prediction/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/Total Predictions Generated: 0/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/No predictions yet/i)).toBeInTheDocument();
  });

  test("shows only last 5 events", async () => {
    render(<PredictionListener />);

    for (let i = 0; i < 7; i++) {
      globalEventEmitter.emit("predictionGenerated", {
        prediction: `Prediction ${i}`,
        timestamp: new Date().toISOString(),
        index: i,
      });
    }

    await waitFor(() => {
      expect(screen.getByText(/Prediction 6/i)).toBeInTheDocument();
    });
    expect(screen.queryByText(/Prediction 0/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Prediction 1/i)).not.toBeInTheDocument();

    expect(screen.getByText(/Prediction 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Prediction 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Prediction 4/i)).toBeInTheDocument();
    expect(screen.getByText(/Prediction 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Prediction 6/i)).toBeInTheDocument();

    expect(
      screen.getByText(/Total Predictions Generated: 7/i)
    ).toBeInTheDocument();
  });

  test("unsubscribes on component unmount", () => {
    const { unmount } = render(<PredictionListener />);

    expect(globalEventEmitter.listenerCount("predictionGenerated")).toBe(1);

    unmount();

    expect(globalEventEmitter.listenerCount("predictionGenerated")).toBe(0);
  });

  test("displays timestamp and index correctly", async () => {
    render(<PredictionListener />);

    const testTimestamp = new Date("2026-02-07T12:00:00.000Z").toISOString();

    globalEventEmitter.emit("predictionGenerated", {
      prediction: "Test prediction",
      timestamp: testTimestamp,
      index: 5,
    });

    await waitFor(() => {
      expect(screen.getByText(/Index: 5/i)).toBeInTheDocument();
    });
  });

  test("handles rapid event emissions", async () => {
    render(<PredictionListener />);

    for (let i = 0; i < 10; i++) {
      globalEventEmitter.emit("predictionGenerated", {
        prediction: `Prediction ${i}`,
        timestamp: new Date().toISOString(),
        index: i,
      });
    }

    await waitFor(() => {
      expect(
        screen.getByText(/Total Predictions Generated: 10/i)
      ).toBeInTheDocument();
    });
  });
});
