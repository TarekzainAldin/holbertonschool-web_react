import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders h1 with text School dashboard", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { name: /School dashboard/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders correct text in body and footer", () => {
    render(<App />);
    const bodyText = screen.getByText(/Login to access the full dashboard/i);
    expect(bodyText).toBeInTheDocument();

    const currentYear = new Date().getFullYear();
    const footerText = screen.getByText(
      new RegExp(`Copyright ${currentYear} - holberton School`, "i")
    );
    expect(footerText).toBeInTheDocument();
  });

  test("renders the logo image", () => {
    render(<App />);
    const image = screen.getByAltText(/holberton logo/i);
    expect(image).toBeInTheDocument();
  });

  test("renders 2 input elements", () => {
    render(<App />);
    // Get all input elements by role
    const inputs = screen.getAllByRole("textbox"); // This should include the text input
    const passwordInput = screen.getByLabelText(/password/i); // Explicitly get the password input
    expect(inputs.length + (passwordInput ? 1 : 0)).toBe(2); // Should ensure there are exactly 2 inputs (email + password)
  });

  test("renders 2 label elements with the text Email and Password", () => {
    render(<App />);
    // Check for email and password labels using case-insensitive matching
    const emailLabel = screen.getByLabelText(/email/i);
    const passwordLabel = screen.getByLabelText(/password/i);
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test('renders a button with the text "OK"', () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /ok/i }); // Button text is case-insensitive
    expect(button).toBeInTheDocument();
  });
});
