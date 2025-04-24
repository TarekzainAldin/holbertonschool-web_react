import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders h1 with text School dashboard", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { name: /School Dashboard/i });
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

  // ✅ المهمة الجديدة – اختبار الفورم

  test("renders 2 input elements", () => {
    render(<App />);
    const inputs = screen.getAllByRole("textbox"); // input type="text" أو "email"
    expect(inputs.length).toBe(2);
  });

  test("renders 2 label elements with the text Email and Password", () => {
    render(<App />);
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/password/i)).toBeInTheDocument();
  });

  test('renders a button with the text "OK"', () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /ok/i });
    expect(button).toBeInTheDocument();
  });
});
