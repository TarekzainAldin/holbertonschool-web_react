import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

describe("Login component", () => {
  test("renders 2 labels, 2 inputs, and 1 submit input", () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitInput = screen.getByRole("button", { name: /ok/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitInput).toBeInTheDocument();
    expect(submitInput).toHaveAttribute("type", "submit");
  });

  test("label is correctly associated with input", () => {
    render(<Login />);
    const emailLabel = screen.getByText(/email/i);
    expect(emailLabel).toHaveAttribute("for", "email");
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute("id", "email");
  });

  test("submit button is disabled by default", () => {
    render(<Login />);
    const submitInput = screen.getByRole("button", { name: /ok/i });
    expect(submitInput).toBeDisabled();
  });

  test("submit button is enabled only with valid email and password", () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitInput = screen.getByRole("button", { name: /ok/i });

    // Test with invalid email
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(submitInput).toBeDisabled();

    // Test with valid email and short password
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "short" } });
    expect(submitInput).toBeDisabled();

    // Test with valid email and valid password
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(submitInput).toBeEnabled();
  });
});
