// task_1/dashboard/src/Login/Login.spec.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

describe("Login component", () => {
  test("renders 2 labels, 2 inputs, and 1 submit input", () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument();
  });

  test("submit button is disabled by default", () => {
    render(<Login />);
    const submitButton = screen.getByRole("button", { name: /ok/i });
    expect(submitButton).toBeDisabled();
  });

  test("submit button is enabled only after valid email and password (≥8 chars)", () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /ok/i });

    fireEvent.change(emailInput, { target: { value: "test@domain.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345678" } });

    expect(submitButton).toBeEnabled();
  });

  test("submitting the form should not reload the page", () => {
    render(<Login />);
    const form = screen.getByRole("form");
    const preventDefault = jest.fn();

    fireEvent.submit(form, { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });
});
