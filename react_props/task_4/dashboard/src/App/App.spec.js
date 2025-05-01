import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders Header component", () => {
    render(<App />);
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /school dashboard/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test("renders Login component", () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test("renders Footer component", () => {
    render(<App />);
    const footerText = screen.getByText(/copyright/i);
    expect(footerText).toBeInTheDocument();
  });
});
