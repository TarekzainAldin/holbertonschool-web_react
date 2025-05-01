import { render } from "@testing-library/react";
import CourseListRow from "./CourseListRow";

describe("CourseListRow", () => {
  it("renders one columnheader with colspan=2 when isHeader is true and textSecondCell is null", () => {
    const { container } = render(
      <CourseListRow isHeader={true} textFirstCell="Test" />
    );
    const th = container.querySelector("th");
    expect(th).toBeInTheDocument();
    expect(th).toHaveAttribute("colSpan", "2");
  });

  it("renders two <th> cells when isHeader is true and textSecondCell is provided", () => {
    const { container } = render(
      <CourseListRow
        isHeader={true}
        textFirstCell="Test"
        textSecondCell="Value"
      />
    );
    const thElements = container.querySelectorAll("th");
    expect(thElements.length).toBe(2);
  });

  it("renders two <td> cells when isHeader is false", () => {
    const { container } = render(
      <CourseListRow
        isHeader={false}
        textFirstCell="Test"
        textSecondCell="Value"
      />
    );
    const tdElements = container.querySelectorAll("td");
    expect(tdElements.length).toBe(2);
  });
});
