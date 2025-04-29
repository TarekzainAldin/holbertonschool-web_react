import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Login component", () => {
  test("renders two input elements", () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("renders two label elements with text Email and Password", () => {
    render(<Login />);
    const emailLabel = screen.getByLabelText(/email/i);
    const passwordLabel = screen.getByLabelText(/password/i);
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test("renders a button with the text OK", () => {
    render(<Login />);
    const button = screen.getByRole("button", { name: /ok/i });
    expect(button).toBeInTheDocument();
  });
});
