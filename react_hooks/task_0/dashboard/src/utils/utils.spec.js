/* eslint-env jest */
import { getCurrentYear, getFooterCopy, getLatestNotification } from "./utils";

describe("utils.js functions", () => {
  test("getCurrentYear returns the current year", () => {
    const year = new Date().getFullYear();
    expect(getCurrentYear()).toBe(year);
  });

  test('getFooterCopy returns "Holberton School" when argument is true', () => {
    expect(getFooterCopy(true)).toBe("Holberton School");
  });

  test('getFooterCopy returns "Holberton School main dashboard" when argument is false', () => {
    expect(getFooterCopy(false)).toBe("Holberton School main dashboard");
  });

  test("getLatestNotification returns correct HTML string", () => {
    const expected = "<strong>Urgent requirement</strong> - complete by EOD";
    expect(getLatestNotification()).toBe(expected);
  });
});
