import React from 'react';
import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection Component', () => {
  test('renders the title correctly', () => {
    render(<BodySection title="Test Title" />);
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders children correctly', () => {
    render(
      <BodySection title="Section Title">
        <p>Child content</p>
      </BodySection>
    );
    const childElement = screen.getByText('Child content');
    expect(childElement).toBeInTheDocument();
  });
});
