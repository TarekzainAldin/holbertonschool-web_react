import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { getCurrentYear, getFooterCopy } from "../../utils/utils";
import { StyleSheetTestUtils } from "aphrodite";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Footer Component", () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const renderWithStore = (initialState) => {
    const store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );
  };

  describe("Basic Rendering", () => {
    test("Renders without crashing", () => {
      renderWithStore({ auth: { isLoggedIn: false } });
      const footerParagraph = screen.getByText(
        `Copyright ${getCurrentYear()} - ${getFooterCopy(true)}`
      );
      expect(footerParagraph).toHaveTextContent(
        /copyright \d{4} - holberton school/i
      );
    });

    test("Does not render contact link when user is not logged in", () => {
      renderWithStore({ auth: { isLoggedIn: false } });
      const link = screen.queryByRole("link", { name: /contact us/i });
      expect(link).not.toBeInTheDocument();
    });

    test("Renders contact link when user is logged in", () => {
      renderWithStore({
        auth: { isLoggedIn: true, user: { email: "test@example.com" } },
      });
      const link = screen.getByRole("link", { name: /contact us/i });
      expect(link).toBeInTheDocument();
    });
  });

  describe("Edge Scenarios", () => {
    test("Renders contact link when isLoggedIn is true and user email is missing", () => {
      renderWithStore({ auth: { isLoggedIn: true } });
      const link = screen.queryByRole("link", { name: /contact us/i });
      expect(link).toBeInTheDocument();
    });

    test("Does not render contact link when isLoggedIn is false", () => {
      renderWithStore({ auth: { isLoggedIn: false } });
      const link = screen.queryByRole("link", { name: /contact us/i });
      expect(link).not.toBeInTheDocument();
    });
  });

  test("Should confirm Footer is a functional component", () => {
    expect(typeof Footer).toBe("function");
  });
});
