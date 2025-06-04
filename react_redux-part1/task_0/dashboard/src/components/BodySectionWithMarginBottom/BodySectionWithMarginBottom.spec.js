/* eslint-disable no-undef, no-unused-vars */
import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('BodySectionWithMarginBottom', () => {
  test('renders a div with class bodySectionWithMargin', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="Section Title">
        <p>Test content</p>
      </BodySectionWithMarginBottom>
    );

    expect(screen.getByText('Section Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('renders the BodySection component with the correct title', () => {
    render(
      <BodySectionWithMarginBottom title="Test title">
        <p>Some content</p>
      </BodySectionWithMarginBottom>
    );

    // Check that the h2 from BodySection is present
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Test title');
  });
});
