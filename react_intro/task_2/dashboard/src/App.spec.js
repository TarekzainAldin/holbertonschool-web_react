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

  // ✅ هذا التست الجديد يلي بيتأكد من وجود 2 input بشكل عام
  test("renders 2 input elements (email and password)", () => {
    render(<App />);
    const inputs = screen.getAllByRole("textbox"); // input[type="email"] و input[type="text"]
    const passwordInput = screen.getByLabelText(/password/i);
    expect(inputs.length).toBe(1); // لأنه password ما هو textbox
    expect(passwordInput).toBeInTheDocument();
  });

  // ✅ التست المطلوب للتأكد من وجود لابلز
  test("renders 2 label elements with the text Email and Password", () => {
    render(<App />);
    const emailLabel = screen.getByLabelText(/email/i);
    const passwordLabel = screen.getByLabelText(/password/i);
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  // ✅ التست المطلوب للزر
  test('renders a button with the text "OK"', () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /ok/i });
    expect(button).toBeInTheDocument();
  });
});
