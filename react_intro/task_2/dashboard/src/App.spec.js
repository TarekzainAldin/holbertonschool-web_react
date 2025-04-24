import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders 2 input elements", () => {
    render(<App />);

    // Get all inputs by role "textbox" (email and password)
    const inputs = screen.getAllByRole("textbox");
    
    // Ensure exactly 2 inputs are rendered (email and password)
    expect(inputs.length).toBe(2);
  });

  test("renders 2 label elements with the text Email and Password", () => {
    render(<App />);

    // Get the label elements by their text content
    const emailLabel = screen.getByLabelText(/email/i);
    const passwordLabel = screen.getByLabelText(/password/i);

    // Ensure both labels exist in the document
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test('renders a button with the text "OK"', () => {
    render(<App />);

    // Get the button by role and name
    const button = screen.getByRole("button", { name: /ok/i });

    // Ensure the button is present in the document
    expect(button).toBeInTheDocument();
  });
});
