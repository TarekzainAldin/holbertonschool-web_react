import BodySection from "./BodySection";
import { render, screen } from "@testing-library/react";
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('BodySection component', () => {
  test('Check the rendering component', () => {
    render(<BodySection title="test"><p>child</p></BodySection>)

    const heading = screen.getByRole('heading', { level: 2, name: /test/i});
    const children = screen.getAllByText(/child/i);

    expect(heading).toBeInTheDocument();
    expect(children.length).toBe(1);
  });
})
