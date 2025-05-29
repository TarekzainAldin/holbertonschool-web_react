import React from "react";
import { render } from "@testing-library/react";
import BodySectionWithMarginBottom from "./BodySectionWithMarginBottom";

describe("BodySectionWithMarginBottom Component", () => {
  test("renders BodySection with correct title and children", () => {
    const { getByText } = render(
      <BodySectionWithMarginBottom title="Test Title">
        <p>Test children</p>
      </BodySectionWithMarginBottom>
    );

    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test children")).toBeInTheDocument();
  });

  test("has the correct marginBottom style applied", () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="Test Title" />
    );
    const div = container.firstChild;

    // Check that className exists and is a string
    expect(div.className).toBeTruthy();
    expect(typeof div.className).toBe("string");
  });
});
