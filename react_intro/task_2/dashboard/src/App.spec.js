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
    
    // Get all input elements
    const inputs = screen.getAllByRole("textbox"); // Should return text input for email
    const passwordInput = screen.getByLabelText(/password/i); // Explicitly get the password input
    
    // Ensure that there are exactly 2 inputs (email and password)
    expect(inputs.length).toBe(1);  // There should be only 1 input of type 'textbox' (email)
    expect(passwordInput).toBeInTheDocument(); // Ensure the password input is present
  });

  test("renders 2 label elements with the text Email and Password", () => {
    render(<App />);
    
    // Get labels by their text, case-insensitive matching for "email" and "password"
    const emailLabel = screen.getByLabelText(/email/i);
    const passwordLabel = screen.getByLabelText(/password/i);
    
    // Ensure both labels are present
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test('renders a button with the text "OK"', () => {
    render(<App />);
    
    // Get button element with case-insensitive matching for "OK"
    const button = screen.getByRole("button", { name: /ok/i });
    
    // Ensure the button is present in the document
    expect(button).toBeInTheDocument();
  });
});
