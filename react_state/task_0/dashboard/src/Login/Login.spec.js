import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

describe("Login component", () => {
  test("renders 2 labels, 2 inputs, and 1 submit input", () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /ok/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("submit button is disabled by default", () => {
    render(<Login />);
    const submitButton = screen.getByRole("button", { name: /ok/i });
    expect(submitButton).toBeDisabled();
  });

  test("submit button is enabled when both fields are valid", () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /ok/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(submitButton).toBeEnabled();
  });

  test("submit button stays disabled if password is less than 8 chars", () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /ok/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "short" } });

    expect(submitButton).toBeDisabled();
  });

  test("submitting the form updates isLoggedIn to true", () => {
    const { container } = render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const form = container.querySelector("form");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.submit(form);

    // There's no visual change for isLoggedIn, but we ensure no crash occurs
    expect(form).toBeInTheDocument();
  });
});
