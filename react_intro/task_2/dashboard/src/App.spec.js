import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  // Test: Check whether 2 input elements are rendered
  test("renders 2 input elements", () => {
    render(<App />);

    // Get the input elements by role
    const inputs = screen.getAllByRole("textbox"); // 'textbox' matches both email and password inputs

    // Ensure we find exactly 2 input fields (email and password)
    expect(inputs.length).toBe(2); // Check that there are exactly 2 inputs
  });

  // Test: Check whether 2 label elements with the text "Email" and "Password" are rendered
  test("renders 2 label elements with the text Email and Password", () => {
    render(<App />);

    // Get the labels by their text
    const emailLabel = screen.getByLabelText(/email/i);
    const passwordLabel = screen.getByLabelText(/password/i);

    // Ensure both labels are rendered
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  // Test: Check whether a button with the text "OK" is rendered
  test('renders a button with the text "OK"', () => {
    render(<App />);

    // Get the button by role and text
    const button = screen.getByRole("button", { name: /ok/i });

    // Ensure the button is rendered
    expect(button).toBeInTheDocument();
  });
});
