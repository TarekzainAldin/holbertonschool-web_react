import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  // Test: Check whether 2 input elements are rendered
  test("renders 2 input elements", () => {
    render(<App />);

    // Get all input elements by their role
    const inputs = screen.getAllByRole("textbox"); // This matches both text and password fields

    // Ensure exactly 2 inputs are rendered (email and password)
    expect(inputs.length).toBe(2); // We should have 2 inputs
  });

  // Test: Check whether 2 label elements with the text Email and Password are rendered
  test("renders 2 label elements with the text Email and Password", () => {
    render(<App />);

    // Get the labels by their text content
    const emailLabel = screen.getByLabelText(/email/i);
    const passwordLabel = screen.getByLabelText(/password/i);

    // Ensure both labels exist in the document
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  // Test: Check whether a button with the text "OK" is rendered
  test('renders a button with the text "OK"', () => {
    render(<App />);

    // Get the button by its role and text
    const button = screen.getByRole("button", { name: /ok/i });

    // Ensure the button is present in the document
    expect(button).toBeInTheDocument();
  });
});
