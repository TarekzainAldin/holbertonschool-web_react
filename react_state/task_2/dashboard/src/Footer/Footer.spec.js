import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";


describe("Footer component", () => {
  test("renders correct copyright text", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    const expectedText = `Copyright ${year} - Holberton School`;
    const footerText = screen.getByText(expectedText);
    expect(footerText).toBeInTheDocument();
  });
});
