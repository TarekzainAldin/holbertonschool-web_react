import { render, screen } from "@testing-library/react";
import { getCurrentYear, getFooterCopy } from "../utils/utils";
import Footer from "./Footer";
import { StyleSheetTestUtils } from 'aphrodite';
import NewContext from "../Context/context";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('the text content within the 2 p elements in the app-body and app-footer divs matches', () => {
  render(<Footer />);
  const divfooter = screen.getByText(/Copyright 2025 - holberton School/i);

  expect(divfooter).toBeInTheDocument();
});

test('renders correct footer content when isIndex is true', () => {
  render(<Footer />);

  const year = getCurrentYear();
  const copy = getFooterCopy(true);
  const expectedText = `Copyright ${year} - ${copy}`;

  const footerText = screen.getByText(expectedText, { exact: false });
  expect(footerText).toBeInTheDocument();
});
describe('Footer component', () => {
  test('does not display "Contact us" link when user is logged out', () => {
    const contextValue = {
      user: {
        email: '',
        password: '',
        isLoggedIn: false
      },
      logOut: jest.fn()
    };

    render(
      <newContext.Provider value={contextValue}>
        <Footer />
      </newContext.Provider>
    );

    const link = screen.queryByText(/contact us/i);
    expect(link).not.toBeInTheDocument();
  });

  test('displays "Contact us" link when user is logged in', () => {
    const contextValue = {
      user: {
        email: 'test@example.com',
        password: 'pass',
        isLoggedIn: true
      },
      logOut: jest.fn()
    };

    render(
      <newContext.Provider value={contextValue}>
        <Footer />
      </newContext.Provider>
    );

    const link = screen.getByText(/contact us/i);
    expect(link).toBeInTheDocument();
    expect(link.tagName.toLowerCase()).toBe('a');
  });
});