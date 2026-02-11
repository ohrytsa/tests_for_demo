import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  test("renders navigation links", () => {
    render(<App />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Random")).toBeInTheDocument();
    expect(screen.getByText("Contacts")).toBeInTheDocument();
  });

  test("renders Home page by default", () => {
    render(<App />);
    expect(screen.getByText("Home Page")).toBeInTheDocument();
    expect(screen.getByText("Welcome to the home page!")).toBeInTheDocument();
  });

  test("renders the calculator toggle button", () => {
    render(<App />);
    const buttonOn = screen.getByRole("button", { name: "Show Calculator" });
    expect(buttonOn).toBeInTheDocument();

    fireEvent.click(buttonOn);

    const buttonOff = screen.getByText("Hide Calculator");
    expect(buttonOff).toBeInTheDocument();
  });

  test("navigates to Random page when clicking Random link", () => {
    render(<App />);
    const randomLink = screen.getByText("Random");
    fireEvent.click(randomLink);

    expect(
      screen.getByText("📡 Event Listener - Prediction Tracker")
    ).toBeInTheDocument();
  });

  test("navigates to Contacts page when clicking Contacts link", () => {
    render(<App />);
    const contactLink = screen.getByText("Contacts");
    fireEvent.click(contactLink);

    expect(screen.getByText("Contacts")).toBeInTheDocument();
  });
});
