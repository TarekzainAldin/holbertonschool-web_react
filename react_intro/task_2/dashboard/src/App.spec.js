import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("renders h1 with text School dashboard", () => {
    const heading = screen.getByRole("heading", { name: /school dashboard/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders correct text in body", () => {
    const bodyText = screen.getByText(/login to access the full dashboard/i);
    expect(bodyText).toBeInTheDocument();
  });

  test("renders correct footer text", () => {
    const currentYear = new Date().getFullYear();
    const footerText = screen.getByText(
      new RegExp(`Copyright ${currentYear} - holberton School`, "i")
    );
    expect(footerText).toBeInTheDocument();
  });

  test("renders the logo image", () => {
    const image = screen.getByAltText(/holberton logo/i);
    expect(image).toBeInTheDocument();
  });

  test("renders email and password input fields", () => {
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("renders Email and Password labels", () => {
    const emailLabel = screen.getByText(/email:/i);
    const passwordLabel = screen.getByText(/password:/i);
    
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test('renders an OK button', () => {
    const button = screen.getByRole("button", { name: /^ok$/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/ok/i);
  });
});
