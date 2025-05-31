import React from "react";
import { render, screen } from "@testing-library/react";
import CourseListRow from "./CourseListRow";

import { StyleSheetTestUtils } from "aphrodite";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("CourseListRow", () => {
  test("renders one th with colSpan=2 when isHeader is true and textSecondCell is null", () => {
    render(
      <table>
        <thead>
          <CourseListRow isHeader={true} textFirstCell="Header Only" />
        </thead>
      </table>
    );
    const th = screen.getByRole("columnheader");
    expect(th).toBeInTheDocument();
    expect(th).toHaveAttribute("colspan", "2");
    expect(th).toHaveTextContent("Header Only");
  });

  test("renders two th when isHeader is true and textSecondCell is provided", () => {
    render(
      <table>
        <thead>
          <CourseListRow
            isHeader={true}
            textFirstCell="Course name"
            textSecondCell="Credit"
          />
        </thead>
      </table>
    );
    const ths = screen.getAllByRole("columnheader");
    expect(ths.length).toBe(2);
    expect(ths[0]).toHaveTextContent("Course name");
    expect(ths[1]).toHaveTextContent("Credit");
  });

  test("renders two td when isHeader is false", () => {
    render(
      <table>
        <tbody>
          <CourseListRow
            isHeader={false}
            textFirstCell="ES6"
            textSecondCell="60"
          />
        </tbody>
      </table>
    );
    const tds = screen.getAllByRole("cell");
    expect(tds.length).toBe(2);
    expect(tds[0]).toHaveTextContent("ES6");
    expect(tds[1]).toHaveTextContent("60");
  });
});
