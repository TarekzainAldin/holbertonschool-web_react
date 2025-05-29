import React from "react";
import { render, screen } from "@testing-library/react";
import CourseListRow, { styles } from "./CourseListRow";
import { css } from "aphrodite";

describe("CourseListRow Component", () => {
  test("renders header row with one cell spanning two columns", () => {
    render(<CourseListRow isHeader={true} textFirstCell="Header One Cell" />);

    const headerCell = screen.getByText("Header One Cell");
    expect(headerCell.tagName).toBe("TH");
    expect(headerCell).toHaveAttribute("colspan", "2");

    // نتأكد ان الكلاس يحتوي على الكلاس الخاص بـ Aphrodite
    expect(headerCell.className).toContain(css(styles.headerCell));
  });

  test("renders header row with two header cells", () => {
    render(
      <CourseListRow
        isHeader={true}
        textFirstCell="Header Cell 1"
        textSecondCell="Header Cell 2"
      />
    );

    const firstCell = screen.getByText("Header Cell 1");
    const secondCell = screen.getByText("Header Cell 2");

    expect(firstCell.tagName).toBe("TH");
    expect(secondCell.tagName).toBe("TH");

    expect(firstCell.className).toContain(css(styles.headerCell));
    expect(secondCell.className).toContain(css(styles.headerCell));
  });

  test("renders regular row with two data cells", () => {
    render(
      <CourseListRow
        isHeader={false}
        textFirstCell="Data Cell 1"
        textSecondCell="Data Cell 2"
      />
    );

    const firstCell = screen.getByText("Data Cell 1");
    const secondCell = screen.getByText("Data Cell 2");

    expect(firstCell.tagName).toBe("TD");
    expect(secondCell.tagName).toBe("TD");
  });

  test("applies correct class names to row based on isHeader prop", () => {
    const { container, rerender } = render(
      <table>
        <tbody>
          <CourseListRow isHeader={true} textFirstCell="Header" />
        </tbody>
      </table>
    );

    const tr = container.querySelector("tr");
    expect(tr.className).toContain(css(styles.headerRow));

    rerender(
      <table>
        <tbody>
          <CourseListRow isHeader={false} textFirstCell="Row" />
        </tbody>
      </table>
    );

    expect(tr.className).toContain(css(styles.row));
  });
});
