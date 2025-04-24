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
    const inputs = screen.getAllByRole("textbox");
    console.log("Inputs found:", inputs); // Debugging: Log inputs found
    
    const passwordInput = screen.getByLabelText(/password/i);
    console.log("Password input:", passwordInput); // Debugging: Log password input
    
    // Ensure there are exactly 2 input fields (email and password)
    expect(inputs.length).toBe(1);  // There should be only 1 text input (email)
    expect(passwordInput).toBeInTheDocument(); // Ensure the password input is found
  });

  test("renders 2 label elements with the text Email and Password", () => {
    render(<App />);
    
    // Get label elements by their text
    const emailLabel = screen.getByLabelText(/email/i);
    const passwordLabel = screen.getByLabelText(/password/i);
    console.log("Email label:", emailLabel); // Debugging: Log email label found
    console.log("Password label:", passwordLabel); // Debugging: Log password label found
    
    // Ensure both labels are present
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test('renders a button with the text "OK"', () => {
    render(<App />);
    
    // Get button element with case-insensitive matching for "OK"
    const button = screen.getByRole("button", { name: /ok/i });
    console.log("Button:", button); // Debugging: Log the button found
    
    // Ensure the button is present in the document
    expect(button).toBeInTheDocument();
  });
});
