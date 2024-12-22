import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Calculator } from "../components/Calculator";

describe("Calculator", () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  test("input has readonly attribute", () => {
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("readOnly");
  });

  test("should render calculator input and buttons", () => {
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  test("should display numbers when buttons are clicked", () => {
    fireEvent.click(screen.getByText("4"));
    fireEvent.click(screen.getByText("6"));

    expect(screen.getByRole("textbox").value).toBe("46");
  });

  test("should add numbers correctly", () => {
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("="));

    expect(screen.getByRole("textbox").value).toBe("5");
  });

  test("should subtract numbers correctly", () => {
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("-"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    expect(screen.getByRole("textbox").value).toBe("3");
  });

  test("should handle reset correctly", () => {
    fireEvent.click(screen.getByText("7"));
    fireEvent.click(screen.getByText("8"));
    fireEvent.click(screen.getByText("C"));

    expect(screen.getByRole("textbox").value).toBe("");
  });

  test("should show Error if incorrect expression", () => {
    fireEvent.click(screen.getByText("9"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("="));

    expect(screen.getByRole("textbox").value).toBe("Error");
  });
});
