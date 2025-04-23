import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders h1 with text School dashboard", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { name: /school dashboard/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders correct text in body and footer", () => {
    render(<App />);
    const bodyText = screen.getByText(/login to access the full dashboard/i);
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

  test("renders 2 input elements (email and password)", () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("renders 2 label elements with the text Email and Password", () => {
    render(<App />);
    const labels = screen.getAllByText(/email|password/i);
    expect(labels.length).toBe(2);
  });

  test('renders a button with the text "OK"', () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /^ok$/i });
    expect(button).toBeInTheDocument();
  });
});
