import { getCurrentYear, getFooterCopy } from "../utils/utils";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { newContext } from "../Context/context";

describe("Footer", () => {
  test("renders correct footer text", () => {
    render(<Footer />);
    const text = `Copyright ${getCurrentYear()} - ${getFooterCopy(true)}`;
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test("returns the current year", () => {
    const year = new Date().getFullYear();
    expect(getCurrentYear()).toBe(year);
  });

  test('returns "Holberton School" when argument is true', () => {
    expect(getFooterCopy(true)).toBe("Holberton School");
  });

  test('returns "Holberton School main dashboard" when argument is false', () => {
    expect(getFooterCopy(false)).toBe("Holberton School main dashboard");
  });

  test("displays contact link when logged in", () => {
    render(
      <newContext.Provider value={{ user: { isLoggedIn: true } }}>
        <Footer />
      </newContext.Provider>
    );
    expect(screen.getByText(/Contact us/i)).toBeInTheDocument();
  });
});
