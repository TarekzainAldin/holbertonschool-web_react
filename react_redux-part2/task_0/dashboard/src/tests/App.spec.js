
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import App from "../App"; // <-- FIXED PATH

// Mock axios
jest.mock("axios");

describe("App Component", () => {
  const mockCourses = [
    { id: 1, name: "ES6", credit: 60 },
    { id: 2, name: "Webpack", credit: 20 },
  ];

  const mockNotifications = {
    notifications: [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", value: "New data available" }, // will be replaced
    ],
  };

  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url.includes("courses.json")) {
        return Promise.resolve({ data: { courses: mockCourses } });
      }
      if (url.includes("notifications.json")) {
        return Promise.resolve({ data: mockNotifications });
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders App in logged out state", async () => {
    render(<App />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:5173/notifications.json");
    });

    expect(screen.getByText(/Log in to continue/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument();
  });

  test("renders App and loads courses after login", async () => {
    render(<App />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole("button", { name: /ok/i });

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:5173/courses.json");
    });

    expect(screen.getByText(/Course list/i)).toBeInTheDocument();
    expect(screen.getByText("ES6")).toBeInTheDocument();
    expect(screen.getByText("Webpack")).toBeInTheDocument();
  });

  test("renders notifications", async () => {
    render(<App />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:5173/notifications.json");
    });

    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });
});
