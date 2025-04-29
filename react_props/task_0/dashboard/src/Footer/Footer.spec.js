import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  test("renders the footer text", () => {
    render(<Footer />);
    const footerText = screen.getByText(/copyright/i);
    expect(footerText).toBeInTheDocument();
  });
});
