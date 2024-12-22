import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TestingAPICall } from "../components/TestApiCall";
import { FetchData } from "../utils/servises";

jest.mock("../utils/servises", () => ({
  FetchData: jest.fn(),
}));

const mockData = [
  {
    id: 1,
    name: "Olia Hrytsak",
    email: "olia@example.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Max Hrytsak",
    email: "max@example.com",
    phone: "987-654-3210",
  },
];

describe("TestingAPICall Component", () => {
  beforeEach(() => {
    FetchData.mockResolvedValue(mockData);
  });

  test("should fetch and display data correctly", () => {
    render(<TestingAPICall />);
    waitFor(() => {
      expect(
        screen.getByText("Olia Hrytsak - olia@example.com")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Max Hrytsak - max@example.com")
      ).toBeInTheDocument();
    });
  });

  test("should display 'Add Phone' button initially", () => {
    render(<TestingAPICall />);

    waitFor(() => {
      const addButton = screen.getAllByTestId("add-phone");
      expect(addButton).toHaveLength(mockData.length);
    });
  });

  test("should display all users initially", () => {
    render(<TestingAPICall />);

    waitFor(() => {
      const users = screen.getAllByTestId("users");
      expect(users).toHaveLength(mockData.length);
    });
  });

  test("should update UI with phone number when 'Add Phone' is clicked", async () => {
    render(<TestingAPICall />);

    await waitFor(() => {
      const addButton = screen.getAllByTestId("add-phone")[0];
      expect(addButton).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByTestId("add-phone")[0]);

    waitFor(() => {
      expect(screen.getByText("Phone: 123-456-7890")).toBeInTheDocument();
    });
  });

  test("should hide 'Add Phone' button after it is clicked", async () => {
    render(<TestingAPICall />);

    await waitFor(() => {
      const addButton = screen.getAllByTestId("add-phone")[0];
      expect(addButton).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByTestId("add-phone")[0]);

    waitFor(() => {
      expect(screen.getAllByTestId("add-phone")[0]).not.toBeInTheDocument();
    });
  });
});
