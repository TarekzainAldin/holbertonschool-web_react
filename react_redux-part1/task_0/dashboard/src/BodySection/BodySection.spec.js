/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection', () => {
  test('renders a heading with the title prop', () => {
    render(<BodySection title="Test Title" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Test Title'
    );
  });

  test('renders children passed to it', () => {
    render(
      <BodySection title="With children">
        <p>Child 1</p>
        <p>Child 2</p>
      </BodySection>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});
