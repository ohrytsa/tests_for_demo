import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("renders learn react link", () => {
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders the logo", () => {
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });

  test("renders the header", () => {
    const header = screen.getByText(
      "Demo for testing API call in React using Jest and React Testing Library"
    );
    expect(header).toBeInTheDocument();
  });

  test("renders the button for calculator", () => {
    const buttonOn = screen.getByRole("button");

    expect(buttonOn).toBeInTheDocument();

    fireEvent.click(buttonOn);

    const buttonOff = screen.getByText("Hide Calculator");

    expect(buttonOff).toBeInTheDocument();
  });
});
